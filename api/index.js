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
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
        SELECT id, sender_id, recipient_id, kind, payload, message, created_at
        FROM library_shares
        WHERE recipient_id = ${user.id}
        ORDER BY created_at DESC
        LIMIT 100
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
        shares: shares.map((item) => ({
          id: item.id,
          senderId: item.sender_id,
          recipientId: item.recipient_id,
          kind: item.kind,
          payload: item.payload,
          message: item.message,
          createdAt: item.created_at,
        })),
      });
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
      }
      return json(response, 200, { following: !existing.length });
    }

    if (action === "share" && request.method === "POST") {
      await sql`
        INSERT INTO library_shares (
          id, sender_id, recipient_id, kind, payload, message
        )
        VALUES (
          ${crypto.randomUUID()}, ${user.id}, ${String(body.recipientId || "")},
          ${String(body.kind || "")}, ${JSON.stringify(body.payload || {})}::jsonb,
          ${String(body.message || "").slice(0, 1000)}
        )
      `;
      return json(response, 201, { ok: true });
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
