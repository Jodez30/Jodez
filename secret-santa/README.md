# Santa's List — Secret Santa

Christmas-themed, iPhone-first Secret Santa intake form and family profiles viewer.

Built with **Cloudflare Pages**, **Pages Functions**, and **D1** — plain HTML/CSS/vanilla JS (no frameworks).

## Local demo

From this directory (`secret-santa/`):

```bash
# Apply schema to the local D1 database (first run, or after reset)
npx wrangler d1 execute santas-list-db --local --file=./schema.sql

# Start Pages + Functions with local D1
npx wrangler pages dev
```

Then open the printed URL (usually `http://127.0.0.1:8788`):

1. Fill the wishlist form and submit
2. Open **View family profiles** — your row should appear and expand

Re-submitting the same name **updates** that profile (UPSERT).

## Deploy to Cloudflare Pages

1. Create a D1 database:
   ```bash
   npx wrangler d1 create santas-list-db
   ```
2. Copy the `database_id` into [`wrangler.toml`](wrangler.toml) (replace the placeholder).
3. Apply the schema remotely:
   ```bash
   npx wrangler d1 execute santas-list-db --remote --file=./schema.sql
   ```
4. In the Cloudflare dashboard, create a **Pages** project from this repo and set:
   - **Root directory:** `secret-santa`
   - Build command: leave empty (static `public/`)
   - Build output directory: `public`
5. Bind the D1 database to the Pages project with binding name **`DB`** (same as `wrangler.toml`).

> This folder is a sibling of `keeper/`. The repo-root Worker **`jodez`** (see root [`wrangler.toml`](../wrangler.toml)) serves the static site (`keeper/`, root redirect). Do **not** point that Worker’s root directory at `secret-santa` — use a **separate** Cloudflare Pages project with Root directory = `secret-santa` and D1 binding `DB`.

## Edit the name dropdown

Family names live in [`public/index.html`](public/index.html) as `<option>` elements inside the `#name` select. Add, remove, or rename options there — values must stay unique (they are the UPSERT key).

## API

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/submit` | FormData UPSERT by `name` → `{ success: true }` |
| `GET`  | `/api/profiles` | All profiles ordered by name |

## Schema

See [`schema.sql`](schema.sql): `profiles` with `name` UNIQUE, interests stored as a comma-separated string, and `updated_at`.
