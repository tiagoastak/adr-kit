---
description: Initialize a repo to use adr-kit workflow (run once after adding submodule)
---

Set up the adr-kit workflow for this repository.

## Pre-flight Check

Verify `.claude/adr-kit/commands/` exists and contains command files.

If missing, STOP and tell the user:
> Run `git submodule add https://github.com/tiagoastak/adr-kit.git .claude/adr-kit` first, then re-invoke this command with `@.claude/adr-kit/commands/adr-init.md`.

## Step 1: Create Command Shims

Run: `ls .claude/adr-kit/commands/`

For each `.md` file listed — **except `adr-init.md` and `adr-update.md`** — create a corresponding shim file at `.claude/commands/<filename>`.

First create the directory if needed: `mkdir -p .claude/commands`

Each shim file contains exactly one line:
```
@.claude/adr-kit/commands/<filename>
```

Example — `.claude/commands/adr-continue.md` contains:
```
@.claude/adr-kit/commands/adr-continue.md
```

## Step 2: Copy Base Rules

Run: `ls .claude/adr-kit/rules/`

Create the directory if needed: `mkdir -p .claude/rules`

For each rule file in `.claude/adr-kit/rules/` (these are base process rules, not templates), read it and write an identical copy to `.claude/rules/<filename>`.

Base rules to copy: `adr-workflow.md`, `git-conventions.md`, `commit-approval.md`, `architecture-update.md`, `testing.md`.

## Step 3: Detect Stack and Generate Convention Rules

Probe the repo root and common subdirectories to identify what technology stacks are present. Run these checks:

```bash
# Python signals
ls pyproject.toml requirements.txt setup.py Pipfile 2>/dev/null

# TypeScript / Node signals
ls package.json tsconfig.json 2>/dev/null

# .NET signals
ls *.sln global.json 2>/dev/null
find . -name "*.csproj" -not -path "./.claude/*" 2>/dev/null | head -5

# Go signals
ls go.mod 2>/dev/null
```

For each detected stack, read the corresponding template and adapt it before writing to `.claude/rules/`:

---

### If Python is detected:

Read `@.claude/adr-kit/rules/templates/python-conventions.md`.

Then probe for specifics:
- **Package manager**: check `pyproject.toml` for `[tool.uv]` -> uv; `[tool.poetry]` -> Poetry; else pip
- **Linter**: check `pyproject.toml` or config files for ruff, flake8, pylint
- **Formatter**: check for black, ruff format, autopep8
- **Type checker**: check for mypy, pyright, pytype
- **Test framework**: check for pytest, unittest
- **Python version**: check `pyproject.toml` `requires-python` or `.python-version`
- **Framework**: check deps for fastapi, django, flask, etc.

Adapt the template — replace placeholders with the actual tools found. If a tool isn't detected, use the template default.

Write the adapted file to `.claude/rules/python-conventions.md`.

---

### If TypeScript / Node is detected:

Read `@.claude/adr-kit/rules/templates/typescript-conventions.md`.

Then probe for specifics:
- **Package manager**: check for `pnpm-lock.yaml` -> pnpm; `yarn.lock` -> yarn; `bun.lockb` -> bun; else npm
- **Test framework**: check `package.json` devDependencies for jest, vitest, mocha, jasmine
- **Linter**: check for eslint, biome, oxlint
- **Formatter**: check for prettier, biome
- **Framework**: check deps for next, express, nestjs, react, vue, etc.
- **TypeScript version**: check `package.json` devDependencies

Adapt the template and write to `.claude/rules/typescript-conventions.md`.

---

### If .NET is detected:

Read `@.claude/adr-kit/rules/templates/dotnet-conventions.md`.

Then probe for specifics:
- **Framework version**: read `global.json` or `TargetFramework` from a `.csproj`
- **Test framework**: check `.csproj` files for xunit, mstest, nunit package references
- **Nullable references**: check `<Nullable>enable</Nullable>` in `.csproj`
- **Key NuGet packages**: scan `.csproj` for major framework packages

