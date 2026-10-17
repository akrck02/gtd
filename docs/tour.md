# A tour of GTD 🗺️

In this tour we build **Notes**, a tiny app that lists notes, opens one, speaks English and Spanish,
remembers your language and draws icons. Each step adds **one module** and links to its guide, so you
can stop at any step and still have a working app.

It needs no real server: the "API" is a JSON file in the project.

> Start from the project you made in [Getting started](getting-started.md). Keep `npx tsc --watch`
> and `python3 -m http.server 8000` running, and reload the browser after each step.

## The files we will end with

```
my-app/
├── index.html
├── config.json          ← step 2
├── api/notes.json       ← step 3
├── i18n/en/notes.json   ← step 4
├── i18n/es/notes.json   ← step 4
├── icons.json           ← step 5
└── src/
    ├── gtd/
    └── main.ts          ← every step
```

## Step 1 — Pages (`dom` + `router`)

Replace `src/main.ts` with a home page and a page for one note:

```ts
import { uiComponent } from "./gtd/dom.js"
import { setRoute, showRoute } from "./gtd/router.js"

const app = document.getElementById("app")

setRoute("/", async (_, container) => {
  container.append(uiComponent({ type: "h1", text: "Notes" }))
})

setRoute("/note/$", async ([id], container) => {
  container.append(uiComponent({ type: "h1", text: `Note ${id}` }))
})

const navigate = () => showRoute(location.hash.slice(1) || "/", app)
window.addEventListener("hashchange", navigate)
navigate()
```

✅ **Check:** <http://localhost:8000> shows **Notes**; `#/note/3` shows **Note 3**.

📖 [Building the interface](guides/dom.md) · [Views and routing](guides/router.md)

## Step 2 — Settings (`configuration`)

Create **`config.json`** next to `index.html`:

```json
{ "api": "./api", "lang": "en" }
```

At the top of `src/main.ts`, after the imports:

```ts
import { loadConfiguration, getConfiguration } from "./gtd/configuration.js"

// Load the defaults only the first time, so user changes are kept
if (undefined == getConfiguration("api"))
  await loadConfiguration("./config.json")
```

Also open `src/gtd/configuration.ts` and change `configurationId` to `"notes"` to silence the
warning.

✅ **Check:** in the console, `localStorage.api` prints `"./api"`.

📖 [Configuration](guides/configuration.md)

## Step 3 — Data (`http`)

Create **`api/notes.json`**:

```json
[
  { "id": "1", "text": "Buy milk" },
  { "id": "2", "text": "Call Ada" },
  { "id": "3", "text": "Learn GTD" }
]
```

Load it once, and draw the list on the home page:

```ts
import { httpGet } from "./gtd/http.js"

type Note = { id: string, text: string }

const response = await httpGet({ url: `${getConfiguration("api")}/notes.json`, parameters: {} })
const notes: Note[] = await response.json()
```

```ts
setRoute("/", async (_, container) => {
  container.append(uiComponent({ type: "h1", text: "Notes" }))

  for (const note of notes) {
    const link = uiComponent({ type: "a", text: note.text, attributes: { href: `#/note/${note.id}` } })
    container.append(uiComponent({ type: "p" }), link)
  }
})

setRoute("/note/$", async ([id], container) => {
  const note = notes.find(n => n.id == id)
  container.append(uiComponent({ type: "h1", text: note ? note.text : "No such note" }))
})
```

✅ **Check:** the home page lists three links, and each opens its note.

📖 [Talking to a server](guides/http.md)

## Step 4 — Two languages (`i18n`)

Create **`i18n/en/notes.json`** and **`i18n/es/notes.json`**:

```json
{ "title": "Notes", "missing": "No such note", "switch": "Español" }
```

```json
{ "title": "Notas", "missing": "No existe esa nota", "switch": "English" }
```

Load the texts in the language from the configuration, and use `getText` instead of the English
words:

```ts
import { setCurrentLanguage, loadTextBundle, getText } from "./gtd/i18n.js"

await setCurrentLanguage(getConfiguration("lang"))
await loadTextBundle("notes")
```

```ts
container.append(uiComponent({ type: "h1", text: getText("notes", "title") }))
```

Spanish is already in `AVAILABLE_LANGUAGES` in `i18n.ts`; other languages must be added there.

✅ **Check:** change `lang` to `"es"` in the console (`localStorage.lang = "es"`), reload: **Notas**.

📖 [Translations](guides/i18n.md)

## Step 5 — A button with an icon (`icons`, events)

Create **`icons.json`** with one icon:

```json
{ "translate": "<path d=\"M12.9 15.1 10.4 12.6v-.1A17 17 0 0 0 14 6h3V4h-7V2H8v2H1v2h11.2A16 16 0 0 1 9 11.4 16 16 0 0 1 6.7 8h-2a18 18 0 0 0 3 4.6L2.6 17.6 4 19l5-5 3.1 3.1zM18.5 10h-2L12 22h2l1.1-3h4.8l1.1 3h2zm-2.6 7 1.6-4.3 1.6 4.3z\"/>" }
```

Add a button on the home page that switches language and draws the page again:

```ts
import { setConfiguration } from "./gtd/configuration.js"
import { setDomEvents } from "./gtd/dom.js"
import { loadIcons, getIcon } from "./gtd/icons.js"

await loadIcons("app", "./icons.json")
```

```ts
const switchButton = uiComponent({ type: "button", text: getText("notes", "switch") })
switchButton.prepend(getIcon("app", "translate", "16px", "currentColor"))

setDomEvents(switchButton, {
  click: async () => {
    const lang = "es" == getConfiguration("lang") ? "en" : "es"
    setConfiguration("lang", lang)
    await setCurrentLanguage(lang, true) // true: reload the loaded bundles
    navigate()                           // draw the page again
  },
})

container.append(switchButton)
```

✅ **Check:** the button flips the whole page between English and Spanish, and the choice survives
a reload.

📖 [Icons](guides/icons.md) · [Configuration](guides/configuration.md)

## Step 6 — Telling others (`signals`)

Say we want a counter in the page title of how many times the language changed, without the
button knowing about the title. Create a signal, connect the title to it, and emit it from the
button:

```ts
import { setSignal, connectToSignal, emitSignal } from "./gtd/signals.js"

const languageChanged = setSignal()

let changes = 0
connectToSignal(languageChanged, async lang => {
  changes++
  document.title = `Notes (${lang}, ${changes} changes)`
})
```

```ts
// inside the click handler, after setCurrentLanguage
await emitSignal(languageChanged, lang)
```

✅ **Check:** the browser tab title updates each time you press the button.

📖 [Signals](guides/signals.md)

## Step 7 — Small screens (`browser`)

```ts
import { isSmallDevice } from "./gtd/browser.js"

document.body.style.fontSize = isSmallDevice() ? "18px" : "16px"
```

✅ **Check:** open the developer tools' device mode and reload: the text gets bigger on a phone.

📖 [Browser](reference/browser.md)

## You did it 🎉

You used every GTD module, and you can read every line of your app. Some ideas to keep going:

- Add a form that creates notes and saves them with `setConfiguration("notes", JSON.stringify(notes))`.
- Replace `api/notes.json` with a real API and use `httpPost` — see [Talking to a server](guides/http.md).
- Style it: everything is plain HTML, so plain CSS works.

---

[← All the documentation](README.md)
