---
description: Archive a completed execution plan
---

Archive the completed execution plan.

Steps:
1. List active plans: `ls docs/execution-plans/*.md` (exclude archive/)
2. Confirm which plan to archive with the user
3. Move the plan to `docs/execution-plans/archive/`
4. Update the corresponding ADR's execution plan link to point to the archive location
5. Update CLAUDE.md "Active Work" section (remove pointer if no more active work)
6. Stage the changes and report what was moved
