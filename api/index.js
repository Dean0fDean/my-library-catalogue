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

const DEFAULT_READING_FACTS = [
  "Even a few minutes of reading can provide a useful transition between a busy day and rest.",
  "Rereading often reveals patterns and ideas that were easy to miss the first time.",
  "Keeping a brief note after reading can make the main ideas easier to recall later.",
  "Alternating demanding books with lighter ones can help sustain a regular reading habit.",
];

const DEFAULT_DREAM_FACTS = [
  "Dream recall is often clearest immediately after waking and may fade quickly if it is not recorded.",
  "Dreams can occur throughout sleep, although vivid narrative dreams are often associated with REM sleep.",
  "Keeping a dream journal can make recurring personal themes easier to notice over time.",
  "There is no scientifically established universal meaning for every dream symbol; context and personal associations matter.",
  "Stress, sleep disruption, medication, and daily experiences can all influence dream content or recall.",
  "People who wake briefly during the night may remember dreams more often than people who sleep through without waking.",
];

const LEARNING_TASKS = [
  {
    key: "english-metaphor",
    type: "choice",
    title: "The Metaphor Chamber",
    prompt: 'Which sentence contains a metaphor?',
    options: [
      "The moon was a silver coin above the trees.",
      "The moon shone brightly above the trees.",
      "The moon appeared after sunset.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "english-semicolon",
    type: "choice",
    title: "The Semicolon Perch",
    prompt: "Which sentence uses a semicolon correctly?",
    options: [
      "The library was closing; we borrowed our books quickly.",
      "The library; was closing, so we hurried.",
      "We borrowed; three books from the library.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "english-active-voice",
    type: "choice",
    title: "The Active Voice Roost",
    prompt: "Which sentence is written in active voice?",
    options: [
      "The final chapter was read by Amara.",
      "Amara read the final chapter.",
      "The final chapter had been read.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "review-opening",
    type: "writing",
    title: "The Reviewer's First Flight",
    prompt:
      "Write the opening of a book review. Name the book and author, identify its central subject or conflict, and give your initial judgment without revealing the ending.",
    minimumLength: 120,
    runes: 30,
  },
  {
    key: "character-reflection",
    type: "writing",
    title: "The Character Observatory",
    prompt:
      "Choose a character from a book you have read. Explain one important decision they made and whether the text persuaded you that the decision was believable.",
    minimumLength: 140,
    runes: 35,
  },
  {
    key: "english-simile",
    type: "choice",
    title: "The Simile Branch",
    prompt: "Which sentence contains a simile?",
    options: [
      "Her voice was as calm as still water.",
      "Her calm voice filled the room.",
      "Her voice became quieter.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "english-apostrophe",
    type: "choice",
    title: "The Apostrophe Eyrie",
    prompt: "Which sentence uses the apostrophe correctly?",
    options: [
      "The readers notes were detailed.",
      "The reader's notes were detailed.",
      "The readers' was taking notes.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "english-its",
    type: "choice",
    title: "The Its and It's Roost",
    prompt: "Which sentence is correct?",
    options: [
      "The book lost it's cover.",
      "Its going to be discussed tomorrow.",
      "The book lost its cover.",
    ],
    answer: 2,
    runes: 15,
  },
  {
    key: "english-subject-verb",
    type: "choice",
    title: "The Agreement Gallery",
    prompt: "Which sentence has correct subject-verb agreement?",
    options: [
      "The collection of essays is fascinating.",
      "The collection of essays are fascinating.",
      "The essays collection are fascinating.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "english-comma-intro",
    type: "choice",
    title: "The Opening Comma",
    prompt: "Which sentence correctly punctuates an introductory phrase?",
    options: [
      "After finishing the chapter Lena made tea.",
      "After finishing the chapter, Lena made tea.",
      "After, finishing the chapter Lena made tea.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "english-parallel",
    type: "choice",
    title: "The Parallel Perch",
    prompt: "Which sentence uses parallel structure?",
    options: [
      "He enjoys reading, writing, and to debate.",
      "He enjoys reading, writing, and debating.",
      "He enjoys to read, writing, and debates.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "english-pronoun",
    type: "choice",
    title: "The Pronoun Watch",
    prompt: "Which sentence has a clear pronoun reference?",
    options: [
      "When Mia spoke to Ava, she was nervous.",
      "Mia was nervous when she spoke to Ava.",
      "She spoke to Ava because Mia was nervous.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "english-colon",
    type: "choice",
    title: "The Colon Chamber",
    prompt: "Which sentence uses a colon correctly?",
    options: [
      "She packed: a novel, a notebook, and a pen.",
      "She packed three things: a novel, a notebook, and a pen.",
      "She: packed three things for the trip.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "english-em-dash",
    type: "choice",
    title: "The Interruption Loft",
    prompt: "Which sentence uses dashes to mark an interruption?",
    options: [
      "The ending which surprised everyone changed the discussion.",
      "The ending - which surprised everyone - changed the discussion.",
      "The ending, which surprised everyone changed, the discussion.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "english-concise",
    type: "choice",
    title: "The Concision Nest",
    prompt: "Which sentence is the most concise?",
    options: [
      "The reason she reread the book was because she liked it.",
      "She reread the book because she liked it.",
      "Because of the fact that she liked it, she reread the book.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "literary-irony",
    type: "choice",
    title: "The Irony Observatory",
    prompt: "Which situation is an example of dramatic irony?",
    options: [
      "A character makes a joke.",
      "The reader knows the door is trapped, but the character does not.",
      "A storm begins unexpectedly.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "literary-foreshadowing",
    type: "choice",
    title: "The Foreshadowing Tower",
    prompt: "What is the main purpose of foreshadowing?",
    options: [
      "To hint at events that may happen later.",
      "To explain every character's history.",
      "To summarize the previous chapter.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "literary-narrator",
    type: "choice",
    title: "The Narrator's Window",
    prompt: "Which description best fits a first-person narrator?",
    options: [
      "A narrator who uses I and participates in the story.",
      "A narrator who knows every character's thoughts.",
      "A narrator who only describes stage directions.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "literary-theme",
    type: "choice",
    title: "The Theme Archive",
    prompt: "Which statement best describes a literary theme?",
    options: [
      "The sequence of events in a story.",
      "A central idea explored through the story.",
      "The location where the story takes place.",
    ],
    answer: 1,
    runes: 15,
  },
  {
    key: "literary-motif",
    type: "choice",
    title: "The Motif Hall",
    prompt: "What is a motif?",
    options: [
      "A recurring image, phrase, or idea that develops meaning.",
      "The final sentence of every chapter.",
      "A list of all characters in a novel.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "literary-conflict",
    type: "choice",
    title: "The Conflict Roost",
    prompt: "A character struggling with guilt is an example of which conflict?",
    options: [
      "Character versus nature.",
      "Character versus society.",
      "Character versus self.",
    ],
    answer: 2,
    runes: 15,
  },
  {
    key: "literary-tone",
    type: "choice",
    title: "The Tone Chamber",
    prompt: "What does tone describe?",
    options: [
      "The author's attitude toward the subject.",
      "The number of chapters in the book.",
      "The speed at which a reader finishes.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "vocabulary-context",
    type: "choice",
    title: "The Context Clue Perch",
    prompt: 'In "The path was arduous, leaving the hikers exhausted," what does arduous mean?',
    options: ["Easy", "Difficult", "Hidden"],
    answer: 1,
    runes: 15,
  },
  {
    key: "vocabulary-ambiguous",
    type: "choice",
    title: "The Ambiguity Alcove",
    prompt: "What does ambiguous mean?",
    options: [
      "Open to more than one interpretation.",
      "Written in alphabetical order.",
      "Completely without emotion.",
    ],
    answer: 0,
    runes: 15,
  },
  {
    key: "vocabulary-benevolent",
    type: "choice",
    title: "The Benevolent Branch",
    prompt: "Which word is closest in meaning to benevolent?",
    options: ["Kind", "Noisy", "Uncertain"],
    answer: 0,
    runes: 15,
  },
  {
    key: "review-evidence",
    type: "writing",
    title: "The Evidence Desk",
    prompt:
      "Make one clear claim about a book and support it with a specific event, detail, or brief paraphrase from the text.",
    minimumLength: 130,
    runes: 30,
  },
  {
    key: "setting-analysis",
    type: "writing",
    title: "The Setting Observatory",
    prompt:
      "Explain how the setting of a book affects its characters, conflict, or mood. Use at least one specific example.",
    minimumLength: 140,
    runes: 35,
  },
  {
    key: "compare-characters",
    type: "writing",
    title: "The Character Council",
    prompt:
      "Compare two characters from the same or different books. Identify one meaningful similarity and one meaningful difference.",
    minimumLength: 160,
    runes: 35,
  },
  {
    key: "ending-evaluation",
    type: "writing",
    title: "The Final Page Tribunal",
    prompt:
      "Evaluate a book's ending. Explain whether it follows convincingly from what came before, without merely summarizing it.",
    minimumLength: 150,
    runes: 35,
  },
  {
    key: "recommendation-pitch",
    type: "writing",
    title: "The Recommendation Flight",
    prompt:
      "Write a spoiler-free recommendation for a specific reader. Explain what kind of reader would value the book and why.",
    minimumLength: 130,
    runes: 30,
  },
];

const ACTIVE_LEARNING_TASKS = 6;

const CHIPPINGS_ITEMS = [
  {
    key: "theme-midnight",
    type: "theme",
    name: "Midnight Athenaeum",
    description: "Deep navy shelves, moonlit paper, and silver-blue accents.",
    price: 80,
    preview: ["#101827", "#dbe4ef", "#7393b3"],
  },
  {
    key: "theme-rosewood",
    type: "theme",
    name: "Rosewood Reading Room",
    description: "Warm burgundy, parchment, and burnished copper tones.",
    price: 90,
    preview: ["#4b2028", "#f3e7d5", "#b86f52"],
  },
  {
    key: "theme-scriptorium",
    type: "theme",
    name: "Golden Scriptorium",
    description: "Ink-black panels with illuminated gold and vellum.",
    price: 110,
    preview: ["#201c17", "#f2e4bd", "#d5a744"],
  },
  {
    key: "theme-moss",
    type: "theme",
    name: "Mossbound Archive",
    description: "A softer woodland palette of moss, fern, and old paper.",
    price: 70,
    preview: ["#26382c", "#e9e2ca", "#8da071"],
  },
  {
    key: "theme-celestial",
    type: "theme",
    name: "Celestial Observatory",
    description: "Indigo skies, starlight, and pale lunar parchment.",
    price: 95,
    preview: ["#1c1c46", "#ecebff", "#9b8ee8"],
  },
  {
    key: "theme-ocean",
    type: "theme",
    name: "Tidebound Study",
    description: "Deep teal shelves with sea-glass and foam-white accents.",
    price: 85,
    preview: ["#123b42", "#e6f1ed", "#54a7a2"],
  },
  {
    key: "theme-autumn",
    type: "theme",
    name: "Autumn Folio",
    description: "Russet leaves, dark oak, and softly aged paper.",
    price: 75,
    preview: ["#512d22", "#f0dfbf", "#c4773c"],
  },
  {
    key: "theme-violet",
    type: "theme",
    name: "Violet Cabinet",
    description: "Plum velvet, lilac paper, and antique brass details.",
    price: 100,
    preview: ["#3b2345", "#eee3f1", "#a982b5"],
  },
  {
    key: "frame-laurel",
    type: "frame",
    name: "Laurel Reader",
    description: "A classical green and gold ring for a thoughtful reader.",
    price: 45,
    preview: ["#173a2d", "#c98945"],
  },
  {
    key: "frame-moon",
    type: "frame",
    name: "Moonlit Scholar",
    description: "A silver-blue halo with a quiet midnight glow.",
    price: 55,
    preview: ["#b8c9dc", "#334b68"],
  },
  {
    key: "frame-ember",
    type: "frame",
    name: "Ember Quill",
    description: "Copper and crimson edging for spirited commentary.",
    price: 60,
    preview: ["#d1764f", "#6f2631"],
  },
  {
    key: "frame-owl",
    type: "frame",
    name: "Parliament Crest",
    description: "A distinguished gold frame inspired by the Parliament of Owls.",
    price: 75,
    preview: ["#d5a744", "#f2e4bd"],
  },
  {
    key: "frame-runes",
    type: "frame",
    name: "Runekeeper",
    description: "A violet ring marked by the glow of earned Runes.",
    price: 85,
    preview: ["#8066a5", "#d8c7ee"],
  },
];

function storeItem(key) {
  return CHIPPINGS_ITEMS.find((item) => item.key === key);
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
          reading_count INTEGER NOT NULL DEFAULT 0,
          unread INTEGER NOT NULL DEFAULT 0,
          recent_books JSONB NOT NULL DEFAULT '[]'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        ALTER TABLE library_stats
        ADD COLUMN IF NOT EXISTS reading_count INTEGER NOT NULL DEFAULT 0
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
          creative_writing JSONB NOT NULL DEFAULT '[]'::jsonb,
          wordhub JSONB NOT NULL DEFAULT '[]'::jsonb,
          dreams JSONB NOT NULL DEFAULT '[]'::jsonb,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        ALTER TABLE library_data
        ADD COLUMN IF NOT EXISTS creative_writing JSONB NOT NULL DEFAULT '[]'::jsonb
      `;
      await sql`
        ALTER TABLE library_data
        ADD COLUMN IF NOT EXISTS wordhub JSONB NOT NULL DEFAULT '[]'::jsonb
      `;
      await sql`
        ALTER TABLE library_data
        ADD COLUMN IF NOT EXISTS dreams JSONB NOT NULL DEFAULT '[]'::jsonb
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
      await sql`
        CREATE TABLE IF NOT EXISTS library_book_covers (
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          book_id TEXT NOT NULL,
          image_data TEXT NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (user_id, book_id)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_journals (
          id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          reflection TEXT NOT NULL,
          book_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
          entry_date DATE NOT NULL,
          is_shared BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_reading_facts (
          id UUID PRIMARY KEY,
          fact TEXT NOT NULL,
          created_by UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_dream_facts (
          id UUID PRIMARY KEY,
          fact TEXT NOT NULL,
          created_by UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_market_listings (
          id UUID PRIMARY KEY,
          seller_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          book_id TEXT NOT NULL,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          genre TEXT NOT NULL DEFAULT '',
          price NUMERIC(12, 2) NOT NULL,
          currency TEXT NOT NULL,
          note TEXT NOT NULL DEFAULT '',
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS library_market_active_book
        ON library_market_listings (seller_id, book_id)
        WHERE is_active = TRUE
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_market_messages (
          id UUID PRIMARY KEY,
          listing_id UUID NOT NULL REFERENCES library_market_listings(id) ON DELETE CASCADE,
          author_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          message TEXT NOT NULL,
          offer_price NUMERIC(12, 2),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_learning_progress (
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          task_key TEXT NOT NULL,
          response TEXT NOT NULL DEFAULT '',
          runes_awarded INTEGER NOT NULL,
          completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (user_id, task_key)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_daily_streaks (
          user_id UUID PRIMARY KEY REFERENCES library_users(id) ON DELETE CASCADE,
          current_streak INTEGER NOT NULL DEFAULT 0,
          longest_streak INTEGER NOT NULL DEFAULT 0,
          last_claim_date DATE,
          runes_awarded INTEGER NOT NULL DEFAULT 0,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_dream_rewards (
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          dream_id TEXT NOT NULL,
          runes_awarded INTEGER NOT NULL DEFAULT 50,
          awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (user_id, dream_id)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_quandaries (
          id UUID PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          category TEXT NOT NULL,
          title TEXT NOT NULL,
          details TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'open',
          admin_note TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          resolved_at TIMESTAMPTZ
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_store_purchases (
          user_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          item_key TEXT NOT NULL,
          price_paid INTEGER NOT NULL,
          purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (user_id, item_key)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_cosmetics (
          user_id UUID PRIMARY KEY REFERENCES library_users(id) ON DELETE CASCADE,
          equipped_theme TEXT NOT NULL DEFAULT '',
          equipped_frame TEXT NOT NULL DEFAULT '',
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_debates (
          id UUID PRIMARY KEY,
          inviter_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          invitee_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          topic TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          responded_at TIMESTAMPTZ
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_reading_challenges (
          id UUID PRIMARY KEY,
          inviter_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          invitee_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          challenge_type TEXT NOT NULL,
          target_value INTEGER NOT NULL,
          title TEXT NOT NULL,
          message TEXT NOT NULL DEFAULT '',
          deadline DATE NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          responded_at TIMESTAMPTZ,
          completed_at TIMESTAMPTZ
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_debate_messages (
          id UUID PRIMARY KEY,
          debate_id UUID NOT NULL REFERENCES library_debates(id) ON DELETE CASCADE,
          author_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS library_announcements (
          id UUID PRIMARY KEY,
          author_id UUID NOT NULL REFERENCES library_users(id) ON DELETE CASCADE,
          title TEXT NOT NULL,
          message TEXT NOT NULL,
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
        const readingCount = importedBooks.filter(
          (book) => book.status === "reading",
        ).length;
        await sql`
          UPDATE library_stats SET
            owned = ${importedBooks.length},
            read_count = ${readCount},
            reading_count = ${readingCount},
            unread = ${importedBooks.length - readCount - readingCount},
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
        SELECT books, reading_log, passages, wishlist, creative_writing,
               wordhub, dreams, updated_at
        FROM library_data WHERE user_id = ${user.id}
      `;
      const row = rows[0] || {};
      return json(response, 200, {
        books: row.books || [],
        readingLog: row.reading_log || [],
        passages: row.passages || [],
        wishlist: row.wishlist || [],
        creativeWriting: row.creative_writing || [],
        wordhub: row.wordhub || [],
        dreams: row.dreams || [],
        updatedAt: row.updated_at || null,
      });
    }

    if (action === "data" && request.method === "POST") {
      const cleanArray = (value) =>
        Array.isArray(value) ? value.slice(0, 5000) : [];
      const existingRows = await sql`
        SELECT dreams FROM library_data WHERE user_id = ${user.id}
      `;
      const existingDreams = Array.isArray(existingRows[0]?.dreams)
        ? existingRows[0].dreams
        : [];
      const incomingDreams = cleanArray(body.dreams);
      const dreamMap = new Map();
      [...existingDreams, ...incomingDreams].forEach((dream) => {
        const id = String(dream?.id || "");
        if (!id) return;
        const previous = dreamMap.get(id);
        const previousTime = Date.parse(previous?.updatedAt || previous?.createdAt || 0) || 0;
        const nextTime = Date.parse(dream?.updatedAt || dream?.createdAt || 0) || 0;
        if (!previous || nextTime >= previousTime) dreamMap.set(id, dream);
      });
      const mergedDreams = [...dreamMap.values()].slice(0, 5000);
      await sql`
        INSERT INTO library_data (
          user_id, books, reading_log, passages, wishlist, creative_writing,
          wordhub, dreams, updated_at
        )
        VALUES (
          ${user.id}, ${JSON.stringify(cleanArray(body.books))}::jsonb,
          ${JSON.stringify(cleanArray(body.readingLog))}::jsonb,
          ${JSON.stringify(cleanArray(body.passages))}::jsonb,
          ${JSON.stringify(cleanArray(body.wishlist))}::jsonb,
          ${JSON.stringify(cleanArray(body.creativeWriting))}::jsonb,
          ${JSON.stringify(cleanArray(body.wordhub))}::jsonb,
          ${JSON.stringify(mergedDreams)}::jsonb, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          books = EXCLUDED.books,
          reading_log = EXCLUDED.reading_log,
          passages = EXCLUDED.passages,
          wishlist = EXCLUDED.wishlist,
          creative_writing = EXCLUDED.creative_writing,
          wordhub = EXCLUDED.wordhub,
          dreams = EXCLUDED.dreams,
          updated_at = NOW()
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "cover-index" && request.method === "GET") {
      const rows = await sql`
        SELECT book_id FROM library_book_covers WHERE user_id = ${user.id}
      `;
      return json(response, 200, {
        bookIds: rows.map((item) => item.book_id),
      });
    }

    if (action === "cover-load" && request.method === "POST") {
      const rows = await sql`
        SELECT image_data FROM library_book_covers
        WHERE user_id = ${user.id} AND book_id = ${String(body.bookId || "")}
        LIMIT 1
      `;
      return json(response, 200, { image: rows[0]?.image_data || "" });
    }

    if (action === "cover-save" && request.method === "POST") {
      const image = String(body.image || "");
      if (!image.startsWith("data:image/") || image.length > 1_500_000) {
        return json(response, 400, { error: "That book photo is too large." });
      }
      await sql`
        INSERT INTO library_book_covers (user_id, book_id, image_data)
        VALUES (${user.id}, ${String(body.bookId || "")}, ${image})
        ON CONFLICT (user_id, book_id) DO UPDATE SET
          image_data = EXCLUDED.image_data,
          updated_at = NOW()
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "cover-delete" && request.method === "POST") {
      await sql`
        DELETE FROM library_book_covers
        WHERE user_id = ${user.id} AND book_id = ${String(body.bookId || "")}
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "journals" && request.method === "GET") {
      const rows = await sql`
        SELECT id, reflection, book_tags, entry_date, is_shared, created_at, updated_at
        FROM library_journals
        WHERE user_id = ${user.id}
        ORDER BY entry_date DESC, created_at DESC
      `;
      return json(response, 200, {
        journals: rows.map((item) => ({
          id: item.id,
          reflection: item.reflection,
          books: item.book_tags || [],
          entryDate: item.entry_date,
          isShared: item.is_shared,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        })),
      });
    }

    if (action === "journal-save" && request.method === "POST") {
      const id = String(body.id || crypto.randomUUID());
      const reflection = String(body.reflection || "").trim().slice(0, 10000);
      const entryDate = String(body.entryDate || "").slice(0, 10);
      const isShared = Boolean(body.isShared);
      const books = Array.isArray(body.books)
        ? body.books.slice(0, 50).map((book) => ({
            id: String(book.id || ""),
            title: String(book.title || "Untitled").slice(0, 300),
            author: String(book.author || "Unknown author").slice(0, 300),
          }))
        : [];
      if (!reflection || !/^\d{4}-\d{2}-\d{2}$/.test(entryDate)) {
        return json(response, 400, { error: "Add a date and reflection." });
      }
      const previous = await sql`
        SELECT is_shared FROM library_journals
        WHERE id = ${id} AND user_id = ${user.id}
      `;
      await sql`
        INSERT INTO library_journals (
          id, user_id, reflection, book_tags, entry_date, is_shared
        )
        VALUES (
          ${id}, ${user.id}, ${reflection}, ${JSON.stringify(books)}::jsonb,
          ${entryDate}, ${isShared}
        )
        ON CONFLICT (id) DO UPDATE SET
          reflection = EXCLUDED.reflection,
          book_tags = EXCLUDED.book_tags,
          entry_date = EXCLUDED.entry_date,
          is_shared = EXCLUDED.is_shared,
          updated_at = NOW()
        WHERE library_journals.user_id = ${user.id}
      `;
      await unlockAchievement(
        user.id,
        "first-journal",
        "Reflective reader",
        "Wrote your first reading journal entry.",
      );
      if (isShared && !previous[0]?.is_shared) {
        const followers = await sql`
          SELECT follower_id FROM library_follows WHERE following_id = ${user.id}
        `;
        await Promise.all(
          followers.map((follower) =>
            addNotification(
              follower.follower_id,
              "journal",
              "New shared reflection",
              `${user.username} shared a new reading journal entry.`,
              `journal:${id}:${follower.follower_id}`,
            ),
          ),
        );
      }
      return json(response, 200, { ok: true, id });
    }

    if (action === "journal-delete" && request.method === "POST") {
      await sql`
        DELETE FROM library_journals
        WHERE id = ${String(body.id || "")} AND user_id = ${user.id}
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

    if (action === "facts" && request.method === "GET") {
      const rows = await sql`
        SELECT id, fact, created_at
        FROM library_reading_facts
        ORDER BY created_at DESC
        LIMIT 100
      `;
      const facts = rows.length
        ? rows.map((item) => ({
            id: item.id,
            fact: item.fact,
            createdAt: item.created_at,
            removable: true,
          }))
        : DEFAULT_READING_FACTS.map((fact, index) => ({
            id: `default-${index + 1}`,
            fact,
            createdAt: null,
            removable: false,
          }));
      return json(response, 200, { facts });
    }

    if (action === "fact-save" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      const fact = String(body.fact || "").trim().slice(0, 320);
      if (fact.length < 10) {
        return json(response, 400, { error: "Add a slightly longer reading fact." });
      }
      await sql`
        INSERT INTO library_reading_facts (id, fact, created_by)
        VALUES (${crypto.randomUUID()}, ${fact}, ${user.id})
      `;
      return json(response, 201, { ok: true });
    }

    if (action === "fact-delete" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      await sql`
        DELETE FROM library_reading_facts
        WHERE id = ${String(body.id || "")}
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "dream-facts" && request.method === "GET") {
      const rows = await sql`
        SELECT id, fact, created_at
        FROM library_dream_facts
        ORDER BY created_at DESC
        LIMIT 100
      `;
      const facts = rows.length
        ? rows.map((item) => ({
            id: item.id,
            fact: item.fact,
            createdAt: item.created_at,
            removable: true,
          }))
        : DEFAULT_DREAM_FACTS.map((fact, index) => ({
            id: `dream-default-${index + 1}`,
            fact,
            createdAt: null,
            removable: false,
          }));
      return json(response, 200, { facts });
    }

    if (action === "dream-fact-save" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      const fact = String(body.fact || "").trim().slice(0, 320);
      if (fact.length < 10) {
        return json(response, 400, { error: "Add a slightly longer dream fact." });
      }
      await sql`
        INSERT INTO library_dream_facts (id, fact, created_by)
        VALUES (${crypto.randomUUID()}, ${fact}, ${user.id})
      `;
      return json(response, 201, { ok: true });
    }

    if (action === "dream-fact-delete" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      await sql`
        DELETE FROM library_dream_facts
        WHERE id = ${String(body.id || "")}
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "marketplace" && request.method === "GET") {
      const listings = await sql`
        SELECT l.id, l.seller_id, l.book_id, l.title, l.author, l.genre,
               l.price, l.currency, l.note, l.created_at,
               u.username, u.profile_image
        FROM library_market_listings l
        JOIN library_users u ON u.id = l.seller_id
        WHERE l.is_active = TRUE
        ORDER BY l.created_at DESC
        LIMIT 300
      `;
      const messages = await sql`
        SELECT m.id, m.listing_id, m.author_id, m.message, m.offer_price,
               m.created_at, u.username
        FROM library_market_messages m
        JOIN library_users u ON u.id = m.author_id
        JOIN library_market_listings l ON l.id = m.listing_id
        WHERE l.is_active = TRUE
        ORDER BY m.created_at
        LIMIT 3000
      `;
      return json(response, 200, {
        listings: listings.map((item) => ({
          id: item.id,
          sellerId: item.seller_id,
          seller: item.username,
          sellerImage: item.profile_image || "",
          bookId: item.book_id,
          title: item.title,
          author: item.author,
          genre: item.genre,
          price: Number(item.price),
          currency: item.currency,
          note: item.note,
          createdAt: item.created_at,
          messages: messages
            .filter((message) => message.listing_id === item.id)
            .map((message) => ({
              id: message.id,
              authorId: message.author_id,
              author: message.username,
              message: message.message,
              offerPrice:
                message.offer_price === null
                  ? null
                  : Number(message.offer_price),
              createdAt: message.created_at,
            })),
        })),
      });
    }

    if (action === "market-list" && request.method === "POST") {
      const price = Number(body.price);
      const currency = String(body.currency || "").toUpperCase();
      if (!Number.isFinite(price) || price <= 0 || price > 1_000_000) {
        return json(response, 400, { error: "Enter a valid asking price." });
      }
      if (!["ZAR", "USD", "EUR", "GBP"].includes(currency)) {
        return json(response, 400, { error: "Choose a supported currency." });
      }
      const listingId = crypto.randomUUID();
      try {
        await sql`
          INSERT INTO library_market_listings (
            id, seller_id, book_id, title, author, genre, price, currency, note
          )
          VALUES (
            ${listingId}, ${user.id}, ${String(body.bookId || "")},
            ${String(body.title || "Untitled").slice(0, 300)},
            ${String(body.author || "Unknown author").slice(0, 300)},
            ${String(body.genre || "").slice(0, 120)}, ${price}, ${currency},
            ${String(body.note || "").trim().slice(0, 800)}
          )
        `;
      } catch (error) {
        if (String(error.message || "").includes("library_market_active_book")) {
          return json(response, 409, { error: "That book is already listed for sale." });
        }
        throw error;
      }
      return json(response, 201, { ok: true, id: listingId });
    }

    if (action === "market-withdraw" && request.method === "POST") {
      await sql`
        UPDATE library_market_listings
        SET is_active = FALSE, updated_at = NOW()
        WHERE id = ${String(body.listingId || "")} AND seller_id = ${user.id}
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "market-message" && request.method === "POST") {
      const listingId = String(body.listingId || "");
      const message = String(body.message || "").trim().slice(0, 1000);
      const rawOffer = body.offerPrice;
      const offerPrice =
        rawOffer === "" || rawOffer === null || rawOffer === undefined
          ? null
          : Number(rawOffer);
      if (!message && offerPrice === null) {
        return json(response, 400, { error: "Add a comment or price offer." });
      }
      if (
        offerPrice !== null &&
        (!Number.isFinite(offerPrice) || offerPrice <= 0 || offerPrice > 1_000_000)
      ) {
        return json(response, 400, { error: "Enter a valid offer price." });
      }
      const listing = await sql`
        SELECT seller_id, title
        FROM library_market_listings
        WHERE id = ${listingId} AND is_active = TRUE
        LIMIT 1
      `;
      if (!listing.length) {
        return json(response, 404, { error: "That listing is no longer available." });
      }
      await sql`
        INSERT INTO library_market_messages (
          id, listing_id, author_id, message, offer_price
        )
        VALUES (
          ${crypto.randomUUID()}, ${listingId}, ${user.id}, ${message},
          ${offerPrice}
        )
      `;
      if (listing[0].seller_id !== user.id) {
        await addNotification(
          listing[0].seller_id,
          "marketplace",
          offerPrice === null ? "Marketplace comment" : "New price offer",
          `${user.username} responded to your listing for ${listing[0].title}.`,
          null,
        );
      }
      return json(response, 201, { ok: true });
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

    if (action === "learning" && request.method === "GET") {
      const previousStreak = await sql`
        SELECT last_claim_date, last_claim_date = CURRENT_DATE AS claimed_today
        FROM library_daily_streaks
        WHERE user_id = ${user.id}
        LIMIT 1
      `;
      const earnedDailyReward =
        !previousStreak.length || !previousStreak[0].claimed_today;
      const streakRows = await sql`
        INSERT INTO library_daily_streaks (
          user_id, current_streak, longest_streak, last_claim_date,
          runes_awarded, updated_at
        )
        VALUES (${user.id}, 1, 1, CURRENT_DATE, 5, NOW())
        ON CONFLICT (user_id) DO UPDATE SET
          current_streak = CASE
            WHEN library_daily_streaks.last_claim_date = CURRENT_DATE
              THEN library_daily_streaks.current_streak
            WHEN library_daily_streaks.last_claim_date = CURRENT_DATE - 1
              THEN library_daily_streaks.current_streak + 1
            ELSE 1
          END,
          longest_streak = GREATEST(
            library_daily_streaks.longest_streak,
            CASE
              WHEN library_daily_streaks.last_claim_date = CURRENT_DATE
                THEN library_daily_streaks.current_streak
              WHEN library_daily_streaks.last_claim_date = CURRENT_DATE - 1
                THEN library_daily_streaks.current_streak + 1
              ELSE 1
            END
          ),
          runes_awarded = library_daily_streaks.runes_awarded + CASE
            WHEN library_daily_streaks.last_claim_date = CURRENT_DATE THEN 0
            ELSE 5
          END,
          last_claim_date = CURRENT_DATE,
          updated_at = NOW()
        RETURNING current_streak, longest_streak, last_claim_date,
                  runes_awarded
      `;
      const progress = await sql`
        SELECT task_key, response, runes_awarded, completed_at
        FROM library_learning_progress
        WHERE user_id = ${user.id}
      `;
      const learningRunes = progress.reduce(
        (total, item) => total + Number(item.runes_awarded || 0),
        0,
      );
      const dreamRuneRows = await sql`
        SELECT COALESCE(SUM(runes_awarded), 0)::int AS awarded
        FROM library_dream_rewards
        WHERE user_id = ${user.id}
      `;
      const spendingRows = await sql`
        SELECT COALESCE(SUM(price_paid), 0)::int AS spent
        FROM library_store_purchases
        WHERE user_id = ${user.id}
      `;
      const completedKeys = new Set(progress.map((item) => item.task_key));
      const availableTasks = LEARNING_TASKS.filter(
        (task) => !completedKeys.has(task.key),
      ).slice(0, ACTIVE_LEARNING_TASKS);
      const streak = streakRows[0];
      if (earnedDailyReward) {
        await addNotification(
          user.id,
          "streak",
          "Daily streak reward",
          `Day ${streak.current_streak}: you earned 5 Runes for continuing your daily streak.`,
          `streak:${String(streak.last_claim_date).slice(0, 10)}`,
        );
      }
      return json(response, 200, {
        runes: Math.max(
          0,
          learningRunes +
            Number(streak.runes_awarded || 0) +
            Number(dreamRuneRows[0].awarded || 0) -
            Number(spendingRows[0].spent || 0),
        ),
        streak: {
          current: streak.current_streak,
          longest: streak.longest_streak,
          lastClaimDate: streak.last_claim_date,
          dailyReward: 5,
          earnedDailyReward,
        },
        completedTasks: progress.length,
        remainingTasks: Math.max(0, LEARNING_TASKS.length - progress.length),
        tasks: availableTasks.map((task) => ({
            key: task.key,
            type: task.type,
            title: task.title,
            prompt: task.prompt,
            options: task.options || [],
            minimumLength: task.minimumLength || 0,
            runes: task.runes,
          })),
      });
    }

    if (action === "learning-complete" && request.method === "POST") {
      const task = LEARNING_TASKS.find(
        (item) => item.key === String(body.taskKey || ""),
      );
      if (!task) {
        return json(response, 404, { error: "That assignment was not found." });
      }
      const existing = await sql`
        SELECT 1 FROM library_learning_progress
        WHERE user_id = ${user.id} AND task_key = ${task.key}
      `;
      if (existing.length) {
        return json(response, 409, { error: "You have already completed this assignment." });
      }
      let responseText = "";
      if (task.type === "choice") {
        const answer = Number(body.answer);
        if (answer !== task.answer) {
          return json(response, 400, {
            error: "The Parliament of Owls asks you to consider that answer again.",
          });
        }
        responseText = String(answer);
      } else {
        responseText = String(body.response || "").trim().slice(0, 5000);
        if (responseText.length < task.minimumLength) {
          return json(response, 400, {
            error: `Write at least ${task.minimumLength} characters for this assignment.`,
          });
        }
      }
      await sql`
        INSERT INTO library_learning_progress (
          user_id, task_key, response, runes_awarded
        )
        VALUES (${user.id}, ${task.key}, ${responseText}, ${task.runes})
      `;
      await addNotification(
        user.id,
        "learning",
        "Runes earned",
        `The Parliament of Owls awarded you ${task.runes} Runes for completing ${task.title}.`,
        `learning:${task.key}`,
      );
      return json(response, 201, { ok: true, runesAwarded: task.runes });
    }

    if (action === "dream-reward" && request.method === "POST") {
      const dreamId = String(body.dreamId || "").trim().slice(0, 200);
      if (!dreamId) {
        return json(response, 400, { error: "Dream entry required." });
      }
      const ownedDream = await sql`
        SELECT 1
        FROM library_data
        WHERE user_id = ${user.id}
          AND dreams @> ${JSON.stringify([{ id: dreamId }])}::jsonb
        LIMIT 1
      `;
      if (!ownedDream.length) {
        return json(response, 404, { error: "Save the dream before claiming its reward." });
      }
      const targetAward = body.hasNotes ? 100 : 50;
      const previous = await sql`
        SELECT runes_awarded
        FROM library_dream_rewards
        WHERE user_id = ${user.id} AND dream_id = ${dreamId}
      `;
      const previousAward = Number(previous[0]?.runes_awarded || 0);
      const rows = await sql`
        INSERT INTO library_dream_rewards (
          user_id, dream_id, runes_awarded, awarded_at, updated_at
        )
        VALUES (${user.id}, ${dreamId}, ${targetAward}, NOW(), NOW())
        ON CONFLICT (user_id, dream_id) DO UPDATE SET
          runes_awarded = GREATEST(
            library_dream_rewards.runes_awarded,
            EXCLUDED.runes_awarded
          ),
          updated_at = NOW()
        RETURNING runes_awarded
      `;
      const totalAward = Number(rows[0].runes_awarded || 0);
      const newlyAwarded = Math.max(0, totalAward - previousAward);
      if (newlyAwarded) {
        await addNotification(
          user.id,
          "learning",
          "Dream journal Runes",
          `The Parliament of Owls awarded you ${newlyAwarded} Runes for ${previousAward ? "adding dream notes" : "recording a dream"}.`,
          `dream-runes:${dreamId}:${totalAward}`,
        );
      }
      return json(response, 200, {
        ok: true,
        runesAwarded: newlyAwarded,
        totalDreamRunes: totalAward,
      });
    }

    if (action === "store" && request.method === "GET") {
      const purchases = await sql`
        SELECT item_key, price_paid, purchased_at
        FROM library_store_purchases
        WHERE user_id = ${user.id}
        ORDER BY purchased_at
      `;
      const cosmetics = await sql`
        SELECT equipped_theme, equipped_frame
        FROM library_cosmetics
        WHERE user_id = ${user.id}
        LIMIT 1
      `;
      const balanceRows = await sql`
        SELECT
          COALESCE((
            SELECT SUM(runes_awarded)
            FROM library_learning_progress
            WHERE user_id = ${user.id}
          ), 0)::int
          + COALESCE((
            SELECT runes_awarded
            FROM library_daily_streaks
            WHERE user_id = ${user.id}
          ), 0)::int
          + COALESCE((
            SELECT SUM(runes_awarded)
            FROM library_dream_rewards
            WHERE user_id = ${user.id}
          ), 0)::int
          - COALESCE((
            SELECT SUM(price_paid)
            FROM library_store_purchases
            WHERE user_id = ${user.id}
          ), 0)::int AS balance
      `;
      const owned = new Set(purchases.map((item) => item.item_key));
      return json(response, 200, {
        balance: Math.max(0, Number(balanceRows[0].balance || 0)),
        equipped: {
          theme: cosmetics[0]?.equipped_theme || "",
          frame: cosmetics[0]?.equipped_frame || "",
        },
        items: CHIPPINGS_ITEMS.map((item) => ({
          ...item,
          owned: owned.has(item.key),
          purchasedAt:
            purchases.find((purchase) => purchase.item_key === item.key)
              ?.purchased_at || null,
        })),
      });
    }

    if (action === "store-purchase" && request.method === "POST") {
      const item = storeItem(String(body.itemKey || ""));
      if (!item) {
        return json(response, 404, { error: "That item is not available in The Chippings." });
      }
      const rows = await sql`
        INSERT INTO library_store_purchases (
          user_id, item_key, price_paid
        )
        SELECT ${user.id}, ${item.key}, ${item.price}
        WHERE NOT EXISTS (
          SELECT 1 FROM library_store_purchases
          WHERE user_id = ${user.id} AND item_key = ${item.key}
        )
        AND (
          COALESCE((
            SELECT SUM(runes_awarded)
            FROM library_learning_progress
            WHERE user_id = ${user.id}
          ), 0)
          + COALESCE((
            SELECT runes_awarded
            FROM library_daily_streaks
            WHERE user_id = ${user.id}
          ), 0)
          + COALESCE((
            SELECT SUM(runes_awarded)
            FROM library_dream_rewards
            WHERE user_id = ${user.id}
          ), 0)
          - COALESCE((
            SELECT SUM(price_paid)
            FROM library_store_purchases
            WHERE user_id = ${user.id}
          ), 0)
        ) >= ${item.price}
        RETURNING item_key
      `;
      if (!rows.length) {
        const owned = await sql`
          SELECT 1 FROM library_store_purchases
          WHERE user_id = ${user.id} AND item_key = ${item.key}
        `;
        return json(response, 409, {
          error: owned.length
            ? "You already own that item."
            : "You do not have enough Runes for that item yet.",
        });
      }
      await addNotification(
        user.id,
        "store",
        "Purchase complete",
        `${item.name} is now in your Chippings collection.`,
        `store:${item.key}`,
      );
      return json(response, 201, { ok: true });
    }

    if (action === "store-equip" && request.method === "POST") {
      const type = String(body.type || "");
      const itemKey = String(body.itemKey || "");
      if (!["theme", "frame"].includes(type)) {
        return json(response, 400, { error: "Choose a valid cosmetic type." });
      }
      if (itemKey) {
        const item = storeItem(itemKey);
        if (!item || item.type !== type) {
          return json(response, 400, { error: "That cosmetic cannot be equipped there." });
        }
        const owned = await sql`
          SELECT 1 FROM library_store_purchases
          WHERE user_id = ${user.id} AND item_key = ${itemKey}
        `;
        if (!owned.length) {
          return json(response, 403, { error: "Purchase that item before equipping it." });
        }
      }
      await sql`
        INSERT INTO library_cosmetics (
          user_id, equipped_theme, equipped_frame, updated_at
        )
        VALUES (
          ${user.id},
          ${type === "theme" ? itemKey : ""},
          ${type === "frame" ? itemKey : ""},
          NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          equipped_theme = CASE
            WHEN ${type} = 'theme' THEN ${itemKey}
            ELSE library_cosmetics.equipped_theme
          END,
          equipped_frame = CASE
            WHEN ${type} = 'frame' THEN ${itemKey}
            ELSE library_cosmetics.equipped_frame
          END,
          updated_at = NOW()
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "quandaries" && request.method === "GET") {
      const quandaries =
        user.role === "admin"
          ? await sql`
              SELECT q.*, u.username
              FROM library_quandaries q
              JOIN library_users u ON u.id = q.user_id
              ORDER BY
                CASE WHEN q.status = 'open' THEN 0 ELSE 1 END,
                q.created_at DESC
              LIMIT 250
            `
          : await sql`
              SELECT q.*, u.username
              FROM library_quandaries q
              JOIN library_users u ON u.id = q.user_id
              WHERE q.user_id = ${user.id}
              ORDER BY q.created_at DESC
              LIMIT 50
            `;
      return json(response, 200, {
        quandaries: quandaries.map((item) => ({
          id: item.id,
          userId: item.user_id,
          username: item.username,
          category: item.category,
          title: item.title,
          details: item.details,
          status: item.status,
          adminNote: item.admin_note,
          createdAt: item.created_at,
          resolvedAt: item.resolved_at,
        })),
      });
    }

    if (action === "quandary-save" && request.method === "POST") {
      const category = String(body.category || "Other").trim().slice(0, 60);
      const title = String(body.title || "").trim().slice(0, 160);
      const details = String(body.details || "").trim().slice(0, 5000);
      if (title.length < 4 || details.length < 10) {
        return json(response, 400, {
          error: "Give the quandary a clear title and a little more detail.",
        });
      }
      const id = crypto.randomUUID();
      await sql`
        INSERT INTO library_quandaries (
          id, user_id, category, title, details
        )
        VALUES (${id}, ${user.id}, ${category}, ${title}, ${details})
      `;
      const admins = await sql`
        SELECT id FROM library_users WHERE role = 'admin'
      `;
      await Promise.all(
        admins.map((admin) =>
          addNotification(
            admin.id,
            "quandary",
            "New quandary reported",
            `${user.username} reported: ${title}`,
            `quandary:${id}`,
          ),
        ),
      );
      return json(response, 201, { ok: true });
    }

    if (action === "quandary-resolve" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      const id = String(body.id || "");
      const adminNote = String(body.adminNote || "").trim().slice(0, 2000);
      const rows = await sql`
        UPDATE library_quandaries
        SET status = 'resolved', admin_note = ${adminNote},
            resolved_at = NOW()
        WHERE id = ${id} AND status = 'open'
        RETURNING user_id, title
      `;
      if (!rows.length) {
        return json(response, 404, { error: "That quandary is no longer open." });
      }
      await addNotification(
        rows[0].user_id,
        "quandary",
        "Quandary reviewed",
        adminNote || `The administrator reviewed your quandary: ${rows[0].title}`,
        `quandary-resolved:${id}`,
      );
      return json(response, 200, { ok: true });
    }

    if (action === "debates" && request.method === "GET") {
      const debates = await sql`
        SELECT
          d.id, d.inviter_id, d.invitee_id, d.topic, d.status,
          d.created_at, d.responded_at,
          inviter.username AS inviter_name,
          inviter.profile_image AS inviter_image,
          invitee.username AS invitee_name,
          invitee.profile_image AS invitee_image
        FROM library_debates d
        JOIN library_users inviter ON inviter.id = d.inviter_id
        JOIN library_users invitee ON invitee.id = d.invitee_id
        WHERE d.status = 'accepted'
          OR (
            d.status = 'pending'
            AND (${user.id} = d.inviter_id OR ${user.id} = d.invitee_id)
          )
        ORDER BY d.created_at DESC
        LIMIT 100
      `;
      const messages = debates.length
        ? await sql`
            SELECT
              m.id, m.debate_id, m.author_id, m.message, m.created_at,
              u.username AS author_name
            FROM library_debate_messages m
            JOIN library_users u ON u.id = m.author_id
            JOIN library_debates d ON d.id = m.debate_id
            WHERE d.status = 'accepted'
            ORDER BY m.created_at
          `
        : [];
      return json(response, 200, {
        debates: debates.map((item) => ({
          id: item.id,
          inviterId: item.inviter_id,
          inviteeId: item.invitee_id,
          inviter: item.inviter_name,
          inviterImage: item.inviter_image || "",
          invitee: item.invitee_name,
          inviteeImage: item.invitee_image || "",
          topic: item.topic,
          status: item.status,
          createdAt: item.created_at,
          respondedAt: item.responded_at,
          messages: messages
            .filter((message) => message.debate_id === item.id)
            .map((message) => ({
              id: message.id,
              authorId: message.author_id,
              author: message.author_name,
              message: message.message,
              createdAt: message.created_at,
            })),
        })),
      });
    }

    if (action === "debate-invite" && request.method === "POST") {
      const inviteeId = String(body.inviteeId || "");
      const topic = String(body.topic || "").trim().slice(0, 300);
      if (inviteeId === user.id) {
        return json(response, 400, { error: "You cannot invite yourself to a debate." });
      }
      if (topic.length < 5) {
        return json(response, 400, { error: "Add a clear debate topic." });
      }
      const invitees = await sql`
        SELECT id, username FROM library_users WHERE id = ${inviteeId} LIMIT 1
      `;
      if (!invitees.length) {
        return json(response, 404, { error: "That reader could not be found." });
      }
      const id = crypto.randomUUID();
      await sql`
        INSERT INTO library_debates (id, inviter_id, invitee_id, topic)
        VALUES (${id}, ${user.id}, ${inviteeId}, ${topic})
      `;
      await addNotification(
        inviteeId,
        "debate",
        "Debate invitation",
        `${user.username} invited you to debate: ${topic}`,
        `debate-invite:${id}`,
      );
      return json(response, 201, { ok: true });
    }

    if (action === "debate-respond" && request.method === "POST") {
      const debateId = String(body.debateId || "");
      const decision = String(body.decision || "");
      if (!["accepted", "declined"].includes(decision)) {
        return json(response, 400, { error: "Choose whether to accept or decline." });
      }
      const debates = await sql`
        SELECT id, inviter_id, topic
        FROM library_debates
        WHERE id = ${debateId}
          AND invitee_id = ${user.id}
          AND status = 'pending'
        LIMIT 1
      `;
      if (!debates.length) {
        return json(response, 404, { error: "That invitation is no longer available." });
      }
      await sql`
        UPDATE library_debates
        SET status = ${decision}, responded_at = NOW()
        WHERE id = ${debateId}
      `;
      await addNotification(
        debates[0].inviter_id,
        "debate",
        decision === "accepted" ? "Debate accepted" : "Debate declined",
        `${user.username} ${decision === "accepted" ? "accepted" : "declined"} your invitation about ${debates[0].topic}.`,
        `debate-response:${debateId}`,
      );
      return json(response, 200, { ok: true });
    }

    if (action === "debate-message" && request.method === "POST") {
      const debateId = String(body.debateId || "");
      const message = String(body.message || "").trim().slice(0, 3000);
      if (!message) {
        return json(response, 400, { error: "Write a message before sending it." });
      }
      const debates = await sql`
        SELECT id, inviter_id, invitee_id, topic
        FROM library_debates
        WHERE id = ${debateId}
          AND status = 'accepted'
          AND (${user.id} = inviter_id OR ${user.id} = invitee_id)
        LIMIT 1
      `;
      if (!debates.length) {
        return json(response, 403, { error: "Only the two debate participants can post." });
      }
      await sql`
        INSERT INTO library_debate_messages (
          id, debate_id, author_id, message
        )
        VALUES (${crypto.randomUUID()}, ${debateId}, ${user.id}, ${message})
      `;
      const otherUserId =
        debates[0].inviter_id === user.id
          ? debates[0].invitee_id
          : debates[0].inviter_id;
      await addNotification(
        otherUserId,
        "debate",
        "New debate message",
        `${user.username} responded in the debate about ${debates[0].topic}.`,
        null,
      );
      return json(response, 201, { ok: true });
    }

    if (action === "announcements" && request.method === "GET") {
      const announcements = await sql`
        SELECT a.id, a.title, a.message, a.created_at, u.username
        FROM library_announcements a
        JOIN library_users u ON u.id = a.author_id
        ORDER BY a.created_at DESC
        LIMIT 100
      `;
      return json(response, 200, {
        announcements: announcements.map((item) => ({
          id: item.id,
          title: item.title,
          message: item.message,
          author: item.username,
          createdAt: item.created_at,
        })),
      });
    }

    if (action === "announcement-save" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      const title = String(body.title || "").trim().slice(0, 160);
      const message = String(body.message || "").trim().slice(0, 5000);
      if (title.length < 3 || message.length < 3) {
        return json(response, 400, { error: "Add both a title and an announcement." });
      }
      const id = crypto.randomUUID();
      await sql`
        INSERT INTO library_announcements (
          id, author_id, title, message
        )
        VALUES (${id}, ${user.id}, ${title}, ${message})
      `;
      const recipients = await sql`
        SELECT id FROM library_users WHERE id <> ${user.id}
      `;
      await Promise.all(
        recipients.map((recipient) =>
          addNotification(
            recipient.id,
            "announcement",
            title,
            message.slice(0, 500),
            `announcement:${id}`,
          ),
        ),
      );
      return json(response, 201, { ok: true });
    }

    if (action === "announcement-delete" && request.method === "POST") {
      if (user.role !== "admin") {
        return json(response, 403, { error: "Admin access required." });
      }
      await sql`
        DELETE FROM library_announcements
        WHERE id = ${String(body.id || "")}
      `;
      return json(response, 200, { ok: true });
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
      const journals = Math.max(0, Number(body.journals) || 0);
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
      if (journals >= 5) {
        await unlockAchievement(
          user.id,
          "five-journals",
          "Thoughtful reader",
          "Wrote five reading journal entries.",
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
          user_id, owned, read_count, reading_count, unread, recent_books, updated_at
        )
        VALUES (
          ${user.id}, ${Number(body.owned) || 0}, ${Number(body.read) || 0},
          ${Number(body.reading) || 0}, ${Number(body.unread) || 0},
          ${JSON.stringify(recentBooks)}::jsonb, NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
          owned = EXCLUDED.owned,
          read_count = EXCLUDED.read_count,
          reading_count = EXCLUDED.reading_count,
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
          COALESCE(s.reading_count, 0)::int AS reading_count,
          COALESCE(s.unread, 0)::int AS unread,
          COALESCE((
            SELECT SUM(lp.runes_awarded)
            FROM library_learning_progress lp
            WHERE lp.user_id = u.id
          ), 0)::int
          + COALESCE((
            SELECT ds.runes_awarded
            FROM library_daily_streaks ds
            WHERE ds.user_id = u.id
          ), 0)::int
          + COALESCE((
            SELECT SUM(dr.runes_awarded)
            FROM library_dream_rewards dr
            WHERE dr.user_id = u.id
          ), 0)::int
          - COALESCE((
            SELECT SUM(sp.price_paid)
            FROM library_store_purchases sp
            WHERE sp.user_id = u.id
          ), 0)::int AS runes,
          COALESCE((
            SELECT c.equipped_frame
            FROM library_cosmetics c
            WHERE c.user_id = u.id
          ), '') AS equipped_frame,
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
      const journals = await sql`
        SELECT j.id, j.user_id, j.reflection, j.book_tags, j.entry_date,
               j.created_at, u.username, u.profile_image
        FROM library_journals j
        JOIN library_users u ON u.id = j.user_id
        WHERE j.is_shared = TRUE
        ORDER BY j.entry_date DESC, j.created_at DESC
        LIMIT 100
      `;
      return json(response, 200, {
        accounts: users.map((item) => ({
          ...publicUser(item),
          stats: {
            total: item.owned,
            read: item.read_count,
            reading: item.reading_count,
            unread: item.unread,
          },
          runes: Math.max(0, item.runes),
          equippedFrame: item.equipped_frame,
          recentBooks: item.recent_books,
        })),
        follows: follows.map((item) => ({
          followerId: item.follower_id,
          followingId: item.following_id,
          createdAt: item.created_at,
        })),
        journals: journals.map((item) => ({
          id: item.id,
          authorId: item.user_id,
          author: item.username,
          profileImage: item.profile_image || "",
          reflection: item.reflection,
          books: item.book_tags || [],
          entryDate: item.entry_date,
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
      const covers = await sql`
        SELECT book_id, image_data
        FROM library_book_covers
        WHERE user_id = ${accountId}
      `;
      const coverByBook = new Map(
        covers.map((cover) => [String(cover.book_id), cover.image_data]),
      );
      const books = sourceBooks.slice(0, 5000).map((book) => ({
        id: String(book.id || ""),
        title: String(book.title || "Untitled"),
        author: String(book.author || "Unknown author"),
        genre: String(book.genre || "Uncategorized"),
        format: ["ebook", "audiobook"].includes(book.format)
          ? book.format
          : "print",
        status: ["read", "reading"].includes(book.status)
          ? book.status
          : "unread",
        rating: Math.round(
          Math.min(5, Math.max(0, Number(book.rating) || 0)),
        ),
        coverImage: String(coverByBook.get(String(book.id || "")) || ""),
      }));
      return json(response, 200, { books });
    }

    if (action === "dictionary" && request.method === "POST") {
      const word = String(body.word || "").trim().toLowerCase().slice(0, 100);
      if (!/^[a-z][a-z '-]*$/i.test(word)) {
        return json(response, 400, { error: "Enter a valid English word." });
      }
      const dictionaryResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`,
      );
      if (!dictionaryResponse.ok) {
        return json(response, 404, { error: `No online definition was found for "${word}".` });
      }
      const entries = await dictionaryResponse.json();
      const definitions = [];
      for (const entry of Array.isArray(entries) ? entries : []) {
        for (const meaning of entry.meanings || []) {
          for (const definition of meaning.definitions || []) {
            if (!definition.definition) continue;
            definitions.push({
              partOfSpeech: String(meaning.partOfSpeech || ""),
              definition: String(definition.definition || "").slice(0, 700),
              example: String(definition.example || "").slice(0, 500),
            });
            if (definitions.length >= 8) break;
          }
          if (definitions.length >= 8) break;
        }
        if (definitions.length >= 8) break;
      }
      if (!definitions.length) {
        return json(response, 404, { error: `No online definition was found for "${word}".` });
      }
      return json(response, 200, {
        word: String(entries[0]?.word || word),
        phonetic: String(entries[0]?.phonetic || ""),
        definitions,
        source: "Free Dictionary API",
      });
    }

    if (action === "reading-challenges" && request.method === "GET") {
      const rows = await sql`
        SELECT
          c.*, inviter.username AS inviter_name,
          invitee.username AS invitee_name,
          COALESCE(d.reading_log, '[]'::jsonb) AS invitee_log
        FROM library_reading_challenges c
        JOIN library_users inviter ON inviter.id = c.inviter_id
        JOIN library_users invitee ON invitee.id = c.invitee_id
        LEFT JOIN library_data d ON d.user_id = c.invitee_id
        WHERE c.inviter_id = ${user.id} OR c.invitee_id = ${user.id}
        ORDER BY c.created_at DESC
        LIMIT 150
      `;
      const challenges = rows.map((item) => {
        const log = Array.isArray(item.invitee_log) ? item.invitee_log : [];
        const createdDate = new Date(item.created_at).toISOString().slice(0, 10);
        const deadlineDate = String(item.deadline).slice(0, 10);
        const relevant = log.filter((entry) => {
          const entryDate = String(entry.date || "");
          return entryDate >= createdDate && entryDate <= deadlineDate;
        });
        const progress = item.challenge_type === "minutes"
          ? relevant.reduce((total, entry) => total + (Number(entry.durationMinutes) || 0), 0)
          : item.challenge_type === "sessions"
            ? relevant.length
            : relevant.reduce((total, entry) => total + (Number(entry.pagesRead) || 0), 0);
        return {
          id: item.id,
          inviterId: item.inviter_id,
          inviteeId: item.invitee_id,
          inviter: item.inviter_name,
          invitee: item.invitee_name,
          type: item.challenge_type,
          target: item.target_value,
          title: item.title,
          message: item.message,
          deadline: item.deadline,
          status:
            item.status === "accepted" && progress >= item.target_value
              ? "completed"
              : item.status,
          progress,
          createdAt: item.created_at,
        };
      });
      await Promise.all(
        challenges
          .filter((challenge) => challenge.status === "completed")
          .map((challenge) => sql`
            UPDATE library_reading_challenges
            SET status = 'completed', completed_at = COALESCE(completed_at, NOW())
            WHERE id = ${challenge.id} AND status = 'accepted'
          `),
      );
      return json(response, 200, { challenges });
    }

    if (action === "reading-challenge-invite" && request.method === "POST") {
      const inviteeId = String(body.inviteeId || "");
      const type = String(body.type || "");
      const target = Math.round(Number(body.target) || 0);
      const title = String(body.title || "").trim().slice(0, 180);
      const message = String(body.message || "").trim().slice(0, 1200);
      const deadline = String(body.deadline || "");
      if (inviteeId === user.id) {
        return json(response, 400, { error: "You cannot challenge yourself." });
      }
      if (!["pages", "minutes", "sessions"].includes(type) || target < 1 || target > 100000) {
        return json(response, 400, { error: "Choose a valid challenge target." });
      }
      if (title.length < 3 || !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
        return json(response, 400, { error: "Add a title and deadline." });
      }
      if (new Date(`${deadline}T23:59:59`) < new Date()) {
        return json(response, 400, { error: "The deadline must be in the future." });
      }
      const invitees = await sql`
        SELECT id FROM library_users WHERE id = ${inviteeId} LIMIT 1
      `;
      if (!invitees.length) {
        return json(response, 404, { error: "That reader could not be found." });
      }
      const id = crypto.randomUUID();
      await sql`
        INSERT INTO library_reading_challenges (
          id, inviter_id, invitee_id, challenge_type, target_value,
          title, message, deadline
        )
        VALUES (
          ${id}, ${user.id}, ${inviteeId}, ${type}, ${target},
          ${title}, ${message}, ${deadline}
        )
      `;
      await addNotification(
        inviteeId,
        "challenge",
        "New reading challenge",
        `${user.username} challenged you: ${title}`,
        `reading-challenge:${id}`,
      );
      return json(response, 201, { ok: true });
    }

    if (action === "reading-challenge-respond" && request.method === "POST") {
      const challengeId = String(body.challengeId || "");
      const decision = String(body.decision || "");
      if (!["accepted", "declined"].includes(decision)) {
        return json(response, 400, { error: "Choose whether to accept or decline." });
      }
      const rows = await sql`
        UPDATE library_reading_challenges
        SET status = ${decision}, responded_at = NOW()
        WHERE id = ${challengeId}
          AND invitee_id = ${user.id}
          AND status = 'pending'
        RETURNING inviter_id, title
      `;
      if (!rows.length) {
        return json(response, 404, { error: "That challenge is no longer pending." });
      }
      await addNotification(
        rows[0].inviter_id,
        "challenge",
        decision === "accepted" ? "Challenge accepted" : "Challenge declined",
        `${user.username} ${decision} your reading challenge: ${rows[0].title}`,
        `reading-challenge-response:${challengeId}`,
      );
      return json(response, 200, { ok: true });
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

    if (action === "share-edit" && request.method === "POST") {
      const shareId = String(body.shareId || "");
      const title = String(body.title || "").trim().slice(0, 300);
      const author = String(body.author || "").trim().slice(0, 300);
      const message = String(body.message || "").trim().slice(0, 1000);
      if (!title || !author) {
        return json(response, 400, { error: "Add the book title and author." });
      }
      const shares = await sql`
        SELECT id, payload FROM library_shares
        WHERE id = ${shareId} AND sender_id = ${user.id} AND kind = 'book'
        LIMIT 1
      `;
      if (!shares.length) {
        return json(response, 404, {
          error: "That recommendation cannot be edited.",
        });
      }
      const payload = {
        ...(shares[0].payload || {}),
        title,
        author,
      };
      await sql`
        UPDATE library_shares
        SET payload = ${JSON.stringify(payload)}::jsonb,
            message = ${message},
            recipient_read_at = NULL
        WHERE id = ${shareId} AND sender_id = ${user.id}
      `;
      return json(response, 200, { ok: true });
    }

    if (action === "share-delete" && request.method === "POST") {
      const shareId = String(body.shareId || "");
      const deleted = await sql`
        DELETE FROM library_shares
        WHERE id = ${shareId} AND sender_id = ${user.id} AND kind = 'book'
        RETURNING id
      `;
      if (!deleted.length) {
        return json(response, 404, {
          error: "That recommendation cannot be deleted.",
        });
      }
      await sql`
        DELETE FROM library_notifications
        WHERE dedupe_key = ${`share:${shareId}`}
      `;
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
