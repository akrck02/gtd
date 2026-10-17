# Crypto 🔑

**Module:** `crypto.ts` · **Depends on:** nothing

Create random, unique identifiers.

## In 30 seconds

```ts
import { uuidv4 } from "./gtd/crypto.js"

const id = uuidv4() // "3b241101-e2bb-4255-8caf-4136c566a962"
```

## When to use it

Whenever you create something on the page that needs an id before the server gives it one:

```ts
const note = { id: uuidv4(), text: "Buy milk" }
```

Every call gives a new value; the chance of two being equal is so small you can ignore it.

## Good to know

- It follows the standard UUID version 4 format, which databases and servers understand.
- It uses the browser's secure random generator, so ids can't be guessed.
- Unlike the browser's `crypto.randomUUID()`, it also works on plain `http://` addresses, for
  example on your local network while developing.

---

[← All the documentation](../README.md)
