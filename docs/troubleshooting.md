# Troubleshooting 🆘

Something not working? Open the **browser console** first (`F12`, or right click → *Inspect* →
*Console*). The error there almost always points to one of these.

## The page is blank

**"Failed to load module script" or "CORS" errors, and the address starts with `file://`**

You opened `index.html` by double-clicking it. Browsers block modules there. Serve the folder:

```sh
python3 -m http.server 8000
```

…and open <http://localhost:8000>.

**`GET http://localhost:8000/out/main.js 404 (Not Found)`**

The code was not compiled yet, or went somewhere else. Run `npx tsc` and check that `out/main.js`
exists and that `outDir` in `tsconfig.json` matches the `src` of your `<script>`.

**`GET …/gtd/dom 404` (no extension)**

An import is missing `.js`. Write `import { … } from "./gtd/dom.js"`.

**`Cannot use import statement outside a module`**

The `<script>` tag needs `type="module"`.

## TypeScript errors

**`Cannot find name 'document'` or `'window'`**

Add the browser types to `tsconfig.json`: `"lib": ["ES2021", "DOM", "DOM.Iterable"]`.

**`Property 'replaceAll' does not exist`**

Your `target` is too old. Use `"target": "ES2021"` or newer.

**`Top-level 'await' expressions are only allowed when the 'module' option is set to 'es2022'…`**

Use `"module": "ES2022"` in `tsconfig.json`, as in [Getting started](getting-started.md).

**My changes don't show up**

Run `npx tsc` again (or keep `npx tsc --watch` running), then reload. Still old? Reload without
cache: `Ctrl + Shift + R` (`Cmd + Shift + R` on a Mac).

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
- Does `./i18n/<language>/<name>.json` exist? Check the *Network* tab for a 404.
- Is your language in `AVAILABLE_LANGUAGES` in `i18n.ts`? See [Translations](guides/i18n.md).

**"The configuration id need to be changed" warning**

Open `configuration.ts` and set `configurationId` to your app's name. See
[Configuration](guides/configuration.md).

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
check `response.ok` or use `handleResponseStatus`. See [Talking to a server](guides/http.md).

## Still stuck?

Open an issue at <https://github.com/akrck02/gtd/issues> with what you did, what you expected, and
the console error. Small examples are the fastest to fix.

---

[← All the documentation](README.md)
