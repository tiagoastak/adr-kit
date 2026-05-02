---
description: Get a summary of current project status across all active features
context: fork
agent: Explore
---

Project status check.

Current git state:
- Recent commits: !`git log --oneline -8`
- Uncommitted changes: !`git status --short`
- Active worktrees: !`git worktree list`

Load and summarise:
1. List active execution plans: !`ls docs/execution-plans/*.md 2>/dev/null || echo "none"`
2. List active ADRs (proposed/accepted): !`grep -rl "Status.*Proposed\|Status.*Accepted" docs/adrs/ 2>/dev/null || echo "none"`
3. List backlog items: !`ls docs/backlog/*.md 2>/dev/null || echo "none"`

Run health checks (use test/build commands from CLAUDE.md Quick Commands section):
- Check for failing tests
- Check for build errors

Report:
- What's in progress (per execution plan step)
- ADRs awaiting decisions
- Any failing tests or build issues
- Backlog candidates to promote
- What's next
