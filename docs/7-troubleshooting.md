# Troubleshooting 🆘

Something not working? Open the **browser console** first (`F12`, or right click → *Inspect* →
*Console*). The error there almost always points to one of these.

## Building

**`./bin/esbuild: Permission denied`**

Make it executable: `chmod +x bin/esbuild`.

**`./bin/esbuild: cannot execute binary file`** (or *Exec format error*)

The esbuild in the GTD repository is for Linux x86-64. On macOS, Windows or ARM, download yours:
`curl -fsSL https://esbuild.github.io/dl/v0.25.8 | sh`. On Windows, run it in *Git Bash* or WSL.

**`Could not resolve "./gtd/dom.js"`**

The path is wrong. Imports are relative to the file that has them: from `src/main.ts`, GTD's files
are in `./gtd/`. Check that `src/gtd/dom.ts` exists.

**`Top-level await is currently not supported with the "iife" output format`**

Add `--format=esm` to the esbuild command, and keep `type="module"` on the `<script>` tag.

**My changes don't show up**

Is esbuild running with `--watch`, or did you run it again? Then reload without cache:
`Ctrl + Shift + R` (`Cmd + Shift + R` on a Mac).

## The page is blank

**`GET http://localhost:8000/out/main.js 404 (Not Found)`**

The app was not built yet, or went somewhere else. Run esbuild and check that `out/main.js` exists
and matches the `src` of your `<script>`.

**Errors about modules or CORS, and the address starts with `file://`**

You opened `index.html` by double-clicking it. Serve the folder instead:
`python3 -m http.server 8000`, then open <http://localhost:8000>.

**`Cannot use import statement outside a module`**

The `<script>` tag needs `type="module"`.

**`x is not defined` or `Cannot read properties of undefined`, but it compiled**

esbuild does not check types, so typos reach the browser. Check the name in the error, or check
types first: see *Checking types* in [Getting started](2-getting-started.md).

## Routing

**Every page shows "Page not found."**

- Is `setRoute` called **before** `showRoute`?
- Are you passing the path without the `#`? Use `location.hash.slice(1)`.
- Is the route registered with a leading slash? `setRoute("/about", …)`, then go to `#/about`.

**Nothing happens when the address changes**

GTD does not watch the address bar for you. Add:

```ts
window.addEventListener("hashchange", () => showRoute(location.hash.slice(1) || "/", app))
```

**Pages pile up on top of each other**

Draw into the `container` your view receives, not into `document.body`. `showRoute` empties the
container before each page.

## Translations, configuration, icons

**`getText` returns an empty string**

- Did you `await loadTextBundle("name")` before calling `getText`?
- Does `./resources/i18n/<language>/<name>.json` exist? Check the *Network* tab for a 404.
- Is your language in `AVAILABLE_LANGUAGES` in `i18n.ts`? See [Translations](5-guides/5-translations.md).

**Settings of two apps mix up on `localhost`**

Both use the same `configurationId`. Set your app's name in `configuration.ts`. See
[Configuration](5-guides/6-configuration.md).

**`getIcon` returns `undefined`**

Make sure you `await loadIcons(...)` first, and that the collection id and icon name are spelled
the same as in the JSON file.

## Requests

**`Access to fetch … has been blocked by CORS policy`**

The server does not allow requests from your page's address. This is fixed on the **server** (it
must send `Access-Control-Allow-Origin`), not in GTD. While developing, serving your app and the API
from the same address avoids it.

**My request fails but there's no error**

`fetch` — and so GTD — only throws on network failures. A `404` or `500` is a normal response:
check `response.ok` or use `handleResponseStatus`. See [Talking to a server](5-guides/3-talking-to-a-server.md).

## Still stuck?

Open an issue at <https://github.com/akrck02/gtd/issues> with what you did, what you expected, and
the console error. Small examples are the fastest to fix.

---

[← All the documentation](1-overview.md)
