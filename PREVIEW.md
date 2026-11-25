# Santa's List — Cloudflare preview branch

This branch (`cursor/santas-list-preview-04e8`) exists so the **jodez** Workers
branch preview opens **Santa's List** instead of the keeper league redirect.

- **Do not merge this branch to `main`** — it only changes root `wrangler.toml`
  assets to `secret-santa/public`.
- App source of truth / merge PR: `cursor/secret-santa-demo-04e8`
  (https://github.com/Jodez30/Jodez/pull/11)

## Full interactive demo (form → D1 → profiles)

```bash
cd secret-santa
npx wrangler d1 execute santas-list-db --local --file=./schema.sql
npx wrangler pages dev
```

The Workers preview on this branch shows the UI; API/D1 needs
`wrangler pages dev` or a dedicated Pages project (root directory `secret-santa`).
