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
## About Scrimba

At Scrimba our goal is to create the best possible coding school at the cost of a gym membership! 💜
If we succeed with this, it will give anyone who wants to become a software developer a realistic shot at succeeding, regardless of where they live and the size of their wallets 🎉
The Fullstack Developer Path aims to teach you everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/courses)
- [The Frontend Career Path](https://scrimba.com/fullstack-path-c0fullstack)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!
