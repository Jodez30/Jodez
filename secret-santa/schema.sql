-- Secret Santa profiles table for Cloudflare D1.
-- UPSERT uses unique `name` so each person keeps one editable row.

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  interests TEXT,
  gift_ideas TEXT,
  sizes TEXT,
  favorite_stores TEXT,
  avoid TEXT,
  hobbies TEXT,
  notes TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
