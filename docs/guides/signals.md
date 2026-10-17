# Signals

A **signal** lets one part of the application announce that something happened, and any number of
other parts react, without importing each other. It is the observer pattern, the same idea as
signals in Godot or GTK.

```ts
import { setSignal, connectToSignal, emitSignal } from "./gtd/signals.js"
```

## Create, connect, emit

```ts
// events.ts — one place that owns the signals
export const userLoggedIn = setSignal() // returns a unique id

// header.ts
connectToSignal(userLoggedIn, async user => { greeting.textContent = `Hi ${user.name}` })

// sidebar.ts
connectToSignal(userLoggedIn, async () => sidebar.classList.add("visible"))

// login.ts
await emitSignal(userLoggedIn, { name: "Ada" })
```

## Behaviour

| Situation | What happens |
|---|---|
| Several handlers | Called in the order they were connected |
| Emitting a signal nobody created | Nothing |
| Connecting to a signal nobody created | Logged with `console.error`, ignored |
| A slow handler | Not awaited: `emitSignal` starts every handler and returns |

Handlers run in the same tick, so `emitSignal` is safe to call from event listeners. There is no
`disconnect` yet: connect long-lived parts of the app, not views that come and go.

---

[← All the documentation](../README.md)
