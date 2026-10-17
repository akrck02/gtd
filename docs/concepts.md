# How GTD thinks 🧠

GTD is small on purpose. Five ideas explain how every module behaves. Once you know them, you can
guess how most of the library works before reading about it.

## 1. Everything is the real thing

GTD never hides the browser from you.

- `uiComponent` returns an **`HTMLElement`**, the same object `document.createElement` gives you.
- `httpGet` returns the same **`Response`** that `fetch` gives you.
- Settings are stored in **`localStorage`**.

So anything you find on [MDN](https://developer.mozilla.org) or Stack Overflow still works:

```ts
const button = uiComponent({ type: "button", text: "Save" })
button.disabled = true       // plain DOM
button.focus()               // plain DOM
button.textContent = "Saved" // plain DOM
```

## 2. One file, one job

Each module lives in its own file and does one thing: `dom.ts` builds elements, `router.ts` picks
pages, `http.ts` talks to servers. Import only what you use:

```ts
import { uiComponent } from "./gtd/dom.js"
import { httpGet } from "./gtd/http.js"
```

You can even delete the modules you don't need from your copy.

## 3. Functions, not classes

There are no classes to extend and no lifecycle to learn. You call functions and pass plain
objects:

```ts
uiComponent({ type: "h1", text: "Hi" })
httpPost({ url: "/api/notes", parameters: { text: "Buy milk" } })
setRoute("/notes", showNotes)
```

## 4. You draw, GTD doesn't re-draw

GTD does **not** watch your data. When something changes, you update the element yourself, or draw
the page again:

```ts
let count = 0
const counter = uiComponent({ type: "p", text: "0" })
const button = uiComponent({ type: "button", text: "+1" })

setDomEvents(button, {
  click: () => {
    count++
    counter.textContent = `${count}` // you decide what changes
  },
})
```

This is a bit more typing than in big frameworks, but there is no magic: what you see in your code
is exactly what happens on screen.

## 5. Quiet when things are missing

GTD prefers doing nothing over crashing your page:

| Situation | What GTD does |
|---|---|
| `setDomClasses(element, undefined)` | Returns the element unchanged |
| `getText("bundle", "missing-key")` | Returns `""` |
| `getIcon("icons", "missing")` | Returns `undefined` |
| A route nobody registered | Shows the "not found" view |

When something does not show up, check the browser console: GTD writes a warning there when it
can.

## A few words you will see

| Word | Meaning |
|---|---|
| **Element** | A piece of the page, like `<h1>` or `<button>`. In code, an `HTMLElement`. |
| **Module** | A `.ts` file that exports functions. |
| **View** | A function that draws one page into a container. |
| **Route** | An address, like `/user/7`, linked to a view. |
| **Signal** | A named event that several parts of the app can listen to. |
| **Bundle** | A JSON file with the texts of one part of the app, in one language. |
| **`async` / `await`** | How JavaScript waits for slow things (network, files) without freezing the page. Most GTD functions that touch the network are `async`, so put `await` in front of them. |

---

[← All the documentation](README.md) · Next: [A tour of GTD →](tour.md)
