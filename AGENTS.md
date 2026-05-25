# Repository Instructions

This is the source for `87xie.me`, a personal writing site built with Next.js App Router, MDX, Content Collections, Tailwind CSS, and pnpm.

## Commands

- Install dependencies with `pnpm install`.
- Run the local site with `pnpm dev`.
- Build the static export with `pnpm build`.
- Run linting with `pnpm lint`.
- Inspect bundle size with `pnpm analyze`.

Before finishing code changes, run `pnpm lint` for routine edits. Run `pnpm build` when changing routing, MDX/content processing, Next config, generated content types, or anything that could affect static export.

## Project Shape

- App routes live under `src/app`.
- Reusable React components live under `src/components`.
- MDX component mappings live in `src/mdx-components.tsx`.
- Content lives under `src/content/<category>/*.mdx`.
- Content indexing and sorting lives in `src/sorted-content.ts`.
- Content Collections config lives in `content-collections.ts`.
- Global styling lives in `src/app/globals.css`.

The site uses `output: 'export'` in `next.config.ts`, so routes must remain statically renderable. Avoid runtime-only server dependencies, dynamic request APIs, or features that require a Node server unless the deployment model changes too.

## Code Style

- Use TypeScript and React Server Components by default. Add `'use client'` only for components that need browser APIs, stateful interactivity, effects, or event handlers.
- Preserve the existing lint style: no semicolons, arrow parens always, 1TBS braces, and path alias imports via `@/*` when importing from `src`.
- Prefer small, direct components over broad abstractions. Keep shared helpers close to existing ownership boundaries.
- Use `clsx` for conditional class composition, matching existing files.
- Keep generated framework files such as `next-env.d.ts`, `.next`, and `.content-collections` out of hand edits unless a tool updates them as part of verification.

## MDX And Content

- New writing should be added as `.mdx` files under `src/content/notes`, `src/content/blog`, or another category directory that should become part of the URL.
- Frontmatter supports optional `title`, `date`, and `tags`.
- The slug is derived from the filename, and the category is derived from the containing directory.
- Heading IDs and table of contents are derived from MDX headings through `src/utils/toc-parser.ts`.
- Prefer existing MDX components such as `Details`, `CodeWithTabs`, and Code Hike-powered code blocks before introducing new content primitives.

## UI Guidance

- This site is a quiet personal writing interface. Keep pages readable, restrained, and content-first.
- Match the existing max-width layout, typography scale, gray palette, and link styling unless intentionally redesigning a section.
- Avoid marketing-style hero sections, decorative card stacks, and unrelated visual flourishes for content pages.
- Ensure MDX content remains readable on mobile and desktop, especially tables, code blocks, footnotes, and the sticky table of contents.

## Working Safely

- The worktree may contain user edits. Do not revert unrelated changes.
- Keep changes scoped to the request and the affected files.
- If package versions or generated lockfiles change, call that out clearly in the final response.
- When adding dependencies, use pnpm and keep the lockfile in sync.
