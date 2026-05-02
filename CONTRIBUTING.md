# Contributing to adr-kit

Thanks for your interest in contributing. adr-kit is a shared workflow, so changes to base rules and commands affect every repo that uses it — a little upfront alignment goes a long way.

## Before You Open a PR

For anything beyond a typo fix or documentation tweak, open an issue first. Describe what you want to change and why. This gives us a chance to align on the approach before you spend time implementing it.

## What Makes a Good Contribution

- **Bug fixes** — a command does the wrong thing, a rule fires incorrectly, or a template section is broken
- **Workflow improvements** — a step is unclear, a gate is in the wrong place, or a missing step creates friction
- **New commands** — a workflow step that's currently done manually and would benefit from a `/adr-*` command
- **Template gaps** — a section that's missing from an ADR, execution plan, or other template
- **Stack templates** — new convention rule templates for additional languages or frameworks

## What Does Not Belong Here

- Company-specific tooling or integrations
- Rules that encode one team's opinions without broader applicability
- Automation that removes human approval gates (the gates are the point)

## Pull Request Guidelines

1. Keep PRs focused — one logical change per PR
2. Update documentation if the change affects how users set things up
3. Test your changes by adding adr-kit as a submodule in a real repo and running through the workflow
4. Reference the issue your PR addresses

## Reporting Bugs

Open a [GitHub issue](https://github.com/tiagoastak/adr-kit/issues) with:

- What you expected to happen
- What actually happened
- The command or rule involved
- Any relevant context (stack, Claude Code version)
