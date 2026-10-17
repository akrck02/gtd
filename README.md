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

Read it at **<https://akrck02.github.io/gtd>**, or in [`docs/`](docs/1-overview.md):

- [Getting started](docs/2-getting-started.md) (5 minutes), [how GTD thinks](docs/3-core-ideas.md) and
  [the GTD quest](docs/4-the-quest.md)
- Guides: [interface](docs/5-guides/1-building-the-interface.md), [routing](docs/5-guides/2-views-and-routing.md),
  [HTTP](docs/5-guides/3-talking-to-a-server.md), [signals](docs/5-guides/4-signals.md),
  [translations](docs/5-guides/5-translations.md), [configuration](docs/5-guides/6-configuration.md),
  [icons](docs/5-guides/7-icons.md), [keyboard shortcuts](docs/5-guides/8-keyboard-shortcuts.md)
- Helpers: [browser](docs/6-reference/1-browser.md), [display](docs/6-reference/2-display.md),
  [animations](docs/6-reference/3-animations.md), [time](docs/6-reference/4-time.md),
  [HTML tags and Bubble UI](docs/6-reference/5-tags-and-styles.md), [paths](docs/6-reference/6-paths.md),
  [crypto](docs/6-reference/7-crypto.md)
- [Troubleshooting](docs/7-troubleshooting.md) · [Contributing and testing](docs/8-contributing.md)

## Testing

The tests run in a browser, without Node:

```sh
bin/test.sh            # headless Chrome or Chromium
bin/test.sh --build    # or build them and open test/index.html
```

GitHub runs them, and a type check with the native TypeScript compiler, on every push.
