# Testing Conventions

## General Principles

- All public methods require unit tests
- All API/service endpoints require integration tests
- All error paths must be tested explicitly — not just the happy path
- Tests must not depend on external services; use mocks/fakes at boundaries
- Tests without assertions are not tests

## Test Structure (Arrange / Act / Assert)

```
Arrange: Set up inputs, mocks, and preconditions
Act:     Call the unit under test
Assert:  Verify the outcome
```

## Naming Convention

`test_<method>_<scenario>_<expected>` or `<Method>_<Scenario>_<Expected>`:

- `test_create_user_duplicate_email_raises_conflict`
- `GetConversation_ExistingId_ReturnsConversation`

## Coverage Requirements

- All public methods tested (unit)
- All API endpoints tested (integration)
- All error paths tested explicitly
- Happy path + at least one error case per component

## Test Anti-Patterns

- Tests that depend on live external services (use mocks/fakes)
- Tests with hardcoded credentials or real infrastructure
- Tests that only test mocks (test real behaviour where possible)
- Duplicating app configuration in test setup (reuse app factory/fixture)

---

> **Stack-specific examples**: Add a `testing-[stack].md` rule to `.claude/rules/` for
> framework-specific patterns (pytest, xUnit, Jest, etc.). This file covers principles only.
