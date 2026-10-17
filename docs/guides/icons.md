# Icons

`icons.ts` loads collections of SVG icons from JSON files and draws them as elements.

```ts
import { loadIcons, getIcon } from "./gtd/icons.js"
```

## The collection file

A JSON object whose keys are icon names and whose values are the **inside** of an `<svg>` drawn on a
24 × 24 grid (the format of Material Symbols and most icon sets):

```json
{
  "home": "<path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"/>",
  "close": "<path d=\"M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z\"/>"
}
```

## Drawing an icon

```ts
await loadIcons("material", "./icons/material.json")

const home = getIcon("material", "home")                       // 24px, #222222
const close = getIcon("material", "close", "16px", "currentColor")
button.appendChild(close)
```

`getIcon(collection, name, size?, fill?)` returns a `div` holding the `svg`, or `undefined` when the
collection or icon is unknown. Use `"currentColor"` as the fill so icons follow the text colour and
dark mode.

---

[← All the documentation](../README.md)
