---
description: Update the ADR Knowledge Index (docs/adr-index.md) with changes from ADRs
---

You are updating the ADR Knowledge Index (`docs/adr-index.md`). This index provides fast topic-to-ADR lookup so agents and developers don't need to load individual ADR files to find decisions.

## When This Runs

- After any ADR reaches Status: Implemented
- On demand when the index may be stale
- Force mode: `/adr-reindex --force` skips digest checks and re-reads all ADRs

## Step 1: Check Digests (Skip Unchanged ADRs)

The index has a "Digests" section at the bottom with file sizes per ADR. Use these to skip unchanged files:

1. Get current file sizes for all ADRs:
   - macOS/Linux: `stat -c '%s %n' docs/adrs/*.md`
2. Compare against the sizes in the Digests table
3. Changed ADRs (size differs) and new ADRs (not in table) must be re-read
4. Unchanged ADRs (size matches) can be skipped

If `--force` was specified, skip this step and re-read all ADRs.

## Step 2: Read Changed ADRs Only

For each changed or new ADR, read:
- Status field
- Final Decision section
- Clarifications Log (key decisions only)
- Lessons Learned section
- Consequences section

## Step 3: Update the Index

Load `docs/adr-index.md` and update:

- **ADR Directory table**: Update status, add rows for new ADRs
- **By Topic table**: Add/update topics from changed ADRs
- **By Convention table**: Add conventions from Lessons Learned sections
- **Cross-ADR Patterns table**: Look for patterns spanning multiple ADRs
- **Digests table**: Update file sizes (always refresh this)

## Step 4: Report

```
Updated ADR index:
- ADR-003: 3 new topics, 1 new convention
- Digests: all 5 ADRs current
```

## Quality Rules

- One-line summaries: each topic row should be scannable
- Section references: point to specific ADR sections
- No duplication: if a topic appears in multiple ADRs, pick the primary
- Actionable: conventions should be concrete rules, not vague principles

## What NOT to Do

- Do not load unchanged ADR files (digests exist to skip them)
- Do not rewrite the entire index when only one ADR changed
- Do not add topics that aren't actual decisions
