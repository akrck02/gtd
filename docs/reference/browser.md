# Browser

`browser.ts` answers questions about the device and the user's preferences.

```ts
import { isSmallDevice, prefersDarkMode, isMobile, getOs } from "./gtd/browser.js"
```

## Screen size

| Function | True when the viewport is |
|---|---|
| `isSmallDevice()` | 760px wide or less |
| `isMediumDevice()` | between 760px and 1024px |
| `isLargeDevice()` | wider than 1024px |

These read the viewport at the moment you call them. To react to changes, listen to `resize`, or
use `matchMedia(query).addEventListener("change", …)` directly.

## Preferences

| Function | Media query |
|---|---|
| `prefersDarkMode()` | `(prefers-color-scheme: dark)` |
| `prefersLightMode()` | `(prefers-color-scheme: light)` |
| `prefersReducedMotion()` | `(prefers-reduced-motion: reduce)` |
| `mediaQuery(query)` | any query you pass |

```ts
if (prefersReducedMotion()) document.body.classList.add("no-animations")
mediaQuery("(hover: none)") // a touch screen
```

## Device

| Function | Returns |
|---|---|
| `isMobile()` | A truthy value on Android, iOS, BlackBerry, Opera Mini and IE Mobile |
| `getOs()` | `"Windows"`, `"MacOS"`, `"Linux"`, `"UNIX"` or `undefined`, read from the user agent |

User agents can lie; prefer media queries for layout decisions and keep these for hints like
keyboard shortcuts (`⌘` or `Ctrl`).

---

[← All the documentation](../README.md)
