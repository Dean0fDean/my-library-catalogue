import crypto from "node:crypto";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
let schemaReady;

function json(response, status, data) {
  response.status(status).setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(data));
}

function normalize(value) {
  return String(value || "").trim().toLocaleLowerCase();
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    profileImage: user.profile_image || "",
    role: user.role,
    createdAt: user.created_at,
  };
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function addNotification(userId, type, title, message, dedupeKey = null) {
  await sql`
    INSERT INTO library_notifications (
      id, user_id, type, title, message, dedupe_key
    )
    VALUES (
      ${crypto.randomUUID()}, ${userId}, ${type}, ${title}, ${message},
      ${dedupeKey}
    )
    ON CONFLICT (user_id, dedupe_key) WHERE dedupe_key IS NOT NULL
    DO UPDATE SET
      title = EXCLUDED.title,
      message = EXCLUDED.message,
      read_at = NULL,
      created_at = NOW()
  `;
}

async function unlockAchievement(userId, key, title, description) {
  const rows = await sql`
    INSERT INTO library_achievements (
      id, user_id, achievement_key, title, description
    )
    VALUES (
      ${crypto.randomUUID()}, ${userId}, ${key}, ${title}, ${description}
    )
    ON CONFLICT (user_id, achievement_key) DO NOTHING
    RETURNING id
  `;
  if (rows.length) {
    await addNotification(
      userId,
      "achievement",
      `Achievement unlocked: ${title}`,
      description,
      `achievement:${key}`,
    );
  }
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS library_users (
          id UUID PRIMARY KEY,
          username TEXT NOT NULL,
          username_normalized TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          password_scheme TEXT NOT NULL DEFAULT 'scrypt',
          profile_image TEXT NOT NULL DEFAULT '',
          role TEXT NOT NULL DEFAULT 'user',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_sessions (
          token_hash TEXT PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_follows (
          follower_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          following_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (follower_id, following_id)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_stats (
          user_id UUID PRIMARY KEY REFERENCES library_users(id) ON DELETE CASCADE,
          owned INTEGER NOT NULL DEFAULT 0,
          read_count INTEGER NOT NULL DEFAULT 0,
          unread INTEGER NOT NULL DEFAULT 0,
          recent_books JSONB NOT NULL DEFAULT '[]'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_shares (
          id UUID PRIMARY KEY,
          sender_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          recipient_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          kind TEXT NOT NULL,
          payload JSONB NOT NULL,
          message TEXT NOT NULL DEFAULT '',
          sender_read_at TIMESTAMPTZ,
          recipient_read_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        ALTER TABLE library_shares
        ADD COLUMN IF NOT EXISTS sender_read_at TIMESTAMPTZ
      `;
      await sql`
        ALTER TABLE library_shares
        ADD COLUMN IF NOT EXISTS recipient_read_at TIMESTAMPTZ
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_share_comments (
          id UUID PRIMARY KEY,
          share_id UUID NOT NULL REFERENCES library_shares(id) ON DELETE CASCADE,
          author_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          comment TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_data (
          user_id UUID PRIMARY KEY REFERENCES library_users(id) ON DELETE CASCADE,
          books JSONB NOT NULL DEFAULT '[]'::jsonb,
          reading_log JSONB NOT NULL DEFAULT '[]'::jsonb,
          passages JSONB NOT NULL DEFAULT '[]'::jsonb,
          wishlist JSONB NOT NULL DEFAULT '[]'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_notifications (
          id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          type TEXT NOT NULL,
          title TEXT NOT NULL,
          message TEXT NOT NULL,
          dedupe_key TEXT,
          read_at TIMESTAMPTZ,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS library_notifications_dedupe
        ON library_notifications (user_id, dedupe_key)
        WHERE dedupe_key IS NOT NULL
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_achievements (
          id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          achievement_key TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE (user_id, achievement_key)
        )
      `;
    })();
  }
  return schemaReady;
}

async function readBody(request) {
  if (request.body && typeof request.body === "object") return request.body;
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 6_000_000) reject(new Error("Request is too large."));
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });
    request.on("error", reject);
  });
}

async function sessionUser(request) {
  const token = String(request.headers.authorization || "").replace(
    /^Bearer\s+/i,
    "",
  );
  if (!token) return null;
  const rows = await sql`
    SELECT u.*
    FROM library_sessions s
    JOIN library_users u ON u.id = s.user_id
    WHERE s.token_hash = ${hashToken(token)} AND s.expires_at > NOW()
    LIMIT 1
  `;
  return rows[0] || null;
}

async function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  await sql`
    INSERT INTO library_sessions (token_hash, user_id, expires_at)
    VALUES (${hashToken(token)}, ${userId}, NOW() + INTERVAL '30 days')
  `;
  return token;
}

async function createUser(body, legacy = false) {
  const username = String(body.username || "").trim();
  const normalized = normalize(username);
  if (username.length < 2 || username.length > 40) {
    return { error: "Username must be between 2 and 40 characters." };
  }
  const existing = await sql`
    SELECT id FROM library_users WHERE username_normalized = ${normalized}
  `;
  if (existing.length) return { error: "That username is already in use." };

  const countRows = await sql`SELECT COUNT(*)::int AS count FROM library_users`;
  const role = countRows[0].count === 0 ? "admin" : "user";
  const id = crypto.randomUUID();
  let salt;
  let passwordHash;
  let scheme;
  if (legacy) {
    salt = String(body.salt || "");
    passwordHash = String(body.passwordHash || "");
    scheme = "legacy-sha256";
    if (!/^[a-f0-9]{32}$/i.test(salt) || !/^[a-f0-9]{64}$/i.test(passwordHash)) {
      return { error: "This local account could not be migrated." };
    }
  } else {
    const password = String(body.password || "");
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters." };
    }
    salt = crypto.randomBytes(16).toString("hex");
    passwordHash = hashPassword(password, salt);
    scheme = "scrypt";
  }
  const rows = await sql`
    INSERT INTO library_users (
      id, username, username_normalized, password_hash, password_salt,
      password_scheme, profile_image, role
    )
    VALUES (
      ${id}, ${username}, ${normalized}, ${passwordHash}, ${salt},
      ${scheme}, ${String(body.profileImage || "")}, ${role}
    )
    RETURNING *
  `;
  await sql`INSERT INTO library_stats (user_id) VALUES (${id})`;
  await sql`INSERT INTO library_data (user_id) VALUES (${id})`;
  const token = await createSession(id);
  return { user: publicUser(rows[0]), token };
}

export default async function handler(request, response) {
  try {
    if (!process.env.DATABASE_URL) {
      return json(response, 503, {
        error: "The community database has not been connected yet.",
      });
    }
    await ensureSchema();
    const action = String(request.query.action || "");
    const body = request.method === "GET" ? {} : await readBody(request);

    if (action === "signup" && request.method === "POST") {
      const result = await createUser(body);
      return json(response, result.error ? 400 : 201, result);
    }

    if (action === "migrate" && request.method === "POST") {
      const result = await createUser(body, true);
      return json(response, result.error ? 400 : 201, result);
    }

    if (action === "login" && request.method === "POST") {
      const rows = await sql`
        SELECT * FROM library_users
        WHERE username_normalized = ${normalize(body.username)}
        LIMIT 1
      `;
      const user = rows[0];
      if (!user) return json(response, 401, { error: "Incorrect username or password." });
      const password = String(body.password || "");
      const candidate =
        user.password_scheme === "legacy-sha256"
          ? crypto
              .createHash("sha256")
              .update(`${user.password_salt}:${password}`)
              .digest("hex")
          : hashPassword(password, user.password_salt);
      if (!crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(user.password_hash))) {
        return json(response, 401, { error: "Incorrect username or password." });
      }
      return json(response, 200, {
        user: publicUser(user),
        token: await createSession(user.id),
      });
    }

    const user = await sessionUser(request);
    if (!user) return json(response, 401, { error: "Please log in again." });

    if (action === "session" && request.method === "GET") {
      return json(response, 200, { user: publicUser(user) });
    }

    if (action === "import-users" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      const legacyAccounts = Array.isArray(body.accounts)
        ? body.accounts.slice(0, 250)
        : [];
      let imported = 0;
      for (const account of legacyAccounts) {
        const username = String(account.username || "").trim();
        const normalized = normalize(username);
        const salt = String(account.salt || "");
        const passwordHash = String(account.passwordHash || "");
        if (
          username.length < 2 ||
          !/^[a-f0-9]{32}$/i.test(salt) ||
          !/^[a-f0-9]{64}$/i.test(passwordHash)
        ) {
          continue;
        }
        const existing = await sql`
          SELECT id FROM library_users WHERE username_normalized = ${normalized}
        `;
        if (existing.length) continue;
        const id =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            String(account.id || ""),
          )
            ? String(account.id)
            : crypto.randomUUID();
        await sql`
          INSERT INTO library_users (
            id, username, username_normalized, password_hash, password_salt,
            password_scheme, profile_image, role, created_at
          )
          VALUES (
            ${id}, ${username}, ${normalized}, ${passwordHash}, ${salt},
            'legacy-sha256', ${String(account.profileImage || "")}, 'user',
            ${account.createdAt || new Date().toISOString()}
          )
        `;
        await sql`INSERT INTO library_stats (user_id) VALUES (${id})`;
        const accountData = body.data?.[account.id] || {};
        const importedBooks = Array.isArray(accountData.books)
          ? accountData.books
          : [];
        const importedLogs = Array.isArray(accountData.readingLog)
          ? accountData.readingLog
          : [];
        const importedPassages = Array.isArray(accountData.passages)
          ? accountData.passages
          : [];
        const importedWishlist = Array.isArray(accountData.wishlist)
          ? accountData.wishlist
          : [];
        await sql`
          INSERT INTO library_data (
            user_id, books, reading_log, passages, wishlist
          )
          VALUES (
            ${id}, ${JSON.stringify(importedBooks)}::jsonb,
            ${JSON.stringify(importedLogs)}::jsonb,
            ${JSON.stringify(importedPassages)}::jsonb,
            ${JSON.stringify(importedWishlist)}::jsonb
          )
        `;
        const readCount = importedBooks.filter(
          (book) => book.status === "read",
        ).length;
        await sql`
          UPDATE library_stats SET
            owned = ${importedBooks.length},
            read_count = ${readCount},
            unread = ${importedBooks.length - readCount},
            recent_books = ${JSON.stringify(
              importedBooks.slice(0, 5).map(({ title, author, status }) => ({
                title,
                author,
                status,
              })),
            )}::jsonb,
            updated_at = NOW()
          WHERE user_id = ${id}
        `;
        imported += 1;
      }
      return json(response, 200, { imported });
    }

    if (action === "data" && request.method === "GET") {
      const rows = await sql`
        SELECT books, reading_log, passages, wishlist, updated_at
        FROM library_data WHERE user_id = ${user.id}
      `;
      const row = rows[0] || {};
      return json(response, 200, {
        books: row.books || [],
        readingLog: row.reading_log || [],
        passages: row.passages || [],
        wishlist: row.wishlist || [],
        updatedAt: row.updated_at || null,
      });
    }

    if (action === "data" && request.method === "POST") {
      const cleanArray = (value) =>
        Array.isArray(value) ? value.slice(0, 5000) : [];
      await sql`
        INSERT INTO library_data (
          user_id, books, reading_log, passages, wishlist, updated_at
        )
        VALUES (
          ${user.id}, ${JSON.stringify(cleanArray(body.books))}::jsonb,
          ${JSON.stringify(cleanArray(body.readingLog))}::jsonb,
          ${JSON.stringify(cleanArray(body.passages))}::jsonb,
          ${JSON.stringify(cleanArray(body.wishlist))}::jsonb, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          books = EXCLUDED.books,
          reading_log = EXCLUDED.reading_log,
          passages = EXCLUDED.passages,
          wishlist = EXCLUDED.wishlist,
          updated_at = NOW()
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "profile" && request.method === "POST") {
      const username = String(body.username || "").trim();
      const normalized = normalize(username);
      const duplicate = await sql`
        SELECT id FROM library_users
        WHERE username_normalized = ${normalized} AND id <> ${user.id}
      `;
      if (duplicate.length) {
        return json(response, 400, { error: "That username is already in use." });
      }
      const rows = await sql`
        UPDATE library_users
        SET username = ${username},
            username_normalized = ${normalized},
            profile_image = ${String(body.profileImage || "")}
        WHERE id = ${user.id}
        RETURNING *
      `;
      return json(response, 200, { user: publicUser(rows[0]) });
    }

    if (action === "profile-activity" && request.method === "GET") {
      const notifications = await sql`
        SELECT id, type, title, message, read_at, created_at
        FROM library_notifications
        WHERE user_id = ${user.id}
        ORDER BY created_at DESC
        LIMIT 100
      `;
      const achievements = await sql`
        SELECT id, achievement_key, title, description, unlocked_at
        FROM library_achievements
        WHERE user_id = ${user.id}
        ORDER BY unlocked_at DESC
      `;
      return json(response, 200, {
        notifications: notifications.map((item) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          message: item.message,
          readAt: item.read_at,
          createdAt: item.created_at,
        })),
        achievements: achievements.map((item) => ({
          id: item.id,
          key: item.achievement_key,
          title: item.title,
          description: item.description,
          unlockedAt: item.unlocked_at,
        })),
      });
    }

    if (action === "notification-read" && request.method === "POST") {
      if (body.all) {
        await sql`
          UPDATE library_notifications SET read_at = NOW()
          WHERE user_id = ${user.id} AND read_at IS NULL
        `;
      } else {
        await sql`
          UPDATE library_notifications SET read_at = NOW()
          WHERE id = ${String(body.notificationId || "")}
            AND user_id = ${user.id}
        `;
      }
      return json(response, 200, { ok: true });
    }

    if (action === "activity-snapshot" && request.method === "POST") {
      const readBooks = Math.max(0, Number(body.readBooks) || 0);
      const passages = Math.max(0, Number(body.passages) || 0);
      const sessions = Math.max(0, Number(body.sessions) || 0);
      const pages = Math.max(0, Number(body.pages) || 0);
      const minutes = Math.max(0, Number(body.minutes) || 0);
      if (readBooks >= 1) {
        await unlockAchievement(user.id, "first-finish", "First finish", "Finished your first book.");
      }
      if (readBooks >= 5) {
        await unlockAchievement(user.id, "five-finishes", "Five finished", "Finished five books in your catalogue.");
      }
      if (passages >= 1) {
        await unlockAchievement(user.id, "first-passage", "Line keeper", "Saved your first passage.");
      }
      if (passages >= 10) {
        await unlockAchievement(user.id, "passage-collector", "Passage collector", "Saved ten passages for future reference.");
      }
      if (sessions >= 1) {
        await unlockAchievement(user.id, "first-session", "Reading rhythm", "Logged your first reading session.");
      }
      if (pages >= 100) {
        await unlockAchievement(user.id, "hundred-pages", "Century reader", "Logged 100 pages of reading.");
        await addNotification(
          user.id, "insight", "Reading insight",
          `You have logged ${pages} pages across ${sessions} reading sessions.`,
          "insight:pages-100",
        );
      }
      if (minutes >= 60) {
        await unlockAchievement(user.id, "reading-hour", "Focused hour", "Logged at least one hour of reading.");
        await addNotification(
          user.id, "insight", "Time well read",
          `Your reading log now contains ${minutes} minutes of focused reading.`,
          "insight:minutes-60",
        );
      }
      return json(response, 200, { ok: true });
    }

    if (action === "stats" && request.method === "POST") {
      const recentBooks = Array.isArray(body.recentBooks)
        ? body.recentBooks.slice(0, 5)
        : [];
      await sql`
        INSERT INTO library_stats (
          user_id, owned, read_count, unread, recent_books, updated_at
        )
        VALUES (
          ${user.id}, ${Number(body.owned) || 0}, ${Number(body.read) || 0},
          ${Number(body.unread) || 0}, ${JSON.stringify(recentBooks)}::jsonb, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          owned = EXCLUDED.owned,
          read_count = EXCLUDED.read_count,
          unread = EXCLUDED.unread,
          recent_books = EXCLUDED.recent_books,
          updated_at = NOW()
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "community" && request.method === "GET") {
      const users = await sql`
        SELECT
          u.id, u.username, u.profile_image, u.role, u.created_at,
          COALESCE(s.owned, 0)::int AS owned,
          COALESCE(s.read_count, 0)::int AS read_count,
          COALESCE(s.unread, 0)::int AS unread,
          COALESCE(s.recent_books, '[]'::jsonb) AS recent_books
        FROM library_users u
        LEFT JOIN library_stats s ON s.user_id = u.id
        ORDER BY LOWER(u.username)
      `;
      const follows = await sql`
        SELECT follower_id, following_id, created_at FROM library_follows
      `;
      const shares = await sql`
        SELECT id, sender_id, recipient_id, kind, payload, message,
               sender_read_at, recipient_read_at, created_at
        FROM library_shares
        WHERE recipient_id = ${user.id} OR sender_id = ${user.id}
        ORDER BY created_at DESC
        LIMIT 100
      `;
      const comments = await sql`
        SELECT c.id, c.share_id, c.author_id, c.comment, c.created_at
        FROM library_share_comments c
        JOIN library_shares s ON s.id = c.share_id
        WHERE s.recipient_id = ${user.id} OR s.sender_id = ${user.id}
        ORDER BY c.created_at
      `;
      return json(response, 200, {
        accounts: users.map((item) => ({
          ...publicUser(item),
          stats: {
            total: item.owned,
            read: item.read_count,
            unread: item.unread,
          },
          recentBooks: item.recent_books,
        })),
        follows: follows.map((item) => ({
          followerId: item.follower_id,
          followingId: item.following_id,
          createdAt: item.created_at,
        })),
        shares: shares.map((item) => {
          const shareComments = comments.filter(
            (comment) => comment.share_id === item.id,
          );
          return {
            id: item.id,
            senderId: item.sender_id,
            recipientId: item.recipient_id,
            kind: item.kind,
            payload: item.payload,
            message: item.message,
            senderReadAt:
              item.sender_read_at ||
              (shareComments.length ? null : item.created_at),
            recipientReadAt: item.recipient_read_at,
            createdAt: item.created_at,
            comments: shareComments.map((comment) => ({
              id: comment.id,
              authorId: comment.author_id,
              comment: comment.comment,
              createdAt: comment.created_at,
            })),
          };
        }),
      });
    }

    if (action === "catalogue" && request.method === "POST") {
      const accountId = String(body.accountId || "");
      const rows = await sql`
        SELECT d.books
        FROM library_users u
        LEFT JOIN library_data d ON d.user_id = u.id
        WHERE u.id = ${accountId}
        LIMIT 1
      `;
      if (!rows.length) {
        return json(response, 404, { error: "That reader could not be found." });
      }
      const sourceBooks = Array.isArray(rows[0].books) ? rows[0].books : [];
      const books = sourceBooks.slice(0, 5000).map((book) => ({
        id: String(book.id || ""),
        title: String(book.title || "Untitled"),
        author: String(book.author || "Unknown author"),
        genre: String(book.genre || "Uncategorized"),
        status: book.status === "read" ? "read" : "unread",
        rating: Math.round(
          Math.min(5, Math.max(0, Number(book.rating) || 0)),
        ),
      }));
      return json(response, 200, { books });
    }

    if (action === "follow" && request.method === "POST") {
      const targetId = String(body.accountId || "");
      if (targetId === user.id) return json(response, 400, { error: "You cannot follow yourself." });
      const existing = await sql`
        SELECT 1 FROM library_follows
        WHERE follower_id = ${user.id} AND following_id = ${targetId}
      `;
      if (existing.length) {
        await sql`
          DELETE FROM library_follows
          WHERE follower_id = ${user.id} AND following_id = ${targetId}
        `;
      } else {
        await sql`
          INSERT INTO library_follows (follower_id, following_id)
          VALUES (${user.id}, ${targetId})
        `;
        await addNotification(
          targetId,
          "follow",
          "New follower",
          `${user.username} started following you.`,
          `follow:${user.id}`,
        );
      }
      return json(response, 200, { following: !existing.length });
    }

    if (action === "share" && request.method === "POST") {
      const shareId = crypto.randomUUID();
      const recipientId = String(body.recipientId || "");
      await sql`
        INSERT INTO library_shares (
          id, sender_id, recipient_id, kind, payload, message, sender_read_at
        )
        VALUES (
          ${shareId}, ${user.id}, ${recipientId},
          ${String(body.kind || "")}, ${JSON.stringify(body.payload || {})}::jsonb,
          ${String(body.message || "").slice(0, 1000)}, NOW()
        )
      `;
      const itemTitle = String(body.payload?.title || "a reading item");
      await addNotification(
        recipientId,
        body.kind === "book" ? "recommendation" : "passage",
        body.kind === "book" ? "New book recommendation" : "New shared passage",
        `${user.username} shared ${itemTitle} with you.`,
        `share:${shareId}`,
      );
      if (body.kind === "book") {
        await unlockAchievement(
          user.id,
          "first-recommendation",
          "Book matchmaker",
          "Shared your first book recommendation.",
        );
      }
      return json(response, 201, { ok: true });
    }

    if (action === "recommendation-wishlist" && request.method === "POST") {
      const shareId = String(body.shareId || "");
      const shares = await sql`
        SELECT sender_id, recipient_id, payload
        FROM library_shares
        WHERE id = ${shareId} AND recipient_id = ${user.id} AND kind = 'book'
        LIMIT 1
      `;
      if (!shares.length) {
        return json(response, 404, { error: "That recommendation was not found." });
      }
      const title = String(shares[0].payload?.title || "the recommended book");
      await addNotification(
        shares[0].sender_id,
        "recommendation",
        "Recommendation saved",
        `${user.username} added ${title} to their wishlist.`,
        `recommendation-wishlist:${shareId}`,
      );
      await unlockAchievement(
        shares[0].sender_id,
        "recommendation-wishlisted",
        "Trusted recommendation",
        "Another reader added your recommendation to their wishlist.",
      );
      return json(response, 200, { ok: true });
    }

    if (action === "share-comment" && request.method === "POST") {
      const shareId = String(body.shareId || "");
      const comment = String(body.comment || "").trim().slice(0, 1000);
      if (!comment) {
        return json(response, 400, { error: "Please enter a comment." });
      }
      const shares = await sql`
        SELECT sender_id, recipient_id, payload FROM library_shares
        WHERE id = ${shareId}
          AND (sender_id = ${user.id} OR recipient_id = ${user.id})
        LIMIT 1
      `;
      if (!shares.length) {
        return json(response, 404, { error: "That recommendation was not found." });
      }
      await sql`
        INSERT INTO library_share_comments (id, share_id, author_id, comment)
        VALUES (${crypto.randomUUID()}, ${shareId}, ${user.id}, ${comment})
      `;
      if (shares[0].sender_id === user.id) {
        await sql`
          UPDATE library_shares
          SET sender_read_at = NOW(), recipient_read_at = NULL
          WHERE id = ${shareId}
        `;
      } else {
        await sql`
          UPDATE library_shares
          SET recipient_read_at = NOW(), sender_read_at = NULL
          WHERE id = ${shareId}
        `;
      }
      const otherUserId =
        shares[0].sender_id === user.id
          ? shares[0].recipient_id
          : shares[0].sender_id;
      await addNotification(
        otherUserId,
        "recommendation",
        "New recommendation response",
        `${user.username} responded about ${String(
          shares[0].payload?.title || "a shared reading item",
        )}.`,
        `share-comment:${shareId}`,
      );
      return json(response, 201, { ok: true });
    }

    if (action === "share-read" && request.method === "POST") {
      const shareId = String(body.shareId || "");
      const shares = await sql`
        SELECT sender_id, recipient_id FROM library_shares
        WHERE id = ${shareId}
          AND (sender_id = ${user.id} OR recipient_id = ${user.id})
        LIMIT 1
      `;
      if (!shares.length) {
        return json(response, 404, { error: "That recommendation was not found." });
      }
      if (shares[0].sender_id === user.id) {
        await sql`
          UPDATE library_shares SET sender_read_at = NOW() WHERE id = ${shareId}
        `;
      } else {
        await sql`
          UPDATE library_shares SET recipient_read_at = NOW() WHERE id = ${shareId}
        `;
      }
      return json(response, 200, { ok: true });
    }

    if (action === "delete-user" && request.method === "POST") {
      if (user.role !== "admin") return json(response, 403, { error: "Admin access required." });
      await sql`
        DELETE FROM library_users
        WHERE id = ${String(body.accountId || "")} AND role <> 'admin'
      `;
      return json(response, 200, { ok: true });
    }

    return json(response, 404, { error: "Not found." });
  } catch (error) {
    console.error(error);
    return json(response, 500, { error: "The online service is temporarily unavailable." });
  }
}
