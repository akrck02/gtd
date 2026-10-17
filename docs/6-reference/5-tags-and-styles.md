# HTML tags and Bubble UI 🏷️

**Modules:** `html.ts`, `bubble.ts` · **Depend on:** nothing · **Stylesheet:** `styles/bubbleui-v3.0.0.css`

Two lists of names, so your editor can autocomplete them and typos become errors — and the
stylesheet that makes GTD apps look good with almost no CSS.

## Bubble UI in 30 seconds

Link the stylesheet in `index.html`:

```html
<link rel="stylesheet" href="./styles/bubbleui-v3.0.0.css">
```

and use its classes:

```ts
import { BubbleUI } from "./gtd/bubble.js"

const card = uiComponent({ classes: [BubbleUI.Surface1, BubbleUI.BoxColumn], styles: { padding: "1rem" } })
card.append(
  uiComponent({ type: "h2", text: "Welcome" }),
  uiComponent({ type: "button", text: "Start", classes: [BubbleUI.Primary] }),
)
```

## What the stylesheet gives you for free

Without adding any class:

- A clean base: margins reset, the system font, a soft grey background.
- **Buttons** rounded like pills, that shrink a little when pressed.
- **Inputs and text areas** rounded, with a blue outline when focused.
- **Links** in the primary colour, without underline.
- **Titles** `h1`–`h6` with comfortable sizes and margins.
- A **dark theme**: set `data-theme="dark"` on `<html>`.

```ts
document.documentElement.dataset.theme = prefersDarkMode() ? "dark" : "light"
```

## `BubbleUI`: the class names

**Layout** — every box is a flexbox:

| Name | Class | Puts the children… |
|---|---|---|
| `BoxColumn` / `BoxColumnReverse` | `box-column`… | top to bottom (or bottom to top) |
| `BoxRow` / `BoxRowReverse` | `box-row`… | left to right (or right to left) |
| `BoxWrap` | `box-wrap` | in lines that wrap |
| `BoxCenter` | `box-center` | in the middle, both ways |
| `BoxXCenter` / `BoxXStart` / `BoxXEnd` | `box-x-…` | centred, at the start or at the end, horizontally |
| `BoxYCenter` / `BoxYStart` / `BoxYEnd` | `box-y-…` | centred, at the top or at the bottom, vertically |
| `BoxXBetween` / `BoxXAround` | `box-x-between`… | spread out |

**Colours** — background and matching text colour, from the Material palette:

| Name | Class | Looks like |
|---|---|---|
| `Primary` | `primary` | Blue, white text: the main button |
| `PrimaryContainer` | `primary-container` | Light blue, rounded: a highlighted card |
| `Secondary`, `Tertiary` (+ `Container`) | `secondary`… | Calmer variants |
| `Error`, `ErrorContainer` | `error`… | Red: errors and dangerous actions |
| `Surface1`, `Surface2`, `Surface3` | `surface-1`… | Greys, rounded: cards and panels, darker each step |

**Text**: `TextCenter`, `TextLeft`, `TextRight`, `TextTruncate` (cut with `…`), `Bold`, `Italic`.

```ts
const toolbar = uiComponent({ type: Html.Nav, classes: [BubbleUI.BoxRow, BubbleUI.BoxXBetween, BubbleUI.BoxYCenter] })
const danger = uiComponent({ type: Html.Button, text: "Delete", classes: [BubbleUI.Error] })
```

> 💡 Colours are CSS variables (`--primary-color`, `--surface-1`…). Change them in your own CSS to
> give your app its own palette:

```css
:root { --primary-color: #00796b; }
```

## `Html`: tag names

```ts
import { Html } from "./gtd/html.js"

uiComponent({ type: Html.Button, text: "Save" })   // instead of type: "button"
uiComponent({ type: Html.Section })
```

It has the common tags (`Div`, `Span`, `P`, `A`, `H1`–`H6`, `Img`, `Ul`, `Li`, `Table`…), form
elements (`Input`, `Button`, `Select`, `Textarea`, `Label`…) and SVG tags (`Svg`, `Path`, `Circle`…).
Writing `"buton"` by mistake gives you a broken element; writing `Html.Buton` does not compile.

---

[← All the documentation](../1-overview.md)
