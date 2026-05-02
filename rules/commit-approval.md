# Commit Approval Workflow

## CRITICAL RULE: Never Commit Without Explicit Approval

### Before ANY git commit:
1. Make changes
2. Run: `git diff` or `git status --short`
3. Show output to the architect
4. Ask: "Should I commit this?" or "Does this look correct?"
5. WAIT for explicit "yes" / "commit it" / "looks good"
6. Only then: `git add` + `git commit`

### What counts as approval:
- "yes, commit it"
- "looks good, proceed"
- "commit and continue"
- "go ahead"
- "commit"

### What does NOT count as approval:
- Silence
- "that looks right" (without "commit")
- Asking "should I commit?" without an answer
- "seems fine" (ambiguous)
- Passing tests (tests passing is not approval to commit)

### If the architect says "hold on" or "wait":
- STOP immediately
- Do NOT commit
- Wait for feedback

### Exception:
NONE. There are no exceptions. Even if you think it's obviously correct, ALWAYS wait for approval.

## Why This Rule Exists

Committing without review:
- Breaks the trust-building process
- Prevents catching issues early
- Makes git history harder to understand
- The architect loses control over when changes are committed

## Session Start Protocol

When starting work:
1. Load this file
2. State: "Loaded commit-approval.md — I will wait for explicit approval before committing"
3. Proceed with work
4. Before ANY commit: show diff, ask, WAIT

## Violation Recovery

If you commit without approval:
1. Acknowledge the mistake immediately
2. Offer to undo (`git reset HEAD~1`)
3. Wait for a decision
4. Re-read this file to reinforce the rule
