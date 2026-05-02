# Parallel Work Brief: [ADR-XXX] + [ADR-YYY]

**Date**: YYYY-MM-DD
**Purpose**: Load this document when starting a session on either ADR. It tells you what the other agent is doing and what constraints apply to your work.

---

## Situation

| Agent | ADR | What It Builds | Where It Works |
|-------|-----|----------------|----------------|
| **Agent A** | ADR-XXX | [Feature/Component description] | `[Primary directory path]` |
| **Agent B** | ADR-YYY | [Feature/Component description] | `[Primary directory path]` |

**Why parallel**: [Why these two pieces of work are happening simultaneously]

**Coordination need**: [What could go wrong without coordination]

---

## If You Are the [ADR-XXX] Agent

**Your job**: [Concise description]. See: `docs/execution-plans/XXX-execution-plan.md`.

**Constraints from [ADR-YYY]**:

1. **Frozen interfaces** — do NOT change these without coordinating:
   - `[module/class/function signature]`

2. **File ownership** — don't touch `[path]` (Agent B's territory)

3. **Commit and push frequently** — Agent B pulls your changes at session start

4. **If you need to break a constraint**: Add note to other agent's execution plan session log, push, wait for acknowledgement

---

## If You Are the [ADR-YYY] Agent

**Your job**: [Concise description]. See: `docs/execution-plans/YYY-execution-plan.md`.

**Constraints from [ADR-XXX]**:

1. [Constraint category] — [Specific rule]

2. [Constraint category] — [Specific rule]

---

## Merge Strategy

**File Ownership**:
| Territory | Owner | Other Agent May... |
|-----------|-------|-------------------|
| `src/[path-a]/` | Agent A | Read only |
| `src/[path-b]/` | Agent B | Read only |
| `docs/adrs/XXX-*` | Agent A | No modifications |
| `docs/adrs/YYY-*` | Agent B | No modifications |

**Shared Files** (coordinate via commit messages):
- `CLAUDE.md` — either agent may update their Active Work entry only
- `docs/architecture.md` — last writer wins; check for conflicts before pushing

**Pull/Push Discipline**:
- Pull at session start — always
- Push at session end — always
- Push immediately after interface changes

---

## Interface Contracts (Frozen During Parallel Work)

### [Interface/Module Name]

**Used by**: [Which agent]
**Implemented by**: [Which agent]

```
# Current signature (do NOT change without coordination):
function_name(param: ParamType) -> ReturnType
```

**Change process**:
1. Document needed change in your execution plan session log
2. Add blocking note to other agent's execution plan
3. Commit and push
4. Wait for other agent to acknowledge
5. Make the change and push

---

## Quick Reference

| Question | Answer |
|----------|--------|
| Can I change `[interface]`? | No. Frozen. Coordinate via execution plan session state. |
| Can I add new functions/endpoints? | Yes. New additions don't break existing dependencies. |
| Can I add files to `[path]`? | Only if you're Agent [X]. |
| What if tests fail after pulling? | Check recent commits from other agent. Adapt. Document in session log. |
| How do I signal a blocking issue? | Add BLOCKED note to other agent's execution plan. Push immediately. |

---

## Success Criteria

- [ ] Both ADRs have Status: Implemented
- [ ] Both execution plans archived
- [ ] All tests pass (no conflicts between Agent A and Agent B's work)
- [ ] No outstanding BLOCKED notes in either execution plan
- [ ] This brief archived to `docs/execution-plans/archive/`

---

**Created**: YYYY-MM-DD
**When to archive**: After both ADRs are implemented and execution plans archived.
