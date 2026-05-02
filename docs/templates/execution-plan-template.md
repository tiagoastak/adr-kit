# Execution Plan NNN: [Feature Name]

> AGENT: START HERE — This execution plan is your single source of truth.
> Read "Agent Quick Start" first. Load ONLY the files listed. Do not explore.

---

## Agent Quick Start (Read This First)

**Status**: Draft | Approved | In Progress | Completed | Archived
**Current Step**: `[Step ID — Description]` [Ready | In Progress | Blocked | Done]
**Last Updated**: YYYY-MM-DD HH:MM
**Session**: [N] (started YYYY-MM-DD)

### What Am I Working On?

[1-2 sentences describing the feature]

### Where Are We?

- [x] [Completed]
- -> **CURRENT**: [Current step]
- BLOCKED: [Blocker if any]
- [ ] [Pending]

### What's The Blocker? (If Any)

**Decision Needed**: [What is blocking]
**Recommendation**: [Agent's recommendation]
**Ask Architect**: [Specific question]

### What Do I Load? (Priority Order)

1. **This file**
2. **ADR**: [@docs/adrs/NNN-feature-adr.md](../adrs/NNN-feature-adr.md)
3. **Current Work**: `[path/to/file_in_progress]`

**DO NOT load**: Entire docs/ folder, entire src/ folder

### What's My Next Action?

**IF** [condition]:
1. [Action]
2. Update this plan — mark step [X] complete, set step [Y] in-progress

**ELSE**: Wait for architect

### Quick Stats

- **Progress**: [X]/[Y] tasks
- **Tests**: [run test command from CLAUDE.md quick commands]
- **Commits**: [N] (last: `[hash]`)

---

## Bidirectional Links

**ADR**: [@docs/adrs/NNN-feature-adr.md](../adrs/NNN-feature-adr.md)
**Workflow Guide**: [@.claude/adr-kit/docs/agentic-workflow-guide.md](../../.claude/adr-kit/docs/agentic-workflow-guide.md)
**Architecture**: [@docs/architecture.md](../architecture.md)

---

## Initial Review Status (Approval Phase)

| Section | Status | Architect Comments |
|---------|--------|-------------------|
| 1. File Tree | Pending | |
| 2. Dependencies | Pending | |
| 3. Key Type / Interface Signatures | Pending | |
| 4. Test Strategy | Pending | |
| 5. Build & Run Instructions | Pending | |

---

## Task Checklist (Implementation Phase)

**Legend**: `[ ]` Pending | `[->]` In Progress | `[x]` Completed | `[!]` Blocked

- [ ] 1. [Task]
  - [ ] 1.1 [Subtask]
- [ ] 2. Write unit tests
- [ ] 3. Write integration tests
- [ ] 4. Update ADR with implementation results
- [ ] 5. Update `docs/architecture.md`
- [ ] 6. Run `/adr-reindex` to update adr-index.md

**Progress**: 0/X (0%)

---

## Implementation Steps

### Step 1: [Step Name] [ ]

**Status**: Pending
**Objective**: [What this step accomplishes]

**Files Created/Modified**:
- `src/[path]` [NEW | MODIFY]
- `src/tests/test_[path]` [NEW]

**Tests**: [File path and expected count]
**Commit**: `[hash]` — `[message]`
**Blockers**: None

---

## Session Log

### Session YYYY-MM-DD

**Goal**: [Session goal]

**Work Completed**:
- [Item]

**Decisions Made**:
| Decision | Rationale | By |
|----------|-----------|-----|

**Next Session**:
1. [Next action]

---

## Context Files

**Must Load Every Session**:
- This execution plan
- @docs/adrs/NNN-feature-adr.md

**Load As Needed**:
- `src/[relevant path]` (when working on [component])

---

## Success Criteria

- [ ] All components implemented per ADR
- [ ] All tests pass (run test command from CLAUDE.md Quick Commands)
- [ ] Linting / type checking clean
- [ ] ADR updated with implementation results
- [ ] architecture.md decision log updated

---

## 1. Complete File Tree

```
src/
+-- [module]/
    +-- [feature].ext          [NEW]
    +-- tests/
        +-- test_[feature].ext [NEW]
```

---

## 2. Dependencies

List all new packages/libraries required. Use the repo's package manager.

| Package | Version | Purpose |
|---------|---------|---------|
| `[package]` | `^x.x` | [What it does] |

---

## 3. Key Type / Interface Signatures

```
// Signatures only — no implementation

interface FeatureService {
  process(input: InputType): OutputType
}
```

---

## 4. Test Strategy

### Unit Tests

| Test File | What to Test | Mocking Strategy |
|-----------|--------------|-----------------|
| `tests/test_[feature]` | [Logic] | [What to mock] |

### Integration Tests

| Test File | What to Test | Notes |
|-----------|--------------|-------|
| `tests/integration/test_[feature]` | [End-to-end] | [Any infra needed] |

---

## 5. Build & Run Instructions

```bash
# Tests
[repo test command from CLAUDE.md]

# Run service locally
[repo run command from CLAUDE.md]

# Lint / type check
[repo lint command from CLAUDE.md]
```

---

## 6. Traceability to ADR-NNN

| ADR Requirement | Implementation | Status |
|-----------------|----------------|--------|
| [Requirement] | [File + component] | Pending |

---

## Deliverables

- [ ] Code: [components]
- [ ] Unit tests: [target count]
- [ ] Integration tests: [target count]
- [ ] ADR-NNN updated (implementation results)
- [ ] architecture.md updated (decision log row)
- [ ] Execution plan archived

---

## Revision History

| Date | Change | By |
|------|--------|----|
| YYYY-MM-DD | Created | Agent |
| YYYY-MM-DD | Approved | @username |

---

## Approval

- [ ] **Approved** — proceed with implementation
- [ ] **Approved with comments** — proceed, address inline
- [ ] **Rejected** — revise and resubmit

**Comments**:

---

## Implementation Results (Post-Completion)

**Tests**: [X]/[Y] passing

**Commits**:
- `[hash]` — `[message]`

**Lessons Learned**:
- [What went well / could improve]
