---
description: Create a new Architecture Decision Record
---

Create a new ADR for: $ARGUMENTS

Steps:
1. Generate a random 6-digit number as the ADR ID (e.g. `847392`) — do not list existing ADRs to pick the next sequential number
2. Copy `@.claude/adr-kit/docs/templates/adr-template.md` to `docs/adrs/{ID}-{title}-adr.md`
3. Fill in: ID (in place of NNN), title, date, Status: Proposed
4. Generate clarifying questions for the Clarifications Log — 5-10 questions covering security, data model, error handling, API design, backward compatibility, and any specifics from $ARGUMENTS
5. Update CLAUDE.md "Active Work" to point to the new ADR

Do not answer the questions. Wait for the architect.
