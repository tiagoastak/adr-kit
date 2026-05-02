# Rule: Goal-Driven Execution

Define success criteria before writing code. Loop until verified.

## Transform Tasks Into Verifiable Goals

Vague tasks produce vague results. Before starting, restate the task as a condition you can check:

- "Add validation" -> "Write tests for invalid inputs, then make them pass"
- "Fix the bug" -> "Write a test that reproduces it, then make it pass"
- "Refactor X" -> "Ensure tests pass before and after, with no behaviour change"

## For Multi-Step Tasks, State a Plan First

```
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Share the plan before executing. This catches misaligned assumptions before any code is written.

## Why This Matters

Strong success criteria let you work independently — you know when you're done without asking. Weak criteria ("make it work", "looks good") require constant clarification and produce output that passes vibes but not reality.

## Relationship to Execution Plans

For non-trivial features, verifiable goals belong in the execution plan's "What's My Next Action?" and "Verify" fields. This rule applies at the task level — even for small, single-session work that doesn't warrant a full execution plan.
