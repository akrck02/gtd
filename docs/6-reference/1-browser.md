# Browser 🖥️

**Module:** `browser.ts` · **Depends on:** nothing

Small questions about the device and the user's preferences, each answered by one function that
returns `true` or `false`.

## In 30 seconds

```ts
import { isSmallDevice, prefersDarkMode } from "./gtd/browser.js"

if (isSmallDevice()) document.body.classList.add("mobile-layout")
if (prefersDarkMode()) document.body.classList.add("dark")
```

## Screen size

| Function | `true` when the window is | Typical device |
|---|---|---|
| `isSmallDevice()` | 760px wide or less | phone |
| `isMediumDevice()` | 760px to 1024px | tablet, small laptop window |
| `isLargeDevice()` | wider than 1024px | desktop |

They check the size **when you call them**. To react when the user resizes the window:

```ts
window.addEventListener("resize", () => {
  document.body.classList.toggle("mobile-layout", isSmallDevice())
})
```

> 💡 For pure styling, CSS media queries (`@media (max-width: 760px) { … }`) are simpler. Use
> these functions when the **code** must change, e.g. to draw a different menu.

## User preferences

People set these in their operating system. Respecting them makes your app feel at home.

| Function | `true` when the user… |
|---|---|
| `prefersDarkMode()` | uses a dark theme |
| `prefersLightMode()` | uses a light theme |
| `prefersReducedMotion()` | asked for fewer animations (motion can make some people dizzy) |
| `mediaQuery(query)` | matches any [media query](https://developer.mozilla.org/docs/Web/CSS/Media_Queries) you write |

```ts
const animate = !prefersReducedMotion()
const touchOnly = mediaQuery("(hover: none)")
const printing = mediaQuery("print")
```

## Device and system

| Function | Returns |
|---|---|
| `isMobile()` | Something truthy on Android, iPhone, iPad and other mobile browsers |
| `getOs()` | `"Windows"`, `"MacOS"`, `"Linux"`, `"UNIX"`, or `undefined` |

```ts
const shortcut = "MacOS" == getOs() ? "⌘ + S" : "Ctrl + S"
uiComponent({ type: "small", text: `Save with ${shortcut}` })
```

These read the browser's *user agent* text, which can be changed or faked. Use them for small
hints like the example above, not for important decisions.

---

[← All the documentation](../1-overview.md)
