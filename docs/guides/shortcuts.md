# Keyboard shortcuts ⌨️

**Module:** `shortcuts.ts` · **Depends on:** `crypto.ts`

Let people use your app from the keyboard: `Ctrl` + `S` to save, `Esc` to close, `/` to search.

## In 30 seconds

```ts
import Shortcuts, { KeyInteraction } from "./gtd/shortcuts.js"

const keys = Shortcuts.register(document)

Shortcuts.set(keys, {
  interaction: KeyInteraction.keyDown,
  key: "s",
  ctrlKey: true,
  preventDefault: true,        // stop the browser's own "save page"
  callback: () => save(),
})
```

## Two steps

1. **Register** where to listen: `Shortcuts.register(target)` returns an id. Use `document` for
   shortcuts that work everywhere, or an element for shortcuts that only work while it has the focus
   (an editor, a dialog).
2. **Set** shortcuts on that id: `Shortcuts.set(id, shortcut)`. Setting the same combination again
   replaces it.

```ts
const everywhere = Shortcuts.register(document)
const inEditor = Shortcuts.register(editorElement)
```

## The shortcut object

| Field | Required | Meaning |
|---|---|---|
| `key` | ✅ | The key, as the browser names it: `"s"`, `"Enter"`, `"Escape"`, `"ArrowUp"`, `"/"`… Letters ignore case |
| `interaction` | ✅ | `KeyInteraction.keyDown` (when pressed, the usual one) or `KeyInteraction.keyUp` (when released) |
| `callback` | ✅ | The function to run |
| `ctrlKey`, `shiftKey`, `altKey`, `metaKey` | | Keys that must be held. `metaKey` is `⌘` on a Mac, `⊞` on Windows |
| `preventDefault` | | Stop what the browser would do with that key (`Ctrl` + `S` saving the page…) |
| `stopPropagation` | | Stop other listeners from seeing the key |
| `repeatable` | | Run again while the key is held down. Off by default |
| `omitEditableContent` | | Do nothing while the user types in an input, a textarea or editable content |

> 💡 The modifiers must match **exactly**: a shortcut for `Ctrl` + `S` does not run on
> `Ctrl` + `Shift` + `S`, and a shortcut for `S` alone does not run while `Ctrl` is held.

## Common recipes

**Close a dialog with `Esc`:**

```ts
Shortcuts.set(keys, { interaction: KeyInteraction.keyDown, key: "Escape", callback: closeDialog })
```

**`/` to search, but not while typing:**

```ts
Shortcuts.set(keys, {
  interaction: KeyInteraction.keyDown,
  key: "/",
  omitEditableContent: true, // typing "/" in a text field must still type it
  preventDefault: true,
  callback: () => searchInput.focus(),
})
```

**Move through a list holding an arrow:**

```ts
Shortcuts.set(keys, { interaction: KeyInteraction.keyDown, key: "ArrowDown", repeatable: true, callback: selectNext })
```

**`Ctrl` on Windows and Linux, `⌘` on a Mac:**

```ts
import { getOs } from "./gtd/browser.js"

const mac = "MacOS" == getOs()
Shortcuts.set(keys, {
  interaction: KeyInteraction.keyDown,
  key: "k",
  ctrlKey: !mac,
  metaKey: mac,
  preventDefault: true,
  callback: openSearch,
})
```

## Showing shortcuts to people

Shortcuts nobody knows about are not used. Show them next to the action:

```ts
const hint = uiComponent({ type: "kbd", text: mac ? "⌘ K" : "Ctrl K" })
searchButton.append(hint)
```

---

[← All the documentation](../README.md)
