# HAVENLY

A premium real-estate discovery and property-management platform.

## Stack

React + TypeScript + Vite + Tailwind CSS + Supabase.

## Run

```bash
npm install
cp .env.example .env
npm run dev
```

The application has a demo mode when Supabase credentials are absent, so the interface can be explored immediately. Add Supabase credentials to activate authentication and database-backed functionality.

## Supabase

Run the SQL in `supabase/migrations/001_initial.sql` in the Supabase SQL editor. Then run `supabase/seed.sql` if you want demo records.

Create Storage buckets named:

- `property-images`
- `avatars`

For a real deployment, configure the corresponding storage policies in Supabase.

## Production

```bash
npm run typecheck
npm run lint
npm run build
```
