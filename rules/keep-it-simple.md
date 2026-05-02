# Rule: Keep It Simple (KISS)

## Principle

Prefer the simplest solution that solves the problem in front of you. Complexity must be earned — by a real, present requirement, not an imagined future one.

**When in doubt, do less.** A boring, obvious implementation beats a clever, flexible one every time.

## Why This Matters

- **Readability**: Simple code can be understood by the next person without a tour guide.
- **Maintainability**: Every abstraction, option, and indirection is a surface that can break, drift, or mislead.
- **Velocity**: Simple code is faster to change when requirements actually shift — which they will, in ways you didn't predict.
- **Debuggability**: Fewer layers means fewer places the bug can hide.

## How to Apply

### Heuristics

1. **YAGNI — You Aren't Gonna Need It.** Don't build for requirements that don't exist yet. Add the option, parameter, or extension point when a second caller genuinely needs it, not before.
2. **Rule of Three.** Don't abstract on the first occurrence. Don't abstract on the second. On the third, consider it — the shape of the real abstraction is usually only visible by then.
3. **Flat beats nested.** A flat sequence of steps is almost always clearer than a hierarchy of helpers, wrappers, and base classes.
4. **Concrete beats generic.** A function named `sendChatMessage` that does one thing is better than a `MessageDispatcher<T>` that does anything.
5. **Delete before you add.** Before introducing a new layer, check whether an existing one can be simplified or removed.

### Bad — Speculative Flexibility

Built for requirements that don't exist. A strategy pattern, a factory, and a config object — all to send a single kind of message.

```typescript
interface MessageStrategy<T> {
  send(payload: T, options: MessageOptions): Promise<MessageResult>;
}

class ChatMessageStrategy implements MessageStrategy<ChatPayload> {
  send(payload: ChatPayload, options: MessageOptions) { ... }
}

class MessageDispatcherFactory {
  create<T>(kind: MessageKind): MessageStrategy<T> { ... }
}

// Caller
const dispatcher = factory.create<ChatPayload>('chat');
await dispatcher.send(payload, { retry: true, timeout: 5000 });
```

Problems:
- There is only one strategy. The interface exists for imaginary future ones.
- The factory adds indirection with no current value.
- `MessageOptions` has fields no caller uses yet.
- A new contributor must read three files to understand one call.

### Good — Solve the Problem You Have

```typescript
async sendChatMessage(payload: ChatPayload): Promise<MessageResult> {
  const response = await this.http.post('/chat', payload);
  return response.data;
}
```

Why this works:
- One function, one purpose, readable in five seconds.
- If a second message type appears later, you can extract the shared shape then — with real information about what varies.
- No interface, no factory, no options bag polluting the codebase until something actually needs them.

## Signals That You're Over-Engineering

- You're adding an interface with a single implementation.
- You're adding a parameter "in case someone needs it later."
- You're introducing a generic type parameter that's always the same concrete type at call sites.
- You're writing a base class before the second subclass exists.
- You're adding configuration for behaviour no user has asked to configure.
- You hear yourself say "this will make it easier when we..." — and the "when" is hypothetical.

## Checklist Before Merging

1. Can I remove a layer without losing functionality? If yes, remove it.
2. Is every parameter, option, and branch used by a real caller today? If not, delete it.
3. Could a new contributor understand this in one read? If not, simplify.
4. Am I solving the problem in the ticket, or a problem I'm imagining? Only the ticket counts.

## Relationship to Other Rules

- **`separate-concerns.md`**: Separating concerns means splitting when a function does two jobs — not creating abstractions for jobs that don't exist yet. KISS is the counterweight that stops separation from becoming fragmentation.

## Scope

Applies to all code: components, services, stores, utilities, tests. The principle is language-agnostic.
