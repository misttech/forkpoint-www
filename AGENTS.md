# AGENTS.md

Operating guide for humans and AI coding agents working in **forkpoint-www**.

> **What this is:** the public website for Forkpoint, published to GitHub Pages.
> HTML, CSS, and a little JS, served exactly as written.

## Settled decisions

- **No build step.** No generator, bundler, or npm.
- **Self-hosted assets only.** Fonts, CSS, and JS are committed here. No
  analytics unless deliberately added and disclosed in the same change.
- **Story-only for now.** No invite form, demo booking, or mailto primary CTA.
  A quiet “coming soon” line is fine.
- **No private-repo links.** The Forkpoint code repository is private. Product
  claims may point readers to `www.mist-os.com`, not to GitHub paths they cannot
  open.
- **Claims come from the Forkpoint README.** Do not invent vendor counts,
  pricing, compliance badges, MCP tool counts, or cloud features the docs do
  not state. Illustrative UI mocks on the page are labeled as illustrative.
- **Marketing landing, not monospace document.** Distinct from airlock-www’s
  terminal aesthetic; keep the industrial/embedded palette and avoid purple
  gradients or cream-serif defaults.

## Domain

`CNAME` is `forkpoint.mist-os.com`. Keep paths relative for local preview and
github.io prefix serving.
