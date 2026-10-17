# Getting started 🚀

By the end of this page you will have a GTD app running in your browser, with two pages and a
button. It takes about **five minutes**. No experience with frameworks needed.

## Before you begin

You need three things installed. Open a terminal and check each one:

| Tool | Check it with | You should see | Get it |
|---|---|---|---|
| Node.js 18 or newer | `node -v` | `v18…` or higher | [nodejs.org](https://nodejs.org) |
| git | `git --version` | `git version …` | [git-scm.com](https://git-scm.com) |
| Python 3 (only to serve files) | `python3 --version` | `Python 3…` | usually already installed |

> 💡 **Why Python?** Browsers refuse to load JavaScript modules from a file opened by double-click
> (`file://…`). We need a tiny local web server, and Python ships one. Any other server works too,
> for example `npx serve`.

## Step 1 — Create the project

```sh
mkdir my-app
cd my-app
npm init -y
npm install --save-dev typescript
```

This makes a folder with a `package.json` and installs the TypeScript compiler, which turns `.ts`
files into `.js` files the browser can run.

## Step 2 — Add GTD

GTD is not installed from npm. It is a folder of source files that you **copy into your project**.
You own them: you can read them, and even change them.

```sh
git clone --depth 1 https://github.com/akrck02/gtd ../gtd-download
mkdir src
cp -r ../gtd-download/src src/gtd
```

Your project now looks like this:

```
my-app/
├── node_modules/
├── package.json
└── src/
    └── gtd/
        ├── dom.ts
        ├── router.ts
        └── … (one file per module)
```

> 💡 Prefer to keep GTD up to date with git? Use a submodule instead:
> `git submodule add https://github.com/akrck02/gtd lib/gtd`, and import from `../lib/gtd/src/`.

## Step 3 — Tell TypeScript what to do

Create a file called **`tsconfig.json`** in `my-app/`:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ES2022",
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "rootDir": "./src",
    "outDir": "./out"
  },
  "include": ["src"]
}
```

In plain words: *"take everything in `src/`, turn it into modern JavaScript for browsers, and put
the result in `out/`."*

## Step 4 — Write the page

Create **`index.html`** in `my-app/`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My app</title>
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="./out/main.js"></script>
  </body>
</html>
```

`<main id="app">` is the box where our pages will be drawn. The `<script>` loads our code — notice it
points to `out/`, the **compiled** file, not the `.ts` one.

## Step 5 — Write the app

Create **`src/main.ts`**:

```ts
import { uiComponent, setDomEvents } from "./gtd/dom.js"
import { setRoute, showRoute } from "./gtd/router.js"

// 1. Find the box where pages are drawn
const app = document.getElementById("app")

// 2. Describe the home page
setRoute("/", async (_params, container) => {
  const title = uiComponent({ type: "h1", text: "My first GTD app" })
  const button = uiComponent({ type: "button", text: "Say hello" })

  setDomEvents(button, {
    click: () => location.hash = "/hello/world",
  })

  container.append(title, button)
})

// 3. Describe a second page; "$" means "any word here"
setRoute("/hello/$", async ([name], container) => {
  const greeting = uiComponent({ type: "h1", text: `Hello, ${name}!` })
  const back = uiComponent({ type: "a", text: "← Back", attributes: { href: "#/" } })
  container.append(greeting, back)
})

// 4. Draw the right page now, and every time the address changes
const navigate = () => showRoute(location.hash.slice(1) || "/", app)
window.addEventListener("hashchange", navigate)
navigate()
```

> ⚠️ Notice the imports end in **`.js`**, even though the files are `.ts`. That is on purpose: the
> browser will load the compiled `.js` files. Writing `./gtd/dom` or `./gtd/dom.ts` will fail in the
> browser.

## Step 6 — Run it

```sh
npx tsc
python3 -m http.server 8000
```

Open **<http://localhost:8000>** in your browser. You should see:

1. A title, **My first GTD app**, and a **Say hello** button.
2. Click the button → the address ends in `#/hello/world` and the page says **Hello, world!**
3. Click **← Back** → you are home again. Try typing `#/hello/Ada` in the address bar too.

🎉 **That's it — you have a GTD app with routing.**

Nothing on screen? Head to [Troubleshooting](troubleshooting.md).

## Making changes

Every time you edit a `.ts` file, run `npx tsc` again and reload the page. To skip the first part,
leave the compiler watching in a second terminal:

```sh
npx tsc --watch
```

Tip: add both commands to `package.json` so you only have to remember `npm run dev`:

```json
"scripts": {
  "build": "tsc",
  "dev": "tsc --watch & python3 -m http.server 8000"
}
```

## What just happened?

| You wrote | What it does |
|---|---|
| `uiComponent({...})` | Creates a real HTML element — see [Building the interface](guides/dom.md) |
| `setDomEvents(button, { click })` | Adds a click listener — same as `addEventListener` |
| `setRoute("/hello/$", view)` | Says which function draws which address — see [Views and routing](guides/router.md) |
| `showRoute(path, app)` | Clears `app` and draws the matching page |

## Next steps

- 🧠 [How GTD thinks](concepts.md) — five minutes that make every other page easier.
- 🗺️ [A tour of GTD](tour.md) — build a small notes app, step by step.

---

[← All the documentation](README.md)
