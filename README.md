<img src="resources/logo.svg" width="68" alt="GTD logo">

# GTD — Getting Things Done

[![Test](https://github.com/akrck02/gtd/actions/workflows/test.yaml/badge.svg)](https://github.com/akrck02/gtd/actions/workflows/test.yaml)

A small TypeScript library for building web applications with the platform itself: real
`HTMLElement`s, `fetch`, `localStorage`. Every file in `src/` is an independent module; import only
what you need. **No Node.js, no npm**: copy the files and build with esbuild.

```ts
import { uiComponent } from "./gtd/dom.js"
import { BubbleUI } from "./gtd/bubble.js"

document.body.append(uiComponent({ type: "button", text: "Hello world!", classes: [BubbleUI.Primary] }))
```

```sh
./bin/esbuild src/main.ts --bundle --format=esm --outfile=out/main.js
```

## Documentation

Read it at **<https://akrck02.github.io/gtd>**, or in [`docs/`](docs/README.md):

- [Getting started](docs/getting-started.md) (5 minutes), [how GTD thinks](docs/concepts.md) and
  [🎮 the GTD Quest](docs/tour.md)
- Guides: [interface](docs/guides/dom.md), [routing](docs/guides/router.md),
  [HTTP](docs/guides/http.md), [signals](docs/guides/signals.md),
  [translations](docs/guides/i18n.md), [configuration](docs/guides/configuration.md),
  [icons](docs/guides/icons.md), [keyboard shortcuts](docs/guides/shortcuts.md)
- Helpers: [browser](docs/reference/browser.md), [display](docs/reference/display.md),
  [animations](docs/reference/animations.md), [time](docs/reference/time.md),
  [HTML tags and Bubble UI](docs/reference/html.md), [paths](docs/reference/paths.md),
  [crypto](docs/reference/crypto.md)
- [Troubleshooting](docs/troubleshooting.md) · [Contributing and testing](docs/contributing.md)

## Testing

The tests run in a browser, without Node:

```sh
bin/test.sh            # headless Chrome or Chromium
bin/test.sh --build    # or build them and open test/index.html
```

GitHub runs them, and a type check with the native TypeScript compiler, on every push.
