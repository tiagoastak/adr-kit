---
paths:
  - "docs/**/*.md"
---

# ADR Workflow Rules

## When Working on Architecture

1. **Before proposing changes**:
   - Load the relevant ADR file from `docs/adrs/`
   - Check ADR status (must be "Accepted" before implementation)
   - Review Clarifications Log for unanswered questions

2. **Making changes**:
   - Update ADR Clarifications Log with Q&A
   - Document tradeoffs in ADR Tradeoffs section
   - Update Consequences section with impacts

3. **After implementation**:
   - Update ADR with implementation results
   - Update execution plan revision history
   - Mark ADR status appropriately — both the `**Status**:` body line AND the `status:` YAML frontmatter field
   - Run `/adr-reindex` to update `docs/adr-index.md`
   - Update `docs/architecture.md` per `.claude/rules/architecture-update.md`

## ADR Template Location

Reference: `@.claude/adr-kit/docs/templates/adr-template.md`

## Never

- Do not load all ADR files at once (context pollution)
- Do not implement before ADR is "Accepted"
- Do not skip updating ADR after changes
- Do not forget to sync execution plan with ADR
- Do not skip updating `docs/architecture.md` after ADR implementation
- Do not update `**Status**:` in the ADR body without also updating `status:` in the YAML frontmatter — they must stay in sync
