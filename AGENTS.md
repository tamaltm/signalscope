# AGENTS.md — SignalScope

> **How to fill this in:** write only what an agent could NOT work out by
> reading the repo. Skip the directory tree (`ls` shows it), the dependency list
> (the manifest shows it), and generic advice like "write clean code" or "handle
> errors" — a capable model already does those, and every line here is loaded
> into context on every single session. If you find yourself describing the
> code, delete it. If you find yourself describing something that once cost
> someone an afternoon, keep it.

## Project

- **What this is:** An original mobile prototype for scanning, filtering, and understanding fictional insider-activity signals.
- **Who it is for:** Mobile users and ArkLab AI assignment reviewers
- **Current phase:** Phase 5 Trade Details complete; Phase 6 testing and refinement next

## Commands

- `npx eas-cli@latest build --platform android --profile preview` — the `preview` profile must produce an installable APK, not the default Play Store AAB.

## Read first

1. `docs/PRD-*.md` (what we're building — the source of truth)
2. `docs/TechDesign-*.md` (how we're building it)
3. `agent_docs/project_brief.md`
4. `agent_docs/tech_stack.md`
5. `agent_docs/testing.md`

If this file or `agent_docs/` still has unresolved template placeholders, fill them from
the two docs above before planning. Load anything else only when it becomes relevant.

## Gotchas

- Every displayed company, person, ticker, value, date, signal, and chart point must be invented local demo data. Do not add financial APIs, copied source content, or real filings.
- Keep exactly three application screens: Home, Screener, and Trade Details.
- Purchase/Sale meaning must use text and direction icons as well as color.
- The required disclaimer in the PRD must be reproduced exactly.

## Protected areas — ask before changing

- `.env*`, secrets, credentials, private logs
- `.github/workflows/`, deployment, infrastructure
- existing database migrations
- auth, payments, billing, production email/send flows
- AI provider credentials, MCP servers, tool permissions

**Never print, commit, or transmit secrets, tokens, private logs, or production
data.** Never delete files, rewrite large areas, or change
infrastructure/auth/billing/migrations without approval.

## Done means

Report: files changed · commands run · test/build/device results · AI eval
evidence if applicable · remaining risks · rollback notes if relevant.

---

**When this file gets long, that is the signal to split it.** Move task-specific
procedures (deploy steps, release checklists, API references) into
`.claude/skills/<name>/SKILL.md`, where only the one-line description stays in
context and the body loads when it is actually needed. Move
directory-specific conventions into `<subdir>/CLAUDE.md`, which loads only when
work touches that directory. Keep universal constraints and safety prohibitions
here — never move a "never do X" rule somewhere it might not be loaded.
