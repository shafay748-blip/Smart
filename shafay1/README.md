<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Smart WiFi Assistant

A modern self-service broadband management platform for managing WiFi packages, billing, router settings, device controls, usage analytics, speed tests, and AI support.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` to your Gemini API key.
3. Run the app:
   `npm run dev`

This starts an Express dev server (with Vite middleware) on `http://localhost:3000`.

## Deploying to Vercel

This project is set up to deploy on Vercel as:
- A **static frontend** (built by Vite, output to `dist/`)
- **Serverless API functions** under `/api` (`/api/health`, `/api/ai/chat`)

### Steps

1. Push this repository to GitHub.
2. In Vercel, click **Add New → Project** and import the GitHub repo.
3. Vercel will auto-detect the Vite framework from `vercel.json`. Leave build settings as-is:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Important:** Add an Environment Variable before deploying:
   - Go to **Project Settings → Environment Variables**
   - Add `GEMINI_API_KEY` = *your Gemini API key* (get one at https://aistudio.google.com/apikey)
   - Apply it to Production, Preview, and Development
5. Click **Deploy**.

Without `GEMINI_API_KEY` set, the AI Assistant chat still works but only returns an offline fallback message — it won't 404, it just won't be AI-powered.

### Why the original export 404'd on Vercel

The AI Studio export bundles a persistent Express server (`server.ts` → `dist/server.cjs`, started with `node dist/server.cjs`). Vercel does not run long-lived Node servers like that — it serves static assets plus serverless functions. Because of this mismatch, none of the `/api/*` routes that Express defined were ever actually deployed, so every request to them (and sometimes the app shell itself) returned 404.

This has been fixed by:
- Converting the two real API routes into standalone Vercel serverless functions: `api/health.ts` and `api/ai/chat.ts`.
- Simplifying `package.json`'s `build` script to just `vite build` (a plain static build).
- Adding `vercel.json` so Vercel builds the static site correctly and routes are configured properly.

`server.ts` is kept only for local development (`npm run dev`); it is not used in the Vercel deployment.
