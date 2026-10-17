# Crypto

`crypto.ts` makes random identifiers.

```ts
import { uuidv4 } from "./gtd/crypto.js"

uuidv4() // "3b241101-e2bb-4255-8caf-4136c566a962"
```

`uuidv4()` returns an RFC 4122 version 4 UUID built from `crypto.getRandomValues`, so it is safe as
an identifier that must not be guessed. It works over plain `http://` too, unlike the native
`crypto.randomUUID()`, which needs a secure context.

---

[← All the documentation](../README.md)
