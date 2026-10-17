# Welcome to GTD 👋

**GTD** (*Getting Things Done*) is a tiny TypeScript library for building web applications.

It has one idea: **the browser already knows how to build apps — GTD just makes it shorter to
write.** There is no virtual DOM, no special syntax, no compiler plugin and nothing to "learn
instead of" JavaScript. A button made with GTD is a normal `<button>`. A request made with GTD is a
normal `fetch`. If you know a little HTML and TypeScript, you already know most of GTD.

```ts
import { uiComponent } from "./gtd/dom.js"

const title = uiComponent({ type: "h1", text: "Hello, world!" })
document.body.appendChild(title)
```

That is a complete GTD program. 🎉

**No Node.js, no npm.** You copy GTD's files into your project and build with
[esbuild](https://esbuild.github.io), a single program. No `node_modules`, no configuration files.

## Is GTD for me?

GTD is a good fit when you want:

- ✅ A small app, a tool, a dashboard or a personal site, without a big framework.
- ✅ To understand every line that runs in your page.
- ✅ To learn how the web platform works, while still writing less code.

You may want something else when you need server-side rendering, a large component ecosystem or
automatic re-rendering when data changes.

## Where to start

New here? Follow these in order — the first two take about **10 minutes** together.

[![The GTD Quest: 8 levels and a boss to build a notes app](images/quest/quest-map.svg)](tour.md)

| Step | Page | Time |
|---|---|---|
| 1 | [Getting started](getting-started.md) — create a project and see it in the browser | 5 min |
| 2 | [How GTD thinks](concepts.md) — the six ideas behind every module | 5 min |
| 3 | [🎮 The GTD Quest](tour.md) — build a notes app in 8 levels and a boss, earn 9 badges | 45 min |
| 🆘 | [Troubleshooting](troubleshooting.md) — blank page? errors in the console? look here | — |

## Guides — one per thing you want to do

| I want to… | Read | Module |
|---|---|---|
| Put things on the screen | [Building the interface](guides/dom.md) | `dom.ts` |
| Have several pages | [Views and routing](guides/router.md) | `router.ts`, `view.ts` |
| Load or send data to a server | [Talking to a server](guides/http.md) | `http.ts` |
| Let parts of my app react to each other | [Signals](guides/signals.md) | `signals.ts` |
| Show my app in several languages | [Translations](guides/i18n.md) | `i18n.ts` |
| Remember user settings | [Configuration](guides/configuration.md) | `configuration.ts` |
| Show icons | [Icons](guides/icons.md) | `icons.ts` |
| React to keyboard shortcuts | [Keyboard shortcuts](guides/shortcuts.md) | `shortcuts.ts` |

## Small helpers

| I want to… | Read | Module |
|---|---|---|
| Know the screen size, dark mode or the device | [Browser](reference/browser.md) | `browser.ts` |
| Style the page differently on phones | [Display](reference/display.md) | `display.ts` |
| Type text letter by letter, or fade things in | [Animations](reference/animations.md) | `animations.ts` |
| Wait some milliseconds | [Time](reference/time.md) | `time.ts` |
| Make it look good (buttons, cards, dark theme) | [HTML tags and Bubble UI](reference/html.md) | `bubble.ts`, `html.ts` |
| Read parts of a URL or download a file | [Paths](reference/paths.md) | `paths.ts` |
| Generate a random unique id | [Crypto](reference/crypto.md) | `crypto.ts` |

## Helping with GTD

| Page | What it covers |
|---|---|
| [Contributing and testing](contributing.md) | Running the tests, code style, writing these docs |

## All the modules at a glance

Each module is one file. If you copy a module on its own, copy the modules it **depends on** too.

| Module | Depends on | What it gives you |
|---|---|---|
| `dom.ts` | — | `uiComponent` and helpers to change elements |
| `view.ts` | — | The `viewHandler` type |
| `router.ts` | `view.ts` | `setRoute`, `setHomeRoute`, `setNotFoundRoute`, `showRoute` |
| `http.ts` | — | `httpGet`, `httpPost`, `httpPut`, `httpPatch`, `httpDelete`, `httpHead`, `httpOptions`, `handleResponseStatus` |
| `signals.ts` | `crypto.ts` | `setSignal`, `connectToSignal`, `disconnectSignal`, `emitSignal` |
| `i18n.ts` | — | `setCurrentLanguage`, `loadTextBundle`, `getText` |
| `configuration.ts` | — | `loadConfiguration`, `setConfiguration`, `getConfiguration`, `isConfigurationSet`, `isConfigurationActive` |
| `icons.ts` | `dom.ts` | `loadIcons`, `getIcon` |
| `browser.ts` | — | `isSmallDevice`, `prefersDarkMode`, `isMobile`, `getOs`… |
| `paths.ts` | — | `getUrlGetParameters`, `downloadFile`… |
| `crypto.ts` | — | `uuidv4` |
| `display.ts` | `browser.ts`, `configuration.ts`, `dom.ts` | `checkDisplayType`, `isMobileDisplay` (default) |
| `shortcuts.ts` | `crypto.ts` | `Shortcuts` (default), `KeyInteraction`, `Shortcut` |
| `animations.ts` | `html.ts`, `time.ts` | `Animations` (default) |
| `time.ts` | — | `sleep`, `sleepIf` |
| `html.ts` | — | `Html` (tag names) |
| `bubble.ts` | — | `BubbleUI` (class names of `styles/bubbleui-v3.0.0.css`) |
