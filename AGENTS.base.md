# ADR Workflow — adr-kit for Codex

Read this file fully before taking any action in this session.

---

## Workflow Reminder (Read First Every Session)

Before ANY significant change:

1. Check if an ADR exists for this component — read `docs/adrs/`
2. For new features: create an ADR with Status: Proposed
3. Do not create an execution plan until ADR Status: Accepted
4. Do not implement until the execution plan is approved

Approval gates:

- ADR must be Status: Accepted before creating an execution plan
- Execution plan must be approved before implementation
- All tests must pass before committing
- Every commit requires explicit human approval — silence is not approval

When in doubt: ask "Should I create an ADR for this?"

---

## How to Drive the Workflow Conversationally

Codex uses natural language rather than slash commands. Use these as starting prompts:

| Intent | What to say |
|--------|-------------|
| Start a new feature | "Create an ADR for [description]" |
| Create an execution plan | "Create an execution plan for ADR-[ID]" |
| Resume in-progress work | "Resume the current feature" |
| Code review | "Review [file] against its ADR and conventions" |
| Fix a bug | "Fix bug: [description], check ADR first" |
| Project status | "Give me a project status overview" |
| Archive completed plan | "Archive the completed execution plan for ADR-[ID]" |
| Rebuild ADR index | "Update the ADR knowledge index" |
| Audit documentation | "Audit the architectural documentation for consistency" |

---

## ADR Workflow Rules

### Before proposing changes:
- Load the relevant ADR from `docs/adrs/`
- Check ADR status — must be "Accepted" before implementation
- Review Clarifications Log for unanswered questions

### While making changes:
- Update ADR Clarifications Log with Q&A
- Document tradeoffs in ADR Tradeoffs section
- Update Consequences section with impacts

### After implementation:
- Update ADR with implementation results
- Update execution plan revision history
- Mark ADR status in both the body (`**Status**:`) and YAML frontmatter (`status:`) — they must stay in sync
- Update `docs/adr-index.md`
- Update `docs/architecture.md`

### Never:
- Do not load all ADR files at once (context pollution)
- Do not implement before ADR is Accepted
- Do not skip updating ADR after changes
- Do not skip updating `docs/architecture.md` after ADR implementation

---

## Commit Approval Rules

Never commit without explicit approval.

Before any git commit:
1. Make changes
2. Run `git diff` or `git status --short`
3. Show output to the architect
4. Ask: "Should I commit this?"
5. Wait for explicit "yes" / "commit it" / "looks good"
6. Only then: `git add [specific files]` + `git commit`

What counts as approval: "yes, commit it" / "looks good, proceed" / "commit and continue" / "go ahead" / "commit"

What does NOT count: silence, "that looks right" (without "commit"), passing tests, "seems fine" (ambiguous)

There are no exceptions.

---

## Git Conventions

Commits follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<optional body>
```

Types: `feat` | `fix` | `refactor` | `test` | `docs` | `chore` | `build` | `perf`

Safety rules:
- Never use `git add -A`, `git add .`, or `git add *`
- Always stage specific files explicitly
- Always get human approval before committing
- Never force push without explicit instruction

---

## Execution Plan Workflow

Execution plans are living documents that track implementation progress and session state.

### Load order (always in this sequence):
1. Read `AGENTS.md` — find the Active Work pointer
2. Load the ADR: `docs/adrs/{ID}-feature-adr.md`
3. Check if an execution plan exists — the ADR links to it at the top
4. Load the execution plan: `docs/execution-plans/{ID}-execution-plan.md`
5. Stop here — the execution plan tells you what else to load

### Execution plan is your session state:
- Current step and status
- Blockers requiring human input
- Files to load (don't guess, don't explore)
- Next actions (explicit, conditional)
- Session log (what happened last session)

### Update execution plan as you work:
- Mark tasks complete: `[ ]` -> `[x]`
- Update "Current Step" field
- Add session log entries
- Document decisions and blockers
- Commit execution plan updates to git

### Anti-patterns:
- Do not load the entire `docs/` folder — follow the execution plan's file list
- Do not guess which files to load
- Do not start implementation without loading the execution plan first
- Do not store session state in memory — update the execution plan in git

---

## Architecture Document Rules

`docs/architecture.md` is a navigational map of the system. After every ADR implementation:

1. Add one row to the decision log table (ADR number, title, status, one-line summary)
2. If this ADR adds a new external actor: update the L1 Context diagram
3. If this ADR adds a new dependency or service: update the L2 services table
4. If this ADR adds a new component or pattern: update the L3 component table
5. Do not add per-ADR prose sections or implementation details

Expected change size: 1-15 lines per ADR. More than 15 lines means too much detail.

---

## Testing Principles

- All public methods require unit tests
- All API/service endpoints require integration tests
- All error paths must be tested explicitly
- Tests must not depend on external services — use mocks/fakes at boundaries
- Tests without assertions are not tests

---

## Core Engineering Rules

### Think Before Coding
- State assumptions explicitly before implementing
- If multiple interpretations exist, present them — don't pick silently
- If something is unclear, stop and ask
- Questions asked before implementation cost minutes; questions asked after cost rewrites

### Surgical Changes
- Touch only what the task requires
- Do not refactor adjacent code that isn't broken
- If you notice unrelated issues, mention them — don't fix them
- Every changed line should trace directly to the user's request

### Keep It Simple
- Prefer the simplest solution that solves the present problem
- Do not build for requirements that don't exist yet (YAGNI)
- Do not abstract until the third occurrence (Rule of Three)
- A boring, obvious implementation beats a clever, flexible one every time

### Separate Concerns
- If describing a function requires the word "and," split it
- Inner steps throw on failure; a thin outer function catches
- If a function computes something, it returns a result and does nothing else
- No hidden side effects behind query names

---

## Document Structure

- `docs/adrs/*.md` — Architecture Decision Records
- `docs/execution-plans/*.md` — Implementation plans (approved before coding)
- `docs/execution-plans/archive/` — Completed plans
- `docs/backlog/*.md` — Deferred work candidates
- `docs/adr-index.md` — Fast topic-to-ADR lookup
- `docs/architecture.md` — System architecture (C4 model + decision log)

---

## Worktrees — Parallel Feature Development

```bash
git worktree add .worktrees/feature-abc story/feature-abc
cd .worktrees/feature-abc
codex
```

Files shared between worktrees: `AGENTS.md`, `docs/`
Files isolated per worktree: `src/` working files

When two parallel features share code, create `docs/parallel-work-brief-ADR-X-ADR-Y.md` from the template at `.claude/adr-kit/docs/templates/parallel-work-brief-template.md`.

---

## Anti-Patterns to Avoid

- Do not create files without ADR approval
- Do not load all docs files at once
- Do not implement before execution plan approval
- Do not use `git add -A` or `git add .`
- Do not commit without explicit human approval
- Do not store session state in memory — use the execution plan in git
