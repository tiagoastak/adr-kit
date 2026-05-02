---
description: Create an execution plan for an accepted ADR
---

Create an execution plan for ADR $ARGUMENTS.

Steps:

1. Determine the ADR ID from the argument — it may be a 6-digit number (e.g. `847392`) or a legacy sequential number (e.g. `004`)
2. Find the ADR file: `ls docs/adrs/` and match by ID
3. Read the ADR file

**Pre-flight checks (STOP if any fail)**:
4. Verify ADR Status is "Accepted" — if not, STOP and tell the architect: "ADR-{ID} status is '{status}', must be Accepted before creating an execution plan."
5. Check if an execution plan already exists: look for `docs/execution-plans/{ID}-execution-plan.md` (also check archive/) — if found, STOP.

**If checks pass**:
6. Copy `@.claude/adr-kit/docs/templates/execution-plan-template.md` to `docs/execution-plans/{ID}-execution-plan.md`
7. Replace placeholder fields (ID, Feature Name, dates, ADR links)
8. Fill in the execution plan sections based on the ADR:
   - Agent Quick Start (summary, current status)
   - Bidirectional links (point back to the ADR)
   - File Tree (propose all files to create/modify based on ADR decisions)
   - Dependencies (packages/libraries with versions, per the repo's package manager)
   - Key Types/Interfaces dry-run (signatures only, no implementation)
   - Test Strategy (unit + integration approach per repo's test framework)
   - Build & Run Instructions (per the repo's stack — check CLAUDE.md Quick Commands)
   - Task Checklist (break ADR decisions into implementation steps)
   - Traceability to ADR (map each requirement to an implementation task)
9. Update the ADR's execution plan link and status at the top
10. Update CLAUDE.md "Active Work" section to point to the execution plan

**Constraints**:
- Do NOT write implementation code — this is design review only
- Propose everything (packages, types, structure) — don't ask the architect to fill in blanks
- Set plan status to "Draft" (architect must approve before implementation)

Present the execution plan and wait for architect review and approval.

**After approval**: Run `/adr-continue` from the repo root — it will create an isolated worktree automatically and tell you the exact command to start implementing.
