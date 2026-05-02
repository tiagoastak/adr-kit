---
adr: "NNN"
status: Proposed
author: "[Name]"
date: YYYY-MM-DD
---

# ADR-NNN: [Title]

**Status**: Proposed | Accepted | Rejected | Superseded
**Date**: YYYY-MM-DD
**Author**: [Name]

---

## Execution Plan

**Execution Plan**: [@docs/execution-plans/NNN-execution-plan.md](../execution-plans/NNN-execution-plan.md)
**Plan Status**: [Not Started | In Progress | Blocked | Completed]
**Last Updated**: YYYY-MM-DD HH:MM

> Agent: If implementing this ADR, **load the execution plan first**. It contains current step, blockers, and the exact files to load. Run `/adr-new-plan NNN` once Status = Accepted to generate the plan.

---

## Session State (While Status = Proposed)

**Phase**: [Clarification | Stack Proposal | Tradeoff Analysis | Final Review | Awaiting Acceptance]
**Last Updated**: YYYY-MM-DD HH:MM
**Waiting On**: [Architect answers | Agent proposal | Architect approval]
**Next Action**: [Specific instruction]

> Remove this section when Status changes to Accepted (execution plan takes over session tracking).

---

## Context

### Business Requirement

- [What problem are we solving and for whom?]
- [Expected input -> processing -> output]

### Affected Components

List the components this ADR touches:

- [ ] [Component / service / module 1]
- [ ] [Component / service / module 2]

### Technical Constraints

- [Language/runtime version, package manager, framework]
- [Performance, latency, or data-volume constraints]
- [Backward compatibility or deployment constraints]
- [Any other hard constraint]

---

## Clarifications Log

| # | Question | Answer | Decided By | Rationale |
|---|----------|--------|------------|-----------|
| 1 | [Question] | [Answer] | Architect | [Why this matters] |

---

## Proposed Approach

[Describe the high-level approach. Include any new dependencies.]

### New Dependencies

| Package / Library | Version | Purpose | Status |
|-------------------|---------|---------|--------|
| `[package]` | `^x.x` | [What it does] | Pending |

---

## Architect's Decisions

### Approved
| Item | Rationale |
|------|-----------|

### Rejected
| Item | Alternative | Rationale |
|------|-------------|-----------|

### Deferred
| Item | Deferred To | Rationale |
|------|-------------|-----------|

---

## Initial Risks

- **[Risk Name]**: [Description + mitigation]

---

## Tradeoffs Considered

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| [Option A] | [Pros] | [Cons] | Selected / Rejected |

---

## Final Decision

[Clear statement. What will be built, which components change, which approach is taken.]

---

## Consequences

### Positive
- [Benefit]

### Negative
- [Tradeoff] (mitigation: ...)

---

## Next Steps (Post-Acceptance)

1. Set ADR status to **Accepted**
2. Run `/adr-new-plan NNN` to generate the execution plan
3. Agent fills in plan (file tree, dependencies, type signatures, test strategy)
4. Architect reviews and approves plan
5. Implementation begins only after plan approval

---

## References

- [Related ADRs, external docs, RFCs, prior art]

---

## Lessons Learned (Post-Implementation)

| What Happened | Impact | Change for Next ADR |
|---------------|--------|---------------------|
| [e.g., interface contract was unclear at integration point] | [Impact] | [Prevention] |
