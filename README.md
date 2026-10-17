# GTD — Getting Things Done

[![Test](https://github.com/akrck02/gtd/actions/workflows/test.yaml/badge.svg)](https://github.com/akrck02/gtd/actions/workflows/test.yaml)

A small TypeScript library for building web applications with the platform itself: real
`HTMLElement`s, `fetch`, `localStorage`. Every file in `src/` is an independent ES module; import
only what you need.

```ts
import { uiComponent } from "./gtd/dom.js"

document.body.appendChild(uiComponent({ type: "h1", text: "Hello world!" }))
```

## Documentation

Read it at **<https://akrck02.github.io/gtd>**, or in [`docs/`](docs/README.md):

- [Getting started](docs/getting-started.md) and [a tour of GTD](docs/tour.md)
- Guides: [interface](docs/guides/dom.md), [routing](docs/guides/router.md),
  [HTTP](docs/guides/http.md), [signals](docs/guides/signals.md),
  [translations](docs/guides/i18n.md), [configuration](docs/guides/configuration.md),
  [icons](docs/guides/icons.md)
- Utilities: [browser](docs/reference/browser.md), [paths](docs/reference/paths.md),
  [crypto](docs/reference/crypto.md)
- [Contributing and testing](docs/contributing.md)

## Testing

```sh
npm install
npm test
```
