# Configuration ⚙️

**Module:** `configuration.ts` · **Depends on:** nothing

Store settings — the API address, the theme, the language — so they **survive reloads**. Values are
kept in the browser's `localStorage`, on the user's device.

## In 30 seconds

```ts
import { setConfiguration, getConfiguration } from "./gtd/configuration.js"

setConfiguration("theme", "dark")
getConfiguration("theme") // "dark", even after closing the browser
```

## First step: name your configuration

Open `src/gtd/configuration.ts` and change the id to your app's name:

```ts
const configurationId = "my-notes-app"
```

Until you do, GTD prints a reminder in the console.

## Reading and writing

| Function | What it does |
|---|---|
| `setConfiguration(key, value)` | Saves `value` under `key` |
| `getConfiguration(key)` | Returns the value, or `undefined` if it was never saved |
| `await loadConfiguration(path)` | Saves every key of a JSON file |

Values are **strings**. To store numbers, booleans or objects, convert them:

```ts
setConfiguration("fontSize", String(18))
Number(getConfiguration("fontSize")) // 18

setConfiguration("favourites", JSON.stringify(["1", "4"]))
JSON.parse(getConfiguration("favourites") ?? "[]") // ["1", "4"]
```

## Defaults from a file

Put the defaults in **`config.json`**, next to `index.html`:

```json
{
  "api": "https://example.org/api",
  "theme": "light",
  "lang": "en"
}
```

and load it when the app starts — **only the first time**, so you don't overwrite what the user
changed:

```ts
if (undefined == getConfiguration("api"))
  await loadConfiguration("./config.json")
```

## Full example: a theme switch that remembers

```ts
import { uiComponent, setDomEvents } from "./gtd/dom.js"
import { getConfiguration, setConfiguration } from "./gtd/configuration.js"
import { prefersDarkMode } from "./gtd/browser.js"

function applyTheme(theme: string) {
  document.body.style.background = "dark" == theme ? "#222" : "#fafafa"
  document.body.style.color = "dark" == theme ? "#fafafa" : "#222"
}

// use the saved theme, or the system preference the first time
let theme = getConfiguration("theme") ?? (prefersDarkMode() ? "dark" : "light")
applyTheme(theme)

const toggle = uiComponent({ type: "button", text: "Toggle theme" })
setDomEvents(toggle, {
  click: () => {
    theme = "dark" == theme ? "light" : "dark"
    setConfiguration("theme", theme)
    applyTheme(theme)
  },
})
document.body.append(toggle)
```

## Good to know

- `localStorage` is per site and per browser: settings don't travel between devices.
- Users can clear it at any time, so always have a default.
- Don't store passwords or other secrets there: any script on the page can read it.
- To see what's stored: developer tools → *Application* (*Storage* in Firefox) → *Local Storage*.

---

[← All the documentation](../README.md) · Next: [Icons →](icons.md)
