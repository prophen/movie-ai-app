# Getting Started
Install the dependencies and run the project
```
npm install
npm start
```

Head over to https://vitejs.dev/ to learn more about configuring vite
## Deployment (safe API keys)
This project is set up to call OpenAI through a Cloudflare Pages Function so the key never ships to the browser.

Frontend env vars (Vite):
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
# Optional when using Pages Functions; set only if using a separate Worker
VITE_WORKER_URL=https://your-worker.your-domain.com
```

Pages secrets (Cloudflare):
```
OPENAI_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_TABLE=movies
SEED_TOKEN=...
```

Optional: set a CORS allowlist for the Function:
```
ALLOWED_ORIGIN=...
```

Deploy Pages:
- Connect this repo to Cloudflare Pages.
- Set environment variables in Pages settings.
- Build command: `npm run build`
- Output directory: `dist`

Local Pages Functions:
- Create `.dev.vars` from `.dev.vars.sample` with your `OPENAI_API_KEY`.
- Run: `npm run pages:build`
- Run: `npm run pages:dev`
- Or one command: `npm run pages:serve`
- Watch mode (auto rebuild): `npm run pages:watch`

Seeding embeddings:
- Ensure the `movies` table exists with `content` and `embedding` columns.
- Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SEED_TOKEN` in your Pages env vars (or `.dev.vars` locally).
- POST to `/api/seed` with `X-Seed-Token`:
```
curl -X POST http://localhost:8788/api/seed \
  -H "X-Seed-Token: your-token"
```

Notes:
- Use the Supabase anon key in the browser only when RLS is enabled.
- Keep the Supabase service role key only on the server if you need elevated access.

## PopChoice - AI Movie Recommendations

This is the solo project from the AI Engineering module on Scrimba's Fullstack Path
<img width="489" height="915" alt="image" src="https://github.com/user-attachments/assets/5eb32dd3-01b1-4dee-9402-37aef9b7a82f" />
<img width="489" height="915" alt="image" src="https://github.com/user-attachments/assets/9e5f5b86-5d7d-4717-aef4-0dc9286e62da" />


