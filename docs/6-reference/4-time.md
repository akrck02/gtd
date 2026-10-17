# Time ⏱️

**Module:** `time.ts` · **Depends on:** nothing

Wait some milliseconds inside an `async` function.

## In 30 seconds

```ts
import { sleep, sleepIf } from "./gtd/time.js"

status.textContent = "Saved ✓"
await sleep(2000)              // wait two seconds
status.textContent = ""
```

## The functions

| Function | What it does |
|---|---|
| `await sleep(ms)` | Waits `ms` milliseconds |
| `await sleepIf(ms, condition)` | Waits `ms` milliseconds only if `condition` is `true`; otherwise continues at once |

`sleepIf` is handy for things that should be skippable:

```ts
const animate = !prefersReducedMotion()

for (const item of items) {
  list.append(item)
  await sleepIf(80, animate) // a little cascade, unless the user asked for less motion
}
```

> 💡 `sleep` pauses only **your** function: the page keeps responding to clicks and scrolls while
> it waits.

---

[← All the documentation](../1-overview.md)
