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
