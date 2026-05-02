---
description: Start a new isolated worktree for parallel feature development
---

Set up a new worktree for parallel feature development.

## Usage

```bash
# Create a worktree named after your feature branch
git worktree add .claude/worktrees/{branch-name} story/{branch-name}
cd .claude/worktrees/{branch-name}
claude
```

Then in Claude: `/adr-continue` to resume work in the isolated worktree.

## What Gets Copied Automatically

Files listed in `.worktreeinclude` that are gitignored (certs, `.env`, local config) are copied to the new worktree so it's immediately runnable.

## Parallel Feature Workflow

When co-developing two features simultaneously:

1. **Main window** — work on Feature A:
   ```bash
   # In the main repo directory
   /adr-new-feature Feature A: [description]
   ```

2. **Second window** — work on Feature B:
   ```bash
   # In a new terminal
   git worktree add .claude/worktrees/feature-b story/feature-b
   cd .claude/worktrees/feature-b
   claude
   /adr-new-feature Feature B: [description]
   ```

3. **Coordinate via parallel-work-brief** if the features share code:
   ```bash
   cp .claude/adr-kit/docs/templates/parallel-work-brief-template.md \
     docs/parallel-work-brief-ADR-X-ADR-Y.md
   # Fill it in — commit to git so both worktrees can see it
   ```

4. **Pull in the other worktree** to pick up the brief:
   ```bash
   git pull
   ```

## Worktree Cleanup

```bash
git worktree remove .claude/worktrees/{branch-name}
```

## ADR and Execution Plan Context

The story branch may predate the ADR and execution plan files (they're created during planning, often after branching). After creating a worktree, copy `docs/` from the main repo to ensure the new session starts with full context:

```bash
cp -rf docs/. .claude/worktrees/{branch-name}/docs/
```

If you're already inside a worktree and the ADR or execution plan is missing, recover by pulling from the main repo:

```bash
MAIN=$(git worktree list --porcelain | awk 'NR==1{print $2}')
cp -rf "$MAIN/docs/." docs/
```

Each worktree can have its own in-progress ADR. Update CLAUDE.md "Active Work" with your ADR — since `.claude/` is tracked by git, both worktrees share the same commands and rules. Each has its own working copy of `docs/` and `src/`.

## Settings

- `.claude/settings.json` — shared across all worktrees (team config)
- `.claude/settings.local.json` — per-machine override (gitignored)
- Worktrees inherit all `settings.json` permissions automatically
