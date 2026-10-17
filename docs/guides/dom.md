# Building the interface 🧱

**Module:** `dom.ts` · **Depends on:** nothing

Everything you see on a web page is an **element**: a title, a button, an image. `dom.ts` helps you
create elements and change them with less typing than plain JavaScript.

## In 30 seconds

```ts
import { uiComponent } from "./gtd/dom.js"

const hello = uiComponent({ type: "h1", text: "Hello!", classes: ["big"] })
document.body.appendChild(hello)
```

Result on the page:

```html
<h1 class="big">Hello!</h1>
```

## Why not just `document.createElement`?

You can! GTD only saves you the repetition. Compare:

```ts
// plain JavaScript
const link = document.createElement("a")
link.textContent = "Docs"
link.id = "docs-link"
link.classList.add("nav", "active")
link.setAttribute("href", "/docs")
link.dataset.section = "help"

// GTD
const link = uiComponent({
  type: "a",
  text: "Docs",
  id: "docs-link",
  classes: ["nav", "active"],
  attributes: { href: "/docs" },
  data: { section: "help" },
})
```

Both give you exactly the same `<a>` element.

## Creating an element

`uiComponent` takes **one object** describing the element. Every field is optional.

| Field | What it sets | Example | Default |
|---|---|---|---|
| `type` | The tag | `"button"` | `"div"` |
| `text` | What is inside (as HTML) | `"Save"` | empty |
| `id` | The `id` | `"save-button"` | none |
| `classes` | CSS classes | `["primary", "big"]` | none |
| `attributes` | Any HTML attribute | `{ href: "/home" }` | none |
| `styles` | Inline CSS, in camelCase | `{ backgroundColor: "red" }` | none |
| `data` | `data-*` attributes | `{ userId: "7" }` → `data-user-id="7"` | none |
| `selectable` | Can the user select its text? | `false` | `true` |

### Text

```ts
uiComponent({ type: "p", text: "A paragraph." })
uiComponent({ type: "p", text: "Some <strong>bold</strong> words." }) // HTML works
```

> ⚠️ **Never put text typed by users into `text`.** It is read as HTML, so a user could inject
> scripts into your page. For user text, set `textContent` after creating the element:
>
> ```ts
> const comment = uiComponent({ type: "p", classes: ["comment"] })
> comment.textContent = userInput // always shown as plain text, safe
> ```

### Classes

The usual way to style elements: write CSS in a stylesheet and add the class.

```ts
uiComponent({ type: "button", text: "Delete", classes: ["button", "danger"] })
```

### Attributes

Anything you would write inside the HTML tag:

```ts
uiComponent({ type: "img", attributes: { src: "./cat.png", alt: "A sleeping cat" } })
uiComponent({ type: "input", attributes: { type: "email", placeholder: "you@example.org" } })
uiComponent({ type: "a", text: "GTD", attributes: { href: "https://github.com/akrck02/gtd", target: "_blank" } })
```

### Inline styles

Good for quick experiments. Use the JavaScript names (`backgroundColor`, not `background-color`):

```ts
uiComponent({ text: "Warning!", styles: { color: "white", backgroundColor: "crimson", padding: "8px" } })
```

### Data attributes

Store small pieces of information on an element, and read them later with `dataset`:

```ts
const row = uiComponent({ type: "li", text: "Ada", data: { userId: "7" } })
row.dataset.userId // "7"
```

## Putting elements inside elements

`uiComponent` gives you a normal element, so use the normal `append`:

```ts
const card = uiComponent({ classes: ["card"] })
card.append(
  uiComponent({ type: "h2", text: "Ada Lovelace" }),
  uiComponent({ type: "p", text: "The first programmer." }),
)
document.body.append(card)
```

A good habit: write a small **function per piece** of interface. It is GTD's version of a
"component":

```ts
function userCard(name: string, bio: string): HTMLElement {
  const card = uiComponent({ classes: ["card"] })
  card.append(
    uiComponent({ type: "h2", text: name }),
    uiComponent({ type: "p", text: bio }),
  )
  return card
}

document.body.append(userCard("Ada", "First programmer"), userCard("Alan", "Codebreaker"))
```

## Reacting to clicks and other events

```ts
import { setDomEvents } from "./gtd/dom.js"

const button = uiComponent({ type: "button", text: "Click me" })

setDomEvents(button, {
  click: () => alert("Clicked!"),
  mouseenter: () => button.classList.add("hover"),
  mouseleave: () => button.classList.remove("hover"),
})
```

Any [DOM event](https://developer.mozilla.org/docs/Web/Events) name works: `click`, `input`,
`submit`, `keydown`…

To remove a listener later, you need the **same function**, so keep it in a variable:

```ts
const onClick = () => console.log("clicked")
setDomEvents(button, { click: onClick })
removeDomEvents(button, { click: onClick }) // works

removeDomEvents(button, { click: () => console.log("clicked") }) // ❌ a different function, nothing happens
```

## Changing an element after creating it

Each `set…` has a matching `remove…`. They all return the element, so you can chain them.

| To add | To remove | `remove` takes |
|---|---|---|
| `setDomClasses(el, ["active"])` | `removeDomClasses(el, ["active"])` | class names |
| `setDomAttributes(el, { disabled: "" })` | `removeDomAttributes(el, ["disabled"])` | attribute names |
| `setDomStyles(el, { color: "red" })` | `removeDomStyles(el, ["color"])` | CSS names: `"background-color"` |
| `setDomDataset(el, { state: "open" })` | `removeDomDataset(el, ["state"])` | dataset keys |
| `setDomEvents(el, { click: fn })` | `removeDomEvents(el, { click: fn })` | the same functions |

```ts
// show a button as "loading" while saving
setDomAttributes(button, { disabled: "" })
setDomClasses(button, ["loading"])

await save()

removeDomAttributes(button, ["disabled"])
removeDomClasses(button, ["loading"])
```

If you pass `undefined` instead of the element or the values, nothing happens — no errors.

## Removing elements from the page

```ts
import { removeDomById, removeAllDomBySelector } from "./gtd/dom.js"

removeDomById("welcome-banner")                   // the element with id="welcome-banner"
const count = removeAllDomBySelector(".toast")    // every element with class "toast"
console.log(`${count} toasts removed`)
```

Or on an element you already have: `element.remove()`.

## Full example: a counter

```ts
import { uiComponent, setDomEvents } from "./gtd/dom.js"

let count = 0

const label = uiComponent({ type: "p", text: "Clicked 0 times" })
const button = uiComponent({ type: "button", text: "+1" })

setDomEvents(button, {
  click: () => {
    count++
    label.textContent = `Clicked ${count} times`
  },
})

document.body.append(label, button)
```

## Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| The element is created but not visible | It was never added to the page | `parent.append(element)` |
| `styles: { "background-color": … }` does nothing | Inline styles use camelCase | `backgroundColor` |
| `removeDomStyles(el, ["backgroundColor"])` does nothing | Removing uses CSS names | `"background-color"` |
| Text with `<` shows weird or breaks the layout | `text` is HTML | Use `textContent` for plain text |

---

[← All the documentation](../README.md) · Next: [Views and routing →](router.md)
