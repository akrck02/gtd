# GTD documentation

**GTD** (*Getting Things Done*) is a small TypeScript library for building web applications on top of
the platform: real `HTMLElement`s, `fetch`, `localStorage` and `matchMedia`. No virtual DOM, no build
plugin, no runtime to learn. Every file in `src/` is an independent ES module; import the ones you
need and leave the rest out.

```ts
import { uiComponent } from "./gtd/dom.js"

document.body.appendChild(uiComponent({ type: "h1", text: "Hello, world!" }))
```

## Start here

| Page | What you will learn |
|---|---|
| [Getting started](getting-started.md) | Add GTD to a project, compile it and show your first view |
| [A tour of GTD](tour.md) | One small application that uses every module, step by step |

## Guides

| Guide | Module | What it covers |
|---|---|---|
| [Building the interface](guides/dom.md) | `dom.ts` | Creating elements, classes, styles, attributes, data and events |
| [Views and routing](guides/router.md) | `router.ts`, `view.ts` | Mapping paths to views, parameters, home and not found pages |
| [Talking to a server](guides/http.md) | `http.ts` | `GET`, `POST` and friends, headers, forms and status handlers |
| [Signals](guides/signals.md) | `signals.ts` | Letting parts of the app talk without knowing each other |
| [Translations](guides/i18n.md) | `i18n.ts` | Text bundles per language, switching language at runtime |
| [Configuration](guides/configuration.md) | `configuration.ts` | Persisting settings and loading them from a JSON file |
| [Icons](guides/icons.md) | `icons.ts` | Loading SVG icon collections and drawing icons |

## Utilities

| Page | Module | What it covers |
|---|---|---|
| [Browser](reference/browser.md) | `browser.ts` | Screen sizes, dark mode, reduced motion, mobile and OS detection |
| [Paths](reference/paths.md) | `paths.ts` | Reading URL segments and query strings, downloading files |
| [Crypto](reference/crypto.md) | `crypto.ts` | Random UUIDs |

## Working on GTD

| Page | What it covers |
|---|---|
| [Contributing and testing](contributing.md) | Running the unit tests, conventions, publishing these docs |

## Modules at a glance

| Module | Depends on | Exports |
|---|---|---|
| `dom.ts` | — | `uiComponent`, `setDom*`, `removeDom*`, `UIProperties` |
| `view.ts` | — | `viewHandler` |
| `router.ts` | `view.ts` | `setRoute`, `setNotFoundRoute`, `showRoute` |
| `http.ts` | — | `httpGet`, `httpPost`, `httpPut`, `httpPatch`, `httpDelete`, `httpHead`, `httpOptions`, `handleResponseStatus`, `HttpMethod`, `MimeType`, `TextEncoding`, `HttpRequest` |
| `signals.ts` | `crypto.ts` | `setSignal`, `connectToSignal`, `emitSignal`, `signalHandler` |
| `i18n.ts` | — | `setCurrentLanguage`, `loadTextBundle`, `getText`, `Languages`, `ILanguage` |
| `configuration.ts` | — | `loadConfiguration`, `setConfiguration`, `getConfiguration` |
| `icons.ts` | `dom.ts` | `loadIcons`, `getIcon` |
| `browser.ts` | — | `isSmallDevice`, `isMediumDevice`, `isLargeDevice`, `prefersDarkMode`, `prefersLightMode`, `prefersReducedMotion`, `mediaQuery`, `isMobile`, `getOs` |
| `paths.ts` | — | `getUrlParametersByBreakPoint`, `getUrlParametersByIndex`, `getUrlGetParameters`, `downloadFile` |
| `crypto.ts` | — | `uuidv4` |

When you copy a module, copy the modules it depends on too.
