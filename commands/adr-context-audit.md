---
description: Audit your Claude Code setup for token waste and context bloat. Starts by running /context to see real overhead, then audits MCP servers, plugins, CLAUDE.md rules (including @-imports), commands, skills, settings, and file permissions. Returns a health score with specific fixes.
---

# Usage Audit

Bloated context costs more and produces worse output. This command finds
the waste and tells you what to cut.

## Step 1: Get /context Data

Check the conversation history for /context output. If the user already
ran /context in this session, use that data. If not, ask:

"Run /context in this session terminal and let me know when you're done. I can't run
slash commands myself, but once I can see the breakdown I'll audit
everything it flags."

STOP HERE. Do NOT proceed to Step 2 until the user has run /context. The context breakdown determines
what to audit and in what order. Without it, the audit is guessing.
Output the message above and wait for the user's next message.

## Step 2: Audit What's Bloated

Based on the /context output, audit each category from largest to
smallest. Run checks in parallel where possible.

### MCP Servers & Plugins

Each MCP server loads full tool definitions into context every turn
(~15,000-20,000 tokens each). Plugins loaded via `enabledPlugins` in
settings.json behave the same way — each active plugin injects a skill
router and tool definitions on every turn.

- Count traditional MCP servers from `mcpServers` in settings.json
- Count enabled plugins from `enabledPlugins` in `~/.claude/settings.json`
- Flag any with CLI alternatives (Playwright, GitHub all have CLIs that cost
  zero tokens when idle)
- Report total MCP/plugin overhead from /context output

### CLAUDE.md

Read all CLAUDE.md files (project root, `.claude/`, `~/.claude/`).
Follow `@`-imports: when a CLAUDE.md contains lines like
`@.claude/adr-kit/CLAUDE.base.md`, read and count those imported files
too — they are injected verbatim and count fully toward context overhead.
Report line counts per file and the combined total.

Then read every rule across all files (including imported ones) and test
against five filters:

| Filter | Flag when... |
|--------|-------------|
| Default | Claude already does this without being told ("write clean code", "handle errors") |
| Contradiction | Conflicts with another rule in same or different file |
| Redundancy | Repeats something already covered elsewhere |
| Bandaid | Added to fix one bad output, not improve outputs generally |
| Vague | Interpreted differently every time ("be natural", "use good tone") |

If the combined line count across all CLAUDE.md files and imports > 200,
check for progressive disclosure opportunities: rules that only apply to
specific tasks (API conventions, deployment steps, testing guidelines)
should move to reference files with one-line pointers. Only recommend
splitting when the file is actually bloated — a lean CLAUDE.md with
universal context is fine as a single file.

### Commands & Skills

Commands in `.claude/commands/*.md` and `adr-kit/commands/*.md` are
loaded into context when invoked and can themselves be significant in size.
Scan all command files and all `.claude/skills/*/SKILL.md` files.

For each file:
- Count lines (flag > 200, critical > 500)
- Run the same five filters on instructions
- Check for restated goals, hedging ("you may want to"), synonymous
  instructions ("be concise" + "keep it short" + "don't be verbose")

### Settings

Check both settings files and report which file each setting is found in:

- **Project**: `.claude/settings.json`
- **User**: `~/.claude/settings.json`

| Setting | Flag if | Recommended |
|---------|---------|-------------|
| autocompact_percentage_override | Missing or > 80 | 75 |
| BASH_MAX_OUTPUT_LENGTH (env) | Missing or < 150000 | 150000 |

### File Permissions

Check `permissions.deny` in `.claude/settings.json`. In a monorepo, deny
rules must use `**/` prefix patterns to cover nested repositories — a rule
like `Read(node_modules/**)` only blocks the root, while
`Read(**/node_modules/**)` blocks all nested copies. Flag any rules missing
the `**/` prefix when the project is a monorepo.

If deny rules are missing entirely, check whether bloat directories exist:

| If this exists... | Should deny... |
|-------------------|---------------|
| package.json | `**/node_modules/**`, `**/dist/**`, `**/build/**`, `**/.next/**`, `**/coverage/**` |
| Cargo.toml | `**/target/**` |
| go.mod | `**/vendor/**` |
| pyproject.toml / requirements.txt | `**/__pycache__/**`, `**/.venv/**`, `**/*.egg-info/**` |

## Step 3: Score and Report

Score starts at 100. Deduct per issue:

| Issue | Points |
|-------|--------|
| CLAUDE.md + imports > 200 lines combined | -10 |
| CLAUDE.md + imports > 500 lines combined | -20 |
| Per 5 rules flagged by filters | -5 |
| Contradictions between files | -10 |
| Missing autocompact override | -10 |
| Missing bash output override | -5 |
| Command or skill file > 200 lines | -5 each |
| Command or skill file > 500 lines | -10 each |
| Per MCP server | -3 each |
| Per enabled plugin | -2 each |
| No deny rules + bloat dirs exist | -10 |
| Monorepo deny rules missing `**/` prefix | -5 |

Floor at 0. Output this format:

```
# Usage Audit

Score: {N}/100 [{CLEAN|NEEDS WORK|BLOATED|CRITICAL}]

## Context Breakdown (from /context)
{Paste the key numbers from /context output}

## Issues Found

### [{CRITICAL|WARNING|INFO}] {Category}
{What's wrong}
Fix: {One-line actionable fix}

### Rules to Cut
{Each flagged rule: the text, which filter, one-line reason}

### Conflicts
{Contradictions between files, with paths}

## Top 3 Fixes
1. {Highest-impact fix}
2. {Second}
3. {Third}
```

Score labels: 90-100 CLEAN, 70-89 NEEDS WORK, 50-69 BLOATED, 0-49 CRITICAL.
Severity: CRITICAL > 10pts, WARNING 5-10pts, INFO < 5pts.

## Step 4: Offer to Fix

After the report:

"Want me to fix any of these? I can:
- Show you a cleaned-up CLAUDE.md with the flagged rules removed
- Add or correct settings.json configs
- Fix permissions.deny rules for build artifacts (including monorepo `**/` prefixes)
- Show which commands or skills to trim"

Auto-apply settings.json and permissions.deny fixes (safe, reversible).
Show diffs for CLAUDE.md and skill/command files — let the user confirm
before modifying instruction files.
