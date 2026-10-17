# Contributing and testing

## Layout

```
src/        the library, one module per file
test/       unit tests, one file per module (dom.test.ts tests dom.ts)
docs/       this documentation, published to GitHub Pages
```

## Setting up

```sh
npm install
npm test        # runs every unit test once
npx vitest      # runs them again on each change
npm run build   # type checks and compiles src/ into temp/
```

Tests use [Vitest](https://vitest.dev/) with [happy-dom](https://github.com/capricorn86/happy-dom),
a fake browser, so they run in Node without opening one.

## Writing a test

```ts
import { describe, expect, it, vi } from "vitest"
import { uiComponent } from "../src/dom"

describe("uiComponent", () => {
  it("creates a div by default", () => {
    expect(uiComponent({}).tagName).toBe("DIV")
  })
})
```

Some habits that keep the suite reliable:

- **Network:** never call a real server. Replace `fetch` with `vi.stubGlobal("fetch", vi.fn(…))` and
  undo it with `vi.unstubAllGlobals()`.
- **Module state:** `router.ts` and `i18n.ts` keep state between calls. Use `vi.resetModules()` and
  import the module again in `beforeEach` to start each test clean.
- **Browser answers:** fake `matchMedia` and `navigator.userAgent` with `vi.spyOn`, as in
  `test/browser.test.ts`.

## Conventions

- Every exported function has a JSDoc comment.
- Compare with the constant first: `undefined == value`, `false == buffer.has(id)`.
- A module imports its siblings with `.js` (`./dom.js`) so the output runs in browsers unchanged.
- A new module gets a test file and a page in `docs/`, linked from `docs/README.md`.

## Documentation

The `docs/` folder is published with [papiro](https://github.com/akrck02/papiro) by
`.github/workflows/publish-docs.yaml` on every push to `main`. Link pages with relative `.md` links:
they work on GitHub and papiro turns them into site links.

GitHub Pages must serve the `gh-pages` branch: **Settings → Pages → Deploy from a branch →
`gh-pages` / root**.

---

[← All the documentation](README.md)
