# NgRx Signals — State Management Conventions

## Default: Use SignalStore for All New State

All new state in Angular apps and libraries **must** use `@ngrx/signals` (`signalStore`).
Do **not** create new `BehaviorSubject`-based service stores.

```ts
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export const ExampleStore = signalStore(
  { providedIn: 'root' },
  withState({ items: [] as string[], isLoading: false }),
  withComputed(({ items }) => ({
    count: computed(() => items().length)
  })),
  withMethods((store) => ({
    setLoading: (v: boolean) => patchState(store, { isLoading: v }),
    setItems: (items: string[]) => patchState(store, { items: [...items] })
  }))
);
```

## Version Alignment

`@ngrx/signals` major version **must match** the Angular major version of the consuming app/library:

| Angular | @ngrx/signals |
|---------|----------------|
| 20      | @20            |
| 21      | @21            |

Install: `npm i @ngrx/signals@{angular-major}`

## Observable -> SignalStore Migration Map

| Old Pattern | New Pattern | Notes |
|---|---|---|
| `BehaviorSubject<T>` | `withState<T>()` | State lives in the store |
| `.pipe(map(...))` | `withComputed(() => ...)` | Derived state inside the store |
| `combineLatest([a$, b$])` | `withComputed(() => fn(a(), b()))` | Signals auto-track dependencies |
| `.next(value)` | `patchState({ key: value })` | Always immutable updates |
| `async` pipe in templates | Direct `{{ store.prop() }}` | Signals are synchronous |
| `.subscribe()` + unsubscribe | `withHooks` + `effect()` | Signals clean up automatically |

## Migrating Existing Stores

Two mandatory rules:

1. **Creating a new store?** It **must** use `signalStore`. No exceptions.
2. **Touching an existing store** (adding a feature, fixing a bug, refactoring)? **Migrate it to `signalStore`** as part of that same piece of work.

Do not leave a `BehaviorSubject`-based store behind when you are already inside it making changes.

**Only exception**: if migration would require touching a large number of unrelated consumers and risks regressions well outside the scope of the current ticket, open a dedicated tech-debt ticket to track it and leave the store as-is for now. This must be a conscious, documented decision — not a default.

Use the **bridge service pattern** to migrate without touching every consumer at once:

```ts
// Bridge service — drop-in replacement, zero consumer churn
@Injectable({ providedIn: 'root' })
export class FeatureStoreBridgeService {
  private store = inject(FeatureStore);

  isLoading = this.store.isLoading;           // signal
  setLoading = (v: boolean) => this.store.setLoading(v);

  isLoading$ = toObservable(this.store.isLoading); // for legacy Observable consumers
}
```

## Bridging Signals and Observables

```ts
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

// Signal -> Observable (expose to legacy RxJS consumers)
readonly isLoading$ = toObservable(this.store.isLoading);

// Observable -> Signal (HTTP/async boundaries in components)
readonly data = toSignal(this.http.get<Item[]>('/api/items'), { initialValue: [] });
```

## Testing

- **New stores**: standard unit tests — test methods, computed values, and state transitions directly.
- **Migrated stores using bridge service**: run only component + store tests for the touched areas. If tests pass, no additional regression scope required.

## Anti-Patterns

- Creating new `BehaviorSubject` stores — use `signalStore` instead
- Leaving a `BehaviorSubject` store unchanged when you are already modifying it — migrate it
- Mutating state directly — always use `patchState`
- Using `async` pipe in templates for signal-backed state — read the signal directly
- Big-bang migration of all stores at once — use the bridge service to migrate incrementally
- Subscribing to signals manually — use `effect()` or `withHooks` inside the store
