# Rule: Surgical Changes

Touch only what you must. Clean up only your own mess.

## When Editing Existing Code

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code or issues, **mention them — don't fix them.**

## When Your Changes Create Orphans

- Remove imports, variables, and functions that **your changes** made unused.
- Don't remove pre-existing dead code unless explicitly asked.

## The Test

Every changed line should trace directly to the user's request. If you can't explain why a line changed in terms of the task, revert it.

## Why This Matters

Unrelated changes in a diff make review harder, obscure intent, and introduce risk. A PR that fixes one thing should fix exactly one thing. Opportunistic cleanup belongs in its own commit or ticket.
