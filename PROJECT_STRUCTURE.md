# Project Structure

Generated: 2026-06-11T02:14:09.352Z

## Core Directories

- `app`: Next.js App Router pages, layouts, API routes, global CSS, poster pages. Do not remove route files just because they are not imported.
- `src`: shared source/data area. `src/data/posterCatalog.ts` is core poster catalog data and must be kept.
- `public`: static assets served by the site, including template previews and poster thumbnails. Treat as runtime content.

## Static Assets

- `public/templates`: existing template preview/content assets. Must keep unless a specific asset is proven unused and manually approved.
- `public/poster-assets/previews_webp`: poster preview thumbnails. Must keep; poster feature depends on these assets.

## Data Files

- `src/data`: catalog/data definitions used by pages and components. Must keep unless manually confirmed unused.

## Optional Or Absent Directories

- `components`, `pages`, `data`, `lib`, `utils`: not present at project root in this scan, or not used as top-level directories. If added later, review before cleanup.

## Can Be Recreated Or Archived

- `node_modules`: recreated by `npm install`.
- `.next`, `dist`, `build`, `.vite`, `.cache`, `coverage`: build/cache/test output.
- `_archive_unused`: holding area for old backups/copies/archives; review before permanent deletion.

## Cannot Touch Without Review

- `app`
- `src`
- `public/templates`
- `public/poster-assets/previews_webp`
- `src/data/posterCatalog.ts`
- package and framework config files
