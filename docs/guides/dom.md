# Building the interface

`dom.ts` creates and changes DOM elements. It does not wrap them: every function takes and returns a
native `HTMLElement`, so everything you know about the DOM still applies.

```ts
import { uiComponent } from "./gtd/dom.js"
```

## Creating an element

`uiComponent(properties)` creates an element and applies every property you give it.

```ts
const title = uiComponent({ type: "h1", id: "app-title", text: "My new app" })
const subtitle = uiComponent({ type: "h2", classes: ["pretty", "subtitle"], text: "Hello!" })

document.body.append(title, subtitle)
```

```html
<h1 id="app-title">My new app</h1>
<h2 class="pretty subtitle">Hello!</h2>
```

### Properties

| Property | Type | Default | Effect |
|---|---|---|---|
| `type` | `string` | `"div"` | Tag name |
| `text` | `string` | `""` | Content, set as **`innerHTML`** |
| `id` | `string` | none | `id` attribute (left out when not given) |
| `classes` | `string[]` | none | Added to `classList` |
| `attributes` | `{ [name]: string }` | none | Set with `setAttribute` |
| `styles` | `{ [property]: string }` | none | Inline styles, camelCase names (`backgroundColor`) |
| `data` | `{ [key]: string }` | none | `data-*` attributes |
| `selectable` | `boolean` | selectable | `false` sets `user-select: none` |

> **Security:** `text` is HTML. Never pass text that comes from users or servers without escaping
> it; for plain text, create the element and set `element.textContent` instead.

### Styles

Handy for prototypes; prefer classes for anything that lasts.

```ts
const banner = uiComponent({
  text: "hello there!",
  styles: { width: "2rem", height: "1rem", background: "#222222", color: "#fafafa" },
})
```

### Attributes

```ts
const picture = uiComponent({ type: "img", attributes: { src: "./images/cat.png", alt: "A cat" } })
```

### Data

```ts
const section = uiComponent({ type: "section", data: { topic: "code", language: "typescript" } })
// <section data-topic="code" data-language="typescript"></section>
section.dataset.topic // "code"
```

## Changing an existing element

Every helper returns the element it was given, and does nothing when the element or the values are
`undefined`, so calls can be chained or nested.

| Add | Remove | Remove takes |
|---|---|---|
| `setDomAttributes(element, { name: value })` | `removeDomAttributes(element, ["name"])` | attribute names |
| `setDomClasses(element, ["a"])` | `removeDomClasses(element, ["a"])` | class names |
| `setDomStyles(element, { backgroundColor: "red" })` | `removeDomStyles(element, ["background-color"])` | CSS names (kebab-case) |
| `setDomDataset(element, { key: "v" })` | `removeDomDataset(element, ["key"])` | dataset keys |
| `setDomEvents(element, { click: handler })` | `removeDomEvents(element, { click: handler })` | the same handler functions |

```ts
const button = setDomClasses(uiComponent({ type: "button", text: "Save" }), ["primary"])

const onClick = () => console.log("saved")
setDomEvents(button, { click: onClick })
// later
removeDomEvents(button, { click: onClick })
```

To remove a listener you need the same function you added, so keep a reference to it.

## Removing elements from the page

```ts
removeDomById("toast")                  // removes #toast, if present
const removed = removeAllDomBySelector(".toast") // returns how many were removed
```

---

[← All the documentation](../README.md)
