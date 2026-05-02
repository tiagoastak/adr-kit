---
description: Submit feedback or a bug report to the adr-kit GitHub repository
---

Submit feedback for adr-kit: $ARGUMENTS

## Step 1: Gather Context

Collect the following silently before doing anything else:

```bash
# Which repo is giving feedback
basename $(git rev-parse --show-toplevel)

# Which adr-kit commit/branch is in use
cd .claude/adr-kit && git rev-parse --abbrev-ref HEAD && git rev-parse --short HEAD && cd ../..

# What commands/rules are present
ls .claude/commands/ 2>/dev/null
ls .claude/rules/ 2>/dev/null
```

## Step 2: Check for Similar Existing Issues

Search open issues in the adr-kit repo:

```bash
gh issue list --repo tiagoastak/adr-kit --state open --limit 50 --json number,title,body,labels
```

Read the returned issues. Compare their titles and bodies against `$ARGUMENTS` to find semantic matches — not just keyword matches. Consider an issue similar if it describes the same root problem, workflow gap, or broken behaviour, even if worded differently.

**If a similar issue is found**:
- Tell the user: "A similar issue already exists: #NNN — [title] ([url])"
- Ask: "Should I add your feedback as a comment on that issue, or create a separate one?"
- If the user says add as comment -> go to Step 4 (Comment)
- If the user says create new -> go to Step 3 (Create)

**If no similar issue is found** -> go to Step 3 (Create)

## Step 3: Create a New Issue

Compose an augmented issue from the raw feedback. Do not just paste `$ARGUMENTS` verbatim — enrich it:

**Title**: Derive a clear, concise title (under 70 characters) that names the problem or request specifically.

**Body**: Structure as follows:

```markdown
## Feedback

[Restate $ARGUMENTS clearly and completely — fix grammar, expand abbreviations,
add any context that was implicit. Preserve the user's intent exactly.]

## Context

- **Repo**: [detected repo name]
- **adr-kit branch/commit**: [detected branch] @ [detected short hash]
- **Category**: [infer: Bug | Workflow gap | Command request | Rule issue | Template gap | Question]
- **Affected area**: [infer: which command(s), rule(s), or workflow step(s) this touches]

## Steps to Reproduce (if a bug)

[If the feedback describes a bug or unexpected behaviour, infer and describe
the likely reproduction steps. Mark as "inferred — please correct if wrong".]

## Expected vs Actual (if a bug)

**Expected**: [what should happen]
**Actual**: [what actually happened]

## Suggested fix or improvement (if applicable)

[If the feedback implies a solution, summarise it here.]
```

**Labels**: Infer appropriate labels:
- `bug` — something broken or incorrect
- `enhancement` — improvement to existing behaviour
- `new-command` — request for a new adr-* command
- `rules` — relates to a rule file
- `templates` — relates to a template
- `documentation` — relates to README or workflow guide
- `question` — unclear or needs discussion

Run:
```bash
gh issue create \
  --repo tiagoastak/adr-kit \
  --title "[composed title]" \
  --body "[composed body]" \
  --label "[inferred labels]"
```

Show the user the composed title and body **before** creating. Ask: "Does this look right? I'll create the issue." Wait for confirmation.

## Step 4: Add a Comment to an Existing Issue

Compose a comment that adds value — do not just repeat what the issue already says:

```markdown
## Additional feedback from [detected repo name]

[Restate $ARGUMENTS clearly. Explain how this user's experience
relates to or differs from the existing issue. Add any new details
that weren't in the original issue.]

**adr-kit version**: [branch] @ [short hash]
```

Run:
```bash
gh issue comment [issue-number] \
  --repo tiagoastak/adr-kit \
  --body "[composed comment]"
```

Show the user the composed comment **before** posting. Ask: "Does this look right? I'll add it to #NNN." Wait for confirmation.

## Step 5: Report

After creating or commenting:

```
Feedback submitted!

Issue: #NNN — [title]
URL: https://github.com/tiagoastak/adr-kit/issues/NNN
Action: [Created new issue | Added comment to existing issue]
```
