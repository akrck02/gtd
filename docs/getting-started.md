# Getting started

This page takes you from an empty folder to a page drawn with GTD in about five minutes.

## What you need

- A browser.
- [TypeScript](https://www.typescriptlang.org/) (`npm install --save-dev typescript`), or any tool
  that compiles TypeScript to ES modules (esbuild, Vite, Bun…).
- Any static file server, for example `python3 -m http.server`. Modules cannot be loaded from
  `file://`.

## 1. Add GTD to your project

GTD is not a package: it is a folder of modules you own. Pick one way:

```sh
# as a git submodule, to pull updates later
git submodule add https://github.com/akrck02/gtd lib/gtd

# or as a plain copy of the sources
git clone --depth 1 https://github.com/akrck02/gtd /tmp/gtd && cp -r /tmp/gtd/src src/gtd
```

The rest of this page assumes the sources live in `src/gtd/`.

## 2. Configure TypeScript

GTD imports its siblings with a `.js` extension (`import { uiComponent } from "./dom.js"`), the way
browsers expect ES modules. A minimal `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ES2020",
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "rootDir": "./src",
    "outDir": "./out"
  },
  "include": ["src"]
}
```

## 3. Write the application

`src/main.ts`:

```ts
import { uiComponent, setDomEvents } from "./gtd/dom.js"
import { setRoute, showRoute } from "./gtd/router.js"

const app = uiComponent({ type: "main", id: "app" })
document.body.appendChild(app)

setRoute("/", async (_params, container) => {
  const button = uiComponent({ type: "button", text: "Say hello" })
  setDomEvents(button, { click: () => location.hash = "/hello/world" })
  container.appendChild(button)
})

setRoute("/hello/$", async ([name], container) => {
  container.appendChild(uiComponent({ type: "h1", text: `Hello, ${name}!` }))
})

const navigate = () => showRoute(location.hash.slice(1), app)
window.addEventListener("hashchange", navigate)
navigate()
```

`index.html`:

```html
<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>My app</title></head>
  <body>
    <script type="module" src="./out/main.js"></script>
  </body>
</html>
```

## 4. Build and run

```sh
npx tsc
python3 -m http.server 8000
```

Open <http://localhost:8000>, press the button and the address changes to `#/hello/world`, which
shows **Hello, world!**.

## Next steps

- Take the [tour](tour.md) to see every module working together.
- Read [Building the interface](guides/dom.md), the module every other one builds on.

---

[← All the documentation](README.md)
