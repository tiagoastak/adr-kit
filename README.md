# adr-kit

[![npm version](https://img.shields.io/npm/v/@tiagoasta/adrkit.svg)](https://www.npmjs.com/package/@tiagoasta/adrkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow?logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/tiagoasta)

**ADR-driven development workflow for Claude Code.** Add this as a git submodule to any repo and get a structured, document-centric development process — commands, rules, templates, and governance — in a single versioned package.

---

## The Core Idea

Most teams adopt AI coding assistants reactively — ask a question, get code, paste it in. This works for isolated tasks but breaks down on anything requiring more than one session: the AI has no memory of what was decided, why a particular approach was chosen, or what still needs to be done. Every session starts from scratch.

adr-kit takes a different approach. Claude Code operates within a structured, document-driven process before it writes a single line of code. The foundation is the **Architecture Decision Record (ADR)** — a format borrowed from traditional software architecture practice, adapted to serve as the specification, conversation log, and approval gate for every non-trivial change.

The goal is not to slow things down. It is to make sure that when Claude implements something, it is implementing the _right_ thing — approved by a human, with full traceability back to the decision that justified it — and that any team member or new session can pick up exactly where things left off.

---

## Features

- **14 slash commands** — `/adr-init`, `/adr-new-adr`, `/adr-new-plan`, `/adr-continue`, and more
- **10 standing rules** — commit approval, ADR workflow, KISS, surgical changes, and more
- **Templates** — ADR, execution plan, backlog item, parallel work brief, ADR index
- **Stack detection** — auto-generates Python, TypeScript, and .NET convention rules on init
- **Git worktree support** — isolated parallel feature development out of the box
- **npx installer** — `npx @tiagoasta/adrkit init` or `npx @tiagoasta/adrkit update` in any repo

---

## Quick Start

### Option A: npx (recommended)

```bash
# Inside your existing git repo
npx @tiagoasta/adrkit init
```

This adds the submodule and prints the one command to run in Claude Code.

To update later:

```bash
npx @tiagoasta/adrkit update
```

### Option B: Manual submodule

```bash
# 1. Add the submodule
git submodule add https://github.com/tiagoastak/adr-kit.git .claude/adr-kit
git submodule update --init

# 2. Open Claude Code and run:
@.claude/adr-kit/commands/adr-init.md
```

### After setup

`adr-init` handles everything in one step — commands, rules, docs structure, `CLAUDE.md`, and `settings.json`. After it completes:

1. Fill in `CLAUDE.md` — repo name, Quick Commands (run/test/lint), Architecture Overview
2. Review `.claude/settings.json` — add your stack's tool permissions
3. Commit:

```bash
git add .claude/ docs/ CLAUDE.md
git commit -m "chore: initialize adr-kit workflow"
```

---

## How It Works

### The Workflow

Every feature follows the same path, enforced by rules and slash commands:

```
Feature description
    ↓
/adr-new-adr  →  ADR created (Status: Proposed)
               Claude generates clarifying questions
               You answer them directly in the ADR
    ↓
You set Status: Accepted  ◄── GATE 1: no plan until accepted
    ↓
/adr-new-plan  →  Execution Plan created (Status: Draft)
               Claude designs the implementation:
               file tree, type signatures, test strategy — no code yet
    ↓
You approve the plan  ◄── GATE 2: no code until approved
    ↓
/adr-continue  →  Implementation
               Claude writes code, runs tests,
               shows diffs before every commit
    ↓
You review and approve each commit  ◄── GATE 3: explicit approval required
    ↓
/adr-archive-plan  →  Plan archived, ADR updated
```

**Silence is never approval.** Passing tests are never approval. Only explicit words — "commit it", "go ahead", "looks good" — unlock a commit. This is enforced by the `commit-approval.md` rule loaded at every session.

### Architecture Decision Records (ADRs)

ADRs live at `docs/adrs/{ID}-title-adr.md` where `{ID}` is a random 6-digit number. They are permanent records — once accepted, only superseded by a newer ADR that references them.

| Section | Purpose |
|---------|---------|
| **Status** | `Proposed` → `Accepted` (the gate field) |
| **Clarifications Log** | Q&A table between Claude and the architect; each row is a decision |
| **Tradeoffs Considered** | Options evaluated, what was selected and why |
| **Final Decision** | One-paragraph summary of what was decided |
| **Execution Plan link** | Pointer to the living implementation document |

When an ADR is created, Claude generates clarifying questions — typically 5–10 covering security, data model, error handling, API design, and backward compatibility. You answer each one directly in the markdown file. Each answer becomes a permanent row in the Clarifications Log with the decision and rationale.

### Execution Plans

The execution plan is the **session state** for an in-progress feature — committed to git after every session so state is never lost.

| Section | Purpose |
|---------|---------|
| **Agent Quick Start** | First 50 lines — status, current step, what to load, next action |
| **Task Checklist** | `[ ]` / `[→]` / `[✓]` / `[✗]` per sub-task |
| **Implementation Steps** | One section per step: objective, files to modify, expected changes |
| **Session Log** | What happened last session, decisions made, what's next |
| **Context Files** | Explicit list of files to load — Claude does not explore the repo |
| **Success Criteria** | Conditions that must be true before archiving |

The execution plan answers one question at the start of every session: _"What do I do right now?"_ Any team member — or a completely fresh Claude session — can resume the feature in under two minutes.

### The Context Problem

Claude Code has a finite context window. Load too much and earlier content gets pushed out. Load too little and Claude makes assumptions.

The ADR workflow solves this deliberately. Rather than letting Claude explore freely, it defines **exactly what to load and in what order**:

1. `CLAUDE.md` — loaded automatically every session. Contains the "Active Work" pointer.
2. The **ADR** — provides the _why_: decisions made, tradeoffs, constraints.
3. The **Execution Plan** — provides the _what right now_: current step, files to load, next action.

The result is a tightly scoped session — roughly 1,500 lines — compared to 10,000+ from unrestricted exploration. Smaller context means sharper focus, more predictable output, and easier review.

### Commands

| Command | Purpose |
|---------|---------|
| `/adr-new-feature` | Start a new feature from a plain English description |
| `/adr-new-adr` | Create an ADR from scratch |
| `/adr-new-plan` | Generate an execution plan from an Accepted ADR |
| `/adr-continue` | Resume an in-progress feature — picks up at current step |
| `/adr-worktree` | Set up an isolated worktree for parallel feature development |
| `/adr-review` | Code review a file against its ADR and conventions |
| `/adr-bug-fix` | Diagnose and fix a bug with ADR check |
| `/adr-arch-audit` | Read-only audit of ADR/execution plan consistency |
| `/adr-status` | Full project status — active plans, git state, build health |
| `/adr-reindex` | Rebuild `docs/adr-index.md` after ADR changes |
| `/adr-archive-plan` | Move a completed execution plan to archive |
| `/adr-context-audit` | Audit Claude context for token waste and bloat |
| `/adr-init` | One-time setup: bootstrap a repo with adr-kit |
| `/adr-update` | Refresh rules and shims after a submodule update |

> Commands are entirely optional. Every step can be driven through natural conversation with Claude — "create an ADR for this feature", "draft an execution plan", "resume the current feature". Commands are shortcuts that ensure consistency, not a prerequisite.

### Rules

Rules are Markdown files in `.claude/rules/` that Claude reads at the start of every session. They define non-negotiable standing instructions.

| Rule | What It Enforces |
|------|-----------------|
| `adr-workflow.md` | Load ADR before touching code; update it after implementation |
| `commit-approval.md` | No commit without explicit architect approval |
| `git-conventions.md` | Conventional commit format and safety protocol |
| `architecture-update.md` | What belongs in `docs/architecture.md` at each C4 level |
| `testing.md` | Testing principles; coverage requirements; anti-patterns |
| `goal-driven-execution.md` | Define success criteria before coding |
| `think-before-coding.md` | Surface assumptions and tradeoffs; stop if uncertain |
| `surgical-changes.md` | Touch only what the task requires |
| `keep-it-simple.md` | KISS; no speculative flexibility; Rule of Three |
| `separate-concerns.md` | One function, one job; no hidden side effects |

**Repo-specific rules (you add these):** stack conventions (`python-conventions.md`, `typescript-conventions.md`, `dotnet-conventions.md`), testing framework specifics, deployment rules.

### Permissions Philosophy

The `settings.json` philosophy: automate the safe and reversible; gate the consequential.

**Pre-approved** (Claude runs freely): `git`, `gh`, standard Unix utilities, plus your stack's tools.

**Approval required** (prompts every time): `git add`, `git commit` — enforces human-in-the-loop.

**Denied entirely**: `rm -rf *`, `git push` — no auto-push, no catastrophic deletes.

### Commit Conventions

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<optional body>
```

**Types**: `feat` | `fix` | `refactor` | `test` | `docs` | `chore` | `build` | `perf`

### Parallel Feature Development

Two features can run simultaneously without interference using Git worktrees. Each worktree is an isolated checkout on its own branch, sharing the same `.git` directory.

```bash
git worktree add .claude/worktrees/feature-abc story/feature-abc
cd .claude/worktrees/feature-abc
claude
```

When two parallel features touch shared interfaces, a **parallel work brief** defines frozen interface contracts and file ownership boundaries so neither worktree breaks the other.

### Key Design Decisions

**Commands = shim files.** Each `.claude/commands/adr-*.md` contains one line: `@.claude/adr-kit/commands/adr-continue.md`. Updating a command in adr-kit takes effect across all consuming repos the next time they run `/adr-update`.

**Rules = copied files.** Unlike commands, rules are loaded automatically at session start — not user-invoked. `adr-init` copies them into `.claude/rules/`. `adr-update` refreshes the copies, flagging local modifications before overwriting.

**`CLAUDE.md` = `@` import + repo sections.** The first line of every repo's `CLAUDE.md` is `@.claude/adr-kit/CLAUDE.base.md`. Everything repo-specific (Quick Commands, Active Work, Architecture Overview, Code Conventions) comes after.

**`settings.json` is repo-owned.** Permissions are security-sensitive and require explicit human review per repo. `settings.base.json` is a reference document; `adr-init` uses it as a starting template.

**Submodule is pinned.** Each consuming repo pins to a specific adr-kit commit. No surprise workflow changes — updates are deliberate.

---

## What Lives Where

| Location | Contents |
|----------|---------|
| `adr-kit/commands/` | All `adr-*` command definitions (authoritative source) |
| `adr-kit/rules/` | Base process rules |
| `adr-kit/docs/` | Workflow guide + all templates |
| `adr-kit/CLAUDE.base.md` | Shared workflow content for all repos |
| `adr-kit/settings.base.json` | Reference base permissions |
| `.claude/commands/` | Shim files (one-line `@` imports per command) |
| `.claude/rules/` | Copies of base rules + repo-specific additions |
| `.claude/settings.json` | Repo-specific permissions |
| `CLAUDE.md` | `@` import + repo-specific sections |
| `docs/adrs/` | This repo's Architecture Decision Records |
| `docs/execution-plans/` | This repo's execution plans |
| `docs/architecture.md` | This repo's architecture document |

---

## Contributing

Found a bug in a command? A rule that conflicts with how your team works? A missing template section?

**Open an issue:** [github.com/tiagoastak/adr-kit/issues](https://github.com/tiagoastak/adr-kit/issues)

Use issues for:

- Bug reports (command does the wrong thing, rule fires incorrectly)
- Workflow improvements (a step is unclear, a gate is in the wrong place)
- New command requests
- Template gaps

Pull requests are welcome. If the change is non-trivial, open an issue first — changes to base rules and commands affect every repo using adr-kit, so a quick alignment conversation is worth it.

---

## Support

If adr-kit saves you time, consider buying me a coffee — it helps fund continued development of this and other open-source tools.

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/tiagoasta)

---

## License

MIT — see [LICENSE](LICENSE).
