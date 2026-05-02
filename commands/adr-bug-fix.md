---
description: Diagnose and fix a bug
---

Fix bug: $ARGUMENTS

Before fixing:
1. Identify which ADR covers this component (check `docs/adr-index.md`)
2. Read the relevant source files to understand the current behavior
3. If trivial fix (typo, off-by-one, obvious logic error): implement and test
4. If architectural change needed: propose in the ADR first, wait for approval

Run all tests after the fix using the test command in CLAUDE.md Quick Commands.

Do not commit until tests pass.
