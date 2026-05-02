---
description: Refresh adr-kit rules and command shims after a submodule update
---

Refresh adr-kit rules and command shims from the updated submodule.

## Pre-flight

Verify `.claude/adr-kit/` exists. If not, STOP — the submodule is not initialized.

## Step 0: Verify Submodule Branch is Current

Run the following inside the submodule:

```bash
cd .claude/adr-kit
git fetch origin
git status
git log HEAD..origin/$(git rev-parse --abbrev-ref HEAD) --oneline
cd ../..
```

From this output, check:

1. **Which branch is checked out** — report it to the user.
2. **Whether it is behind the remote** — if `git log HEAD..origin/<branch>` returns commits, report them:
   > adr-kit is behind origin/main by N commit(s):
   > - `abc1234` feat: add adr-foo command
   >
   > Run `cd .claude/adr-kit && git pull` to update before continuing.
   >
   > Proceed anyway? (yes/no)
   >
   > If the user says no — STOP.
   > If the user says yes — continue with the current local state.
3. **Whether it is ahead of the remote** — if there are local commits not pushed, warn.
4. **Whether it is detached HEAD** — if `git rev-parse --abbrev-ref HEAD` returns `HEAD`, warn:
   > adr-kit submodule is in detached HEAD state. Run `cd .claude/adr-kit && git checkout main` to attach to a branch, then pull.
   > Proceed anyway? (yes/no)

If the branch is up to date with its remote, report: "adr-kit is up to date with origin/<branch>"

Then continue.

## Step 1: Refresh Command Shims

Run: `ls .claude/adr-kit/commands/`

For each command file (except `adr-init.md` and `adr-update.md`):
- If a corresponding shim exists at `.claude/commands/<filename>`: verify it still points to the correct submodule path
- If a shim is **missing** (new command added to adr-kit): create it with content `@.claude/adr-kit/commands/<filename>`

For any shim in `.claude/commands/` that has **no corresponding file** in adr-kit (command was removed): report it but do NOT auto-delete. Ask the user to confirm deletion.

## Step 2: Refresh Rules

Run: `ls .claude/adr-kit/rules/`

For each rule file in the submodule:
- Read the new version from `.claude/adr-kit/rules/<filename>`
- Compare with the existing `.claude/rules/<filename>` (if it exists)
- If different: overwrite with the new content and report the update
- If new (no existing copy): write it and report as added

For any rule in `.claude/rules/` with no corresponding submodule file (rule was removed): report it but do NOT auto-delete. Ask the user to confirm.

**Important**: If `.claude/rules/<filename>` has been locally customized (content differs from submodule AND the diff looks intentional), report the conflict and let the user decide whether to overwrite.

## Step 3: Report

```
adr-kit update complete.

Commands:
  Added shims: [list or "none"]
  Removed (confirm deletion?): [list or "none"]

Rules:
  Updated: [list or "none"]
  Added: [list or "none"]
  Conflicts (locally modified): [list or "none"]
  Removed (confirm deletion?): [list or "none"]

Next step:
  git add .claude/commands/ .claude/rules/
  git commit -m "chore(claude): update adr-kit rules to [submodule-hash]"
```
