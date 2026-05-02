# Git Conventions

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>
                                    <- BLANK LINE REQUIRED
<optional body>
```

**Types**: `feat` | `fix` | `refactor` | `test` | `docs` | `chore` | `build` | `perf`

### Examples

```
feat(auth): add JWT refresh token rotation

Rotate refresh tokens on each use to limit exposure window.
```

```
fix(api): handle null response from upstream service
```

```
docs(adr): update ADR-847392 with implementation results
```

## Branching Strategy

Follow your team's existing branch naming convention. Common patterns:

- `feature/short-description` — new features
- `fix/short-description` — bug fixes
- `release/version` — release branches

If your team uses ticket IDs in branch names, include the ID in the branch name (e.g. `feature/1234-add-auth`).

### Worktrees

Use the branch name as the worktree folder name and check out the branch directly:

```bash
git worktree add .claude/worktrees/feature-abc feature/feature-abc
```

## Safety Rules

- Never use `git add -A`, `git add .`, or `git add *`
- Always stage specific files explicitly
- Always get human approval before committing (see `commit-approval.md`)
- Never force push without explicit instruction
