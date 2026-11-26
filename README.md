# Susheen Techno Power Systems

Independent React + Vite + TypeScript website project.

## Run locally

1. Install Node.js (LTS).
2. Copy `.env.example` to `.env`.
3. Add your Supabase project URL and anon key to `.env`.
4. Run `npm install`.
5. Run `npm run dev` and open the local URL printed in the terminal.

## Production build

Run `npm run build`. The production files are generated in `dist/`.

## Notes

- The `.bolt` folder and Bolt-only metadata have been removed.
- Existing React, Vite, Tailwind, Supabase code and database migrations are preserved.
- Keep `.env` private; do not commit or share it.
- Configure Supabase Row Level Security (RLS) and policies appropriately for your database.
