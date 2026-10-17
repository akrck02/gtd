# Icons ✨

**Module:** `icons.ts` · **Depends on:** `dom.ts`

Load a collection of SVG icons once, then draw any of them, at any size and colour, with one call.

## In 30 seconds

```ts
import { loadIcons, getIcon } from "./gtd/icons.js"

await loadIcons("ui", "./icons.json")
document.body.append(getIcon("ui", "home"))
```

## The collection file

A JSON file where each key is an icon name, and each value is what goes **inside** an `<svg>` tag,
drawn on a 24 × 24 grid:

```json
{
  "home": "<path d=\"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z\"/>",
  "close": "<path d=\"M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z\"/>"
}
```

> 💡 **Where do I get icons?** [Material Symbols](https://fonts.google.com/icons) and most icon
> sets use a 24 × 24 grid. Download an SVG, open it in a text editor, and copy what is **between**
> `<svg …>` and `</svg>` — usually one or more `<path …/>`. Remember to escape the quotes (`\"`)
> inside the JSON.

## Drawing icons

```ts
getIcon(collection, name, size?, fill?)
```

| Argument | Meaning | Default |
|---|---|---|
| `collection` | The id you gave to `loadIcons` | — |
| `name` | The key in the JSON file | — |
| `size` | Width and height | `"24px"` |
| `fill` | Colour | `"#222222"` |

It returns a `<div>` (a flex box that centres the icon) with the `<svg>` inside, or `undefined` if the collection or the icon doesn't
exist.

```ts
getIcon("ui", "close", "16px", "crimson")
getIcon("ui", "home", "2rem", "currentColor")
```

> 💡 Use **`"currentColor"`** as the colour: the icon then takes the text colour of its parent, so it
> follows your CSS, hover states and dark mode for free.

## An icon inside a button

```ts
const button = uiComponent({ type: "button", text: " Home", classes: ["with-icon"] })
button.prepend(getIcon("ui", "home", "18px", "currentColor"))
```

```css
.with-icon { display: inline-flex; align-items: center; gap: 4px; }
```

## Several collections

Give each collection its own id:

```ts
await loadIcons("ui", "./icons/ui.json")
await loadIcons("brands", "./icons/brands.json")

getIcon("brands", "github")
```

## Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| `getIcon` returns `undefined` | `loadIcons` not awaited, or a typo in the id or name | `await loadIcons(...)` first, check spelling |
| Icon is invisible | Same colour as the background | Pass a `fill`, or `"currentColor"` |
| Icon looks cut or tiny | The SVG was not drawn on a 24 × 24 grid | Use 24px icons, or edit `viewBox` in `icons.ts` |
| JSON fails to load | Unescaped quotes in the paths | Write `\"` inside the strings |

---

[← All the documentation](../README.md)
