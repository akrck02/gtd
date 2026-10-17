# Animations 🎞️

**Module:** `animations.ts` · **Depends on:** `html.ts`, `time.ts`

Two small effects: text that **types itself** letter by letter, and elements that **appear**.

## In 30 seconds

```ts
import Animations from "./gtd/animations.js"

Animations.enabled = true                      // off by default

const title = uiComponent({ type: "h1", text: "Hello, I'm GTD" })
document.body.append(title)
await Animations.typing(title)                 // H… He… Hel… Hello, I'm GTD
```

![A title being typed letter by letter](../images/typing.gif)

## Turning animations on and off

`Animations.enabled` is `false` until you set it. While it is `false`, every animation finishes at
once, so the page simply shows its final state. Respect people who asked their system for less
motion:

```ts
import { prefersReducedMotion } from "./gtd/browser.js"

Animations.enabled = !prefersReducedMotion()
```

## `Animations.typing(element)`

Empties the text of the element and types it back at the speed of a fast typist. If the element
has children, they are typed one after the other. It works on text elements: `p`, `span`, `a`,
`div`, `pre`, `code` and `h1`–`h6`.

Put the element **on the page first**, then `await` the animation:

```ts
container.append(title, subtitle)
await Animations.typing(title)
await Animations.typing(subtitle) // starts when the title is done
```

## `Animations.show(element)`

Adds the class `show` to the element, after letting the browser draw it once without it. Your CSS
decides what "appearing" looks like:

```css
.card { opacity: 0; transform: translateY(8px); transition: all .3s; }
.card.show { opacity: 1; transform: none; }
```

```ts
const card = uiComponent({ classes: ["card"], text: "New message" })
container.append(card)
await Animations.show(card)
```

> ⚠️ Without `Animations.enabled = true` the class is still added — just without the small
> pause — so make sure your CSS also works when the element appears at once.

---

[← All the documentation](../README.md)
