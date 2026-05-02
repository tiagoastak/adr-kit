## WORKFLOW REMINDER (Read First Every Session)

**Before ANY significant change**:

1. Check if an ADR exists for this component: `ls docs/adrs/`
2. For new features: create an ADR with Status: Proposed
3. Don't create an execution plan until ADR Status: Accepted
4. Don't implement until the execution plan is approved

**Approval Gates**:

- ADR must be Status: Accepted before creating an execution plan
- Execution plan must be approved before implementation
- All tests must pass before committing
- Every commit requires explicit human approval — silence is not approval

**When in doubt**:

- Load `@.claude/adr-kit/docs/agentic-workflow-guide.md`
- Ask: "Should I create an ADR for this?"

---

## Worktrees — Parallel Feature Development

Claude Code has native worktree support. Each worktree is an isolated checkout with its own branch, so two features can be developed simultaneously without interference.

```bash
# Terminal 1 — Feature A (main working directory)
cd [project-root]
claude

# Terminal 2 — Feature B (isolated worktree on its feature branch)
git worktree add .claude/worktrees/feature-abc story/feature-abc
cd .claude/worktrees/feature-abc
claude
```

**Key**: The worktree checks out the story branch directly — commits land on the correct branch with no cherry-picks needed.

**What's shared** between worktrees (all from the same `.git`):

- `.claude/settings.json`, `CLAUDE.md`, `.claude/commands/`, `.claude/rules/` — tracked in git, visible in all worktrees
- `docs/` — ADRs, execution plans, templates — commit in one worktree, `git pull` in the other

**What's isolated** per worktree:

- `src/` working files — each worktree has its own branch

**When two features share code**: create `docs/parallel-work-brief-ADR-X-ADR-Y.md` from the template. See `/adr-worktree` for the full workflow.

---

## Workflow Principles

**IMPORTANT**: This project follows a document-driven, ADR-based development workflow.

### Core Constraints

1. **Human-in-the-Loop**: Propose changes, never implement without approval
2. **Plan Before Code**: For non-trivial changes, create an execution plan in `docs/execution-plans/` first
3. **ADR-Driven**: All architectural decisions must be documented in `docs/adrs/{ID}-*-adr.md` where `{ID}` is a random 6-digit number
4. **Test-First**: Unit tests required from the first line of code
5. **Context Isolation**: Don't load the entire docs folder — reference specific files as needed
6. **Sync Documentation**: Keep ADR and execution plan in sync with all changes
7. **Single Source of Truth**: All session state and work tracking lives in the execution plan (committed to git). Never use agent-private storage for work items — other developers and agents can't see it

### Execution Plan Workflow

**IMPORTANT**: Execution plans are living documents that track implementation progress and session state.

#### When You're Working on a Feature

1. **Load order** (always in this sequence):
   - Load the ADR first: `@docs/adrs/{ID}-feature-adr.md`
   - Check if an execution plan exists: the ADR will link to it at the top
   - Load the execution plan: `@docs/execution-plans/{ID}-execution-plan.md`
   - Stop here — the execution plan tells you what else to load

2. **Execution plan is your session state**:
   - Current step and status
   - Blockers requiring human input
   - Files to load (don't guess, don't explore)
   - Next actions (explicit, conditional)
   - Session log (what happened last session)

3. **Update execution plan as you work**:
   - Mark tasks complete: `[ ]` -> `[x]`
   - Update "Current Step" field
   - Add session log entries
   - Document decisions and blockers
   - Commit execution plan updates to git

4. **When blocked**:
   - Document the blocker in the execution plan
   - Update "Current Step" to show BLOCKED status
   - Commit execution plan update
   - Ask for a decision

#### Anti-Patterns

- Do not load the entire `docs/` folder — follow the execution plan's file list
- Do not guess which files to load — use the execution plan's "What Do I Load?" section
- Do not forget to update the execution plan after completing steps
- Do not start implementation without loading the execution plan first
- Do not create tasks in memory — update the execution plan in git

### When to Load What

- **Starting a new feature**: `/adr-new-feature [description]`
- **Resuming work**: `/adr-continue`
- **Status overview**: `/adr-status`
- **Architecture questions**: Load the specific ADR file
- **Finding a decision**: Load `docs/adr-index.md` — topic-to-ADR lookup without reading individual ADRs
- **Workflow questions**: Load `@.claude/adr-kit/docs/agentic-workflow-guide.md`
- **No active work**: `ls docs/backlog/` — propose backlog items for promotion
- **Never**: Load all `docs/*` files at once (context pollution)

### Document Structure

- `docs/adrs/*.md` — Architecture Decision Records
- `docs/execution-plans/*.md` — Implementation plans (approved before coding)
- `docs/execution-plans/archive/` — Completed plans
- `docs/backlog/*.md` — Deferred work candidates
- `docs/adr-index.md` — Fast topic-to-ADR lookup
- `docs/architecture.md` — System architecture (C4 model + decision log)

---

## Git Commit Messages

CRITICAL SAFETY RULE: Never use `git add -A`, `git add .`, or `git add *`.
Always stage specific files explicitly and get human approval before committing.
See `.claude/rules/git-conventions.md` for the required human-in-the-loop commit workflow.

Follow the Conventional Commits format:

```text
<type>(<scope>): <subject>
```

**Types**: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `build`, `perf`

---

## Anti-Patterns to Avoid

- Do not create files without ADR approval
- Do not load all docs files at once
- Do not implement before execution plan approval
- Do not use `git add -A` or `git add .`
- Do not commit without explicit human approval
- Do not store session state in memory — use the execution plan in git
