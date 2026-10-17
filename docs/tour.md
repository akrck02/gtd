# A tour of GTD

We will build a tiny **notes** application, one module at a time. Each step is short and links to the
guide that explains it in depth.

## Settings that survive a reload

```ts
import { loadConfiguration, getConfiguration } from "./gtd/configuration.js"

await loadConfiguration("./config.json") // {"api": "https://notes.example.org", "lang": "es"}
const api = getConfiguration("api")
```

→ [Configuration](guides/configuration.md)

## Text in the user's language

```ts
import { setCurrentLanguage, loadTextBundle, getText } from "./gtd/i18n.js"

await setCurrentLanguage(getConfiguration("lang") ?? navigator.language)
await loadTextBundle("notes") // ./i18n/es/notes.json
const title = getText("notes", "title")
```

→ [Translations](guides/i18n.md)

## Fetching data

```ts
import { httpGet } from "./gtd/http.js"

const notes: { id: string, text: string }[] =
  await httpGet({ url: `${api}/notes`, parameters: {} }).then(res => res.json())
```

→ [Talking to a server](guides/http.md)

## Drawing it

```ts
import { uiComponent, setDomEvents } from "./gtd/dom.js"
import { getIcon, loadIcons } from "./gtd/icons.js"

await loadIcons("ui", "./icons.json")

function noteCard(note: { id: string, text: string }): HTMLElement {
  const card = uiComponent({ type: "article", classes: ["note"], data: { id: note.id } })
  card.appendChild(getIcon("ui", "note", "20px", "currentColor"))
  card.appendChild(uiComponent({ type: "p", text: note.text }))
  return card
}
```

→ [Building the interface](guides/dom.md), [Icons](guides/icons.md)

## Pages

```ts
import { setRoute, showRoute } from "./gtd/router.js"

setRoute("/", async (_, container) => {
  container.appendChild(uiComponent({ type: "h1", text: title }))
  notes.map(noteCard).forEach(card => container.appendChild(card))
})

setRoute("/note/$", async ([id], container) => {
  container.appendChild(noteCard(notes.find(n => n.id == id)))
})
```

→ [Views and routing](guides/router.md)

## Telling everyone a note was saved

```ts
import { setSignal, connectToSignal, emitSignal } from "./gtd/signals.js"

export const noteSaved = setSignal()
connectToSignal(noteSaved, async note => console.log("saved", note))

await emitSignal(noteSaved, { id: "1", text: "Buy milk" })
```

→ [Signals](guides/signals.md)

## Adapting to the device

```ts
import { isSmallDevice, prefersDarkMode } from "./gtd/browser.js"

document.body.classList.toggle("compact", isSmallDevice())
document.body.classList.toggle("dark", prefersDarkMode())
```

→ [Browser](reference/browser.md)

---

[← All the documentation](README.md)
