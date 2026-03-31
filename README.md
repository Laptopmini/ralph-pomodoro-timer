# ralph-html

A fork of [ralph-node](https://github.com/Laptopmini/ralph-node) with a simple boilerplate to serve a static HTML based application.

- **PRDs:** [View all Product Requirements Documents](/.prds)
- **TDD:** [View all backpressure tests](/tests)
- **Ralph Loop:** [View latest Ralph execution](/.ralph.log)

Fork this repo and drop in a new `PRD.md` to start building something with the loop already bootstrapped.

For full documentation on how the Ralph Loop works and how to use these repos, see the [original ralph-node README](https://github.com/Laptopmini/ralph-node#readme).

## Source

All `ralph-node` repos begin from the same genesis, and branch off a specific upstream in its tree:

- **Genesis:** https://github.com/Laptopmini/ralph-node
- **Upstream:** https://github.com/Laptopmini/ralph-node-base

## Changelog

- **TypeScript** — `tsconfig.json` with ES2022 target, NodeNext modules, strict mode, and `dist/` output
- **Jest** — `jest.config.js` with `@swc/jest` transform scoped to unit tests, plus a sanity test
- **Playwright** — `playwright.config.ts` targeting Chromium at `localhost:3000`, plus a sanity E2E test
- **Root test script** — `npm test` wired to run unit then E2E tests sequentially
- **Static HTML website** — Configured to serve a static HTML based application
- **Playwright webServer** — Updated Playwright configuration with webServer block for proper test execution

## Stack

| Tool | Role |
|------|------|
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | Default AI engine |
| [OpenCode](https://opencode.ai/docs) | Alternative AI engine |
| [Jest](https://jestjs.io/) | Unit testing |
| [Playwright](https://playwright.dev/) | E2E testing |
| [Biome](https://biomejs.dev/) | Linting and formatting |
| [serve](https://github.com/vercel/serve) | Static File Server |

## License

Apache 2.0
