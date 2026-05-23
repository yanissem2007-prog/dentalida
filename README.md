# Dentalida

Premium dental clinic website — Next.js 14, TypeScript, Tailwind, Lenis smooth scroll.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Subsequent deploys: `vercel --prod`.

### Option 2 — GitHub

1. `git init && git add . && git commit -m "init"`
2. Create a new repo on GitHub and push.
3. Go to https://vercel.com/new, import the repo, click **Deploy**.

Zero config needed — `vercel.json` and `next.config.mjs` handle everything.

## Stack

- Next.js 14.2.33 (App Router, patched)
- React 18 / TypeScript 5
- TailwindCSS 3
- Lenis smooth scroll
- GSAP (available, used for animations)

## Notes

- Images served from `images.unsplash.com` (allowlisted in `next.config.mjs`).
- Region pinned to `fra1` (Paris) for low Algeria latency. Edit `vercel.json` to change.
- Security headers configured in `vercel.json`.