Adapt the template and write to `.claude/rules/dotnet-conventions.md`.

---

### If no known stack is detected:

Create `.claude/rules/conventions.md` with this content:

```markdown
# Code Conventions

## Stack

- Language: [fill in]
- Framework: [fill in]
- Package manager: [fill in]

## Running Tests

[fill in test command]

## Linting / Formatting

[fill in lint command]

## Conventions

[fill in team conventions]
```

Tell the user: "No known stack detected — created a starter `.claude/rules/conventions.md`. Fill in your team's conventions."

---

### Multiple stacks

If multiple stacks are found (e.g. Python + TypeScript), generate a convention rule file for each.

## Step 4: Scaffold docs/

Create these directories if they don't already exist:
- `docs/adrs/`
- `docs/execution-plans/`
- `docs/execution-plans/archive/`
- `docs/backlog/`

Create `docs/adr-index.md` if it doesn't exist, using the content from `@.claude/adr-kit/docs/templates/adr-index-template.md`.

## Step 5: Create CLAUDE.md

**If `CLAUDE.md` does not exist at the project root**: Create it with this content:

```markdown
@.claude/adr-kit/CLAUDE.base.md

---

# [Repo Name] Project

## Quick Commands

- Run: `[add your run command here]`
- Test: `[add your test command here]`
- Lint: `[add your lint command here]`

## Active Work

> No active ADRs.

## Architecture Overview

[Brief description of this repo's architecture and stack]

## Code Conventions

[Describe or link to stack-specific conventions]
- See `.claude/rules/` for loaded rules
```

**If `CLAUDE.md` already exists**: Do NOT overwrite it. Tell the user:
> `CLAUDE.md` already exists. Add this as the very first line to load the adr-kit base workflow:
> ```
> @.claude/adr-kit/CLAUDE.base.md
> ```
> Then review CLAUDE.md and remove content now covered by CLAUDE.base.md (workflow reminder, workflow principles, execution plan workflow, anti-patterns).

## Step 6: Create settings.json

**If `.claude/settings.json` does not exist**:
- Read `@.claude/adr-kit/settings.base.json`
- Write it to `.claude/settings.json`
- Based on the stacks detected in Step 3, add the appropriate tool permissions to the `allow` array:
  - Python/uv: `"Bash(python:*)"`, `"Bash(uv:*)"`, `"Bash(pytest:*)"`
  - Node/npm: `"Bash(node:*)"`, `"Bash(npm:*)"`, `"Bash(npx:*)"`
  - Node/pnpm: `"Bash(node:*)"`, `"Bash(pnpm:*)"`, `"Bash(npx:*)"`
  - Node/yarn: `"Bash(node:*)"`, `"Bash(yarn:*)"`
  - Node/bun: `"Bash(bun:*)"`
  - .NET: `"Bash(dotnet:*)"`
  - Also extend `Read`/`Edit`/`Write` globs to include stack file types (`.py`, `.ts`, `.cs`, etc.)
- Tell the user: "`.claude/settings.json` created with detected stack permissions. Review and adjust before committing."

**If `.claude/settings.json` already exists**: Skip. Tell the user to manually merge stack permissions from `.claude/adr-kit/settings.base.json` as needed.

## Report

After completing all steps:

```
adr-kit initialized!

Commands: [N] shims created in .claude/commands/
Base rules: [N] files copied to .claude/rules/
Convention rules generated:
  - [stack]: .claude/rules/[stack]-conventions.md
docs/ structure scaffolded
CLAUDE.md: [created | already exists — see manual instructions above]
settings.json: [created with [stack] permissions | already exists — no change]

Next steps:
1. Review generated convention rules in .claude/rules/ — adjust for your team's preferences
2. Fill in CLAUDE.md — repo name, Quick Commands, Architecture Overview
3. Review .claude/settings.json — add or remove permissions as needed
4. Commit everything:
   git add .claude/ docs/ CLAUDE.md
   git commit -m "chore: initialize adr-kit workflow"
```
