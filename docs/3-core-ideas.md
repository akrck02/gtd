# How GTD thinks 🧠

GTD is small on purpose. **Six ideas** explain how every module behaves. Once you know them, you
can guess how most of the library works before reading about it.

| | Idea | In one line |
|---|---|---|
| 1 | Everything is the real thing | A GTD button *is* a `<button>` |
| 2 | Nothing to install | One builder, no Node.js, no `node_modules` |
| 3 | One file, one job | Take the modules you need, leave the rest |
| 4 | Functions, not classes | Call a function, pass an object, done |
| 5 | You draw, GTD doesn't re-draw | No magic: you decide what changes on screen |
| 6 | Quiet when things are missing | Missing pieces never crash your page |

---

## 1. Everything is the real thing 🧱

GTD is a **power drill**, not a robot. It makes the job faster, but you are still the one holding
the tool, and you can see exactly what it does. It never hides the browser from you.

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

---

## 2. Nothing to install 🎒

Travel light: GTD fits in your backpack.

No Node.js, no npm, no `node_modules`. GTD is a folder of `.ts` files, and
[esbuild](https://esbuild.github.io) — one program, one command — turns your app into one `.js`
file. Your project has no dependencies that can break, go out of date or need updating.

---

## 3. One file, one job 🧰

Like a **toolbox**: you take the screwdriver, not the whole box.

Each module lives in its own file and does one thing: `dom.ts` builds elements, `router.ts` picks
pages, `http.ts` talks to servers. Import only what you use:

```ts
import { uiComponent } from "./gtd/dom.js"
import { httpGet } from "./gtd/http.js"
```

You can even delete the modules you don't need from your copy.

---

## 4. Functions, not classes 🍳

Like a **recipe**: *take this, do that*. No family tree of objects to learn first.

There are no classes to extend and no lifecycle to learn. You call functions and pass plain
objects (the few helpers grouped in a class, like `Shortcuts`, are used the same way, with no
`new`):

```ts
uiComponent({ type: "h1", text: "Hi" })
httpPost({ url: "/api/notes", parameters: { text: "Buy milk" } })
setRoute("/notes", showNotes)
```

---

## 5. You draw, GTD doesn't re-draw 🎨

A **whiteboard**, not a smart screen: when something changes, you wipe it and draw it again. A bit
more work, and never a surprise.

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

---

## 6. Quiet when things are missing 🤫

Like a good **waiter**: if the dish you ordered is not available, you get told politely — the
restaurant doesn't burn down.

GTD prefers doing nothing over crashing your page:

| Situation | What GTD does |
|---|---|
| `setDomClasses(element, undefined)` | Returns the element unchanged |
| `getText("bundle", "missing-key")` | Returns `""` |
| `getIcon("icons", "missing")` | Returns `undefined` |
| A route nobody registered | Shows the "not found" view |

When something does not show up, check the browser console: GTD writes a warning there when it
can.

---

## A few words you will see 📖

| Word | Meaning |
|---|---|
| **Element** | A piece of the page, like `<h1>` or `<button>`. In code, an `HTMLElement`. |
| **Module** | A `.ts` file that exports functions. |
| **esbuild** | The program that turns your `.ts` files into one `.js` file for the browser. |
| **View** | A function that draws one page into a container. |
| **Route** | An address, like `/user/7`, linked to a view. |
| **Signal** | A named event that several parts of the app can listen to. |
| **Bundle** | A JSON file with the texts of one part of the app, in one language. |
| **`async` / `await`** | How JavaScript waits for slow things (network, files) without freezing the page. Most GTD functions that touch the network are `async`, so put `await` in front of them. |

---

[← All the documentation](1-overview.md) · Next: [The GTD quest →](4-the-quest.md)
