---
name: Migrate to Next.js v16
about: Track the migration from Next.js v15 to v16 with Turbopack support
title: "Migrate to Next.js v16"
labels: enhancement
---

## Summary

Migrate the project from **Next.js v15** to **Next.js v16**, which promotes **Turbopack** as the default bundler. This requires evaluating all current tooling for Turbopack compatibility and replacing or refactoring anything that relies on Webpack-specific loaders.

## Current Setup

| Dependency | Version | Turbopack Concern |
|---|---|---|
| `next` | ^15.5.0 | Upgrade to v16 |
| `codehike` | ^1.0.7 | Uses remark/recma plugins via `@next/mdx`; needs Turbopack compatibility verification |
| `@next/mdx` | ^15.5.0 | Webpack-based MDX loader (`@mdx-js/loader`); verify Turbopack support |
| `@mdx-js/loader` | ^3.1.0 | Webpack loader for MDX; may not work with Turbopack |
| `@content-collections/next` | ^0.2.6 | Wraps Next.js config; verify Turbopack compatibility |
| `@next/bundle-analyzer` | ^15.5.0 | Webpack plugin; likely needs replacement or conditional use |

## CodeHike / Syntax Highlighting Usage

CodeHike is deeply integrated into the project:

- **Config** (`next.config.ts`): `remarkCodeHike` and `recmaCodeHike` plugins are registered via `@next/mdx`
- **Components** (8 files in `src/components/codes/`):
  - `block-code.tsx` — imports `Pre`, `highlight`, `RawCode` from `codehike/code`
  - `block-code-with-tabs.tsx` — imports from `codehike/blocks` and `codehike/code`
  - `inline-code.tsx` — imports `Inline` from `codehike/code`
  - `annotations/callout.tsx` — uses `AnnotationHandler`, `InlineAnnotation` from `codehike/code`
  - `annotations/collapse.tsx` — uses `BlockAnnotation` from `codehike/code`
  - `annotations/diff.tsx` — uses `AnnotationHandler`, `InlineAnnotation`, `BlockAnnotation` from `codehike/code`
  - `annotations/line-numbers.tsx` — uses `AnnotationHandler`, `InnerLine` from `codehike/code`
  - `annotations/mark.tsx` — uses `AnnotationHandler`, `InlineAnnotation`, `BlockAnnotation` from `codehike/code`
- **MDX registration** (`src/mdx-components.tsx`): `BlockCode`, `InlineCode`, `CodeWithTabs` mapped to CodeHike's component names

### Key concern

CodeHike itself operates through **remark/recma plugins** (not Webpack loaders), so its core functionality may remain compatible with Turbopack. However, the MDX pipeline that feeds CodeHike relies on `@next/mdx` and `@mdx-js/loader`, which are Webpack-based. If Turbopack does not support this loader pipeline, alternatives will need to be evaluated.

### Potential alternatives (if CodeHike is incompatible)

- [`rehype-pretty-code`](https://github.com/rehype-pretty/rehype-pretty-code) — Shiki-based rehype plugin, no Webpack dependency
- [`bright`](https://github.com/code-hike/bright) — Server component for syntax highlighting by the CodeHike author
- [`shiki`](https://github.com/shikijs/shiki) — Direct Shiki integration with custom components

## Webpack-Specific Dependencies Identified

1. **`@mdx-js/loader`** — Webpack loader used by `@next/mdx` to process `.mdx` files. This is the primary Webpack dependency in the build pipeline.
2. **`@next/bundle-analyzer`** — Wraps `webpack-bundle-analyzer`. Will not work with Turbopack. Consider using Turbopack-native analysis tools or keeping it as a Webpack-only option.
3. **`@content-collections/next`** — Wraps the Next.js config via `withContentCollections()`. Needs verification that it does not inject Webpack-specific plugins.

## Migration Checklist

### Preparation

- [ ] Review the [Next.js v16 release notes](https://nextjs.org/blog) and [upgrade guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [ ] Review [Turbopack compatibility documentation](https://nextjs.org/docs/architecture/turbopack)

### Upgrade and verify

- [ ] Upgrade `next` to v16 and update `eslint-config-next`, `@next/mdx`, `@next/bundle-analyzer` to matching versions
- [ ] Run `next dev --turbopack` and verify the dev server starts without errors
- [ ] Run `next build` and verify the production build completes
- [ ] Verify all 13 MDX content pages render correctly with syntax highlighting

### Dependency compatibility

- [ ] Verify `@next/mdx` works with Turbopack (or find a Turbopack-compatible MDX integration)
- [ ] Verify `@mdx-js/loader` is supported or replace the MDX pipeline
- [ ] Verify `codehike` remark/recma plugins work through the Turbopack MDX pipeline
- [ ] Verify `@content-collections/next` is compatible with Turbopack
- [ ] Replace or conditionally disable `@next/bundle-analyzer` for Turbopack builds

### CodeHike evaluation

- [ ] Test CodeHike annotations (mark, diff, callout, collapse, line-numbers) render correctly
- [ ] Test `BlockCode`, `InlineCode`, and `CodeWithTabs` components
- [ ] Test Mermaid diagram rendering (uses CodeHike for language detection)
- [ ] If CodeHike is incompatible, evaluate and migrate to an alternative

### Cleanup

- [ ] Remove `@mdx-js/loader` if no longer needed
- [ ] Update `next.config.ts` for any Turbopack-specific configuration
- [ ] Update `package.json` scripts (e.g., `"dev": "next dev --turbopack"`)
- [ ] Document any breaking changes or migration notes
