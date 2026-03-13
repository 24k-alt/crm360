# CRM360 (ClickUp-inspired)

- Next.js 14 + Tailwind for web UI
- Supabase for auth/db/storage/realtime
- Edge Function `ai` proxying NVIDIA Qwen 122B via `NV_API_KEY`
- Starter dashboard (pipeline, kanban, timeline, AI panel)

## Run locally
1) Install deps: `pnpm i` (or npm)
2) Set env in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NV_API_KEY=nvapi-...
```
3) `pnpm dev`

## Deploy
- Web: Vercel (set same env vars)
- Functions: `supabase functions deploy ai`

## Master Prompt
See `master_prompt.md` for the copilot system message.
