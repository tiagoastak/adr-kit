---
description: Resume work, or start implementation in an isolated worktree if plan is approved
---

Resume work on the current feature.

1. Read "Active Work" in CLAUDE.md -> load the execution plan
2. Read the "AGENT: START HERE" section
3. Check plan **Status**:
   - **Draft** -> STOP. Tell the architect: plan needs approval before implementation.
   - **Approved, not in a worktree** -> Look up the feature branch from the ADR. Create a worktree on the story branch, then copy `docs/` into it so the new session starts with full context (the story branch may predate ADR and execution plan files):
     ```bash
     git worktree add .claude/worktrees/{branch-name} story/{branch-name}
     cp -rf docs/. .claude/worktrees/{branch-name}/docs/
     ```
     Tell the developer: "Open new terminal -> `cd .claude/worktrees/{branch-name}` -> `claude` -> `/adr-continue`". STOP.
   - **Approved, in a worktree** -> Verify docs present (see below). Mark plan In Progress. Load "What Do I Load?" files. Execute "What's My Next Action?".
   - **In Progress** -> Verify docs present (see below). Load "What Do I Load?" files. Execute "What's My Next Action?".

## Verifying docs in a worktree

Before loading the ADR or execution plan, check they exist. If missing, copy them from the main repo:

```bash
MAIN=$(git worktree list --porcelain | awk 'NR==1{print $2}')
cp -rf "$MAIN/docs/." docs/
```
