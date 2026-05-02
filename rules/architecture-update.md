# Architecture Document Update Rules

## When This Rule Applies

Loaded whenever `docs/architecture.md` is in scope — during ADR implementation wrap-up, architecture reviews, or when the adr-workflow.md checklist says "update architecture.md."

## Document Purpose

`docs/architecture.md` is a **navigational map** of the system at the component level. It answers:
- **Why** does this system exist and for whom?
- **What** are the major components and how do they interact?
- **How** is it deployed and configured (overview only)?

It does NOT contain: class-level detail, per-ADR implementation narratives, or derived data.

## Content Placement (C4-Aligned)

### L1 Context — "What is this and who cares?"

| Belongs Here | Does NOT Belong Here |
|---|---|
| Business purpose (why, for whom) | Implementation mechanics |
| External actors and integrations | Internal class names |
| System boundary diagram | Per-feature details |

**Update trigger**: New external integration point.
**Update scope**: Add actor/arrow. ~1-3 lines.

### L2 Container — "What does this run as and what does it depend on?"

| Belongs Here | Does NOT Belong Here |
|---|---|
| Runtime (language, framework version) | Class names, function signatures |
| Deployment model (serverless, container, etc.) | ADR implementation details |
| Infrastructure dependencies | Build commands |
| Core packages table (name, purpose, ADR link) | Dev/test-only packages |

**Update trigger**: New infrastructure dependency, new package, deployment model change.
**Update scope**: Add/update row in packages table. ~1-5 lines.

### L3 Component — "How do the pieces fit together?"

| Belongs Here | Does NOT Belong Here |
|---|---|
| Service interaction diagram | Per-endpoint class trees |
| Component/module routing architecture | Internal function signatures |
| Component summary table (component, domain, responsibilities) | Full implementation details |
| Cross-cutting patterns (auth, error handling, async) | Per-file registration lists |

**Update trigger**: New service, new major component, new cross-cutting pattern.
**Update scope**: Add row to component table, update diagram. ~5-15 lines.

### Operational

| Belongs Here | Does NOT Belong Here |
|---|---|
| Testing strategy overview | Test fixture class names |
| Decision log table (one row per ADR) | Per-ADR prose sections |
| Links to sub-documents | Duplicated content |

**Update trigger**: Every ADR implementation.
**Update scope**: Add one row to decision log. ~1 line.

## Post-ADR Update Checklist

```
1. Decision log table: Add one row (ADR number, title, status, one-line summary)
2. Check: Does this ADR add a new external actor? -> Update L1 Context diagram
3. Check: Does this ADR add a new dependency/service? -> Update L2 services table
4. Check: Does this ADR add a new component or pattern? -> Update L3 table
5. DO NOT: Add per-ADR prose sections or implementation details
6. Self-verify: Decision log row count == ADR count in adr-index.md
```

**Expected change size**: 1-15 lines per ADR. More than 15 lines = too much detail.

## Architectural Significance Test

Before adding content: **"Would an architect reviewing this system for the first time need this to understand the design?"**

- "Service A dispatches requests to Service B via [protocol]" -> Yes (component interaction)
- "ServiceA.GetByIdAsync returns nullable" -> No (code detail)
- "All external writes are idempotent" -> Yes (cross-cutting pattern)
- "The retry loop uses exponential backoff with jitter" -> No (implementation detail)
