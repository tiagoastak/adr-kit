# Rule: Separate Concerns — One Function, One Job

## Principle

If describing a function requires the word "and," split it. The two most common offenders: core logic tangled with error handling, and queries that secretly mutate state. A function's name is its contract — it should do exactly that, nothing more.

## Pattern 1: Let It Throw, Catch at the Boundary

Inner steps throw on failure. A thin outer function catches and decides what to do. The algorithm stays flat; error routing lives in one place.

### Bad — validation tangled with logic

```typescript
sendMessage(msg) {
  const sender = verifySession(msg.token);
  if (sender !== null) {
    const channel = resolveChannel(msg.to);
    if (channel.active) {
      const content = moderate(msg.text);
      if (content.ok) {
        broadcast(channel, sender, content);
        return "sent";
      } else {
        return "blocked";
      }
    } else {
      return "closed";
    }
  } else {
    return "expired";
  }
}
```

The pipeline (verify -> resolve -> moderate -> broadcast) is buried in nesting, every new step adds a level, and error shapes are inconsistent.

### Good — algorithm flat, errors at the edge

```typescript
sendMessage(msg) {
  try {
    deliverMessage(msg);
  } catch (error) {
    notifySender(msg.token, error);
  }
}

deliverMessage(msg) {
  const sender = verifySession(msg.token);
  const channel = resolveChannel(msg.to);
  const content = moderate(msg.text);
  broadcast(channel, sender, content);
}
```

Each inner function owns its own failure mode (`verifySession` throws `"expired"`, `moderate` throws `"blocked"`). Adding a step is one line.

## Pattern 2: No Hidden Side Effects

If a function computes or checks something, it returns a result and does nothing else. If it performs a side effect, that is its sole purpose. Never mix the two — hidden mutations behind a query name are invisible at the call site.

### Bad — side effect hidden inside a check

```typescript
checkPassword(password) {
  if (password === this.storedPassword) {
    this.userState = 'authenticated';   // hidden mutation
    Session.initialize();               // hidden external call
    return true;
  }
  return false;
}
```

The name says "check" but the function authenticates. A caller wiring up a "confirm password" field will accidentally log the user in. Testing the comparison requires mocking `Session`.

### Good — pure check, explicit command at the call site

```typescript
checkPassword(password) {
  return password === this.storedPassword;
}

login(password) {
  if (!this.checkPassword(password)) {
    throw new AuthenticationError('invalid-credentials');
  }
  this.userState = 'authenticated';
  Session.initialize();
}
```

`checkPassword` is a pure query — safe for any caller. `login` is an explicit command, and all its effects are visible in one place. New side effects (audit logging, metrics) go in `login`, not hidden inside a utility.

## Checklist

1. Can I describe this function without "and"? If not, split it.
2. Is the happy path inside nested conditionals? Flatten it; let steps throw.
3. Do success and error returns have different shapes? Move errors to a catch.
4. Does the function change state or call external services beyond what its name promises? Extract those — the caller owns them.
5. Would a caller be surprised by what this function does? If the name doesn't tell the full story, it's doing too much.

Applies to every language and layer — services, utilities, controllers, data access. Queries are queries, commands are commands, algorithms are algorithms, errors are errors.
