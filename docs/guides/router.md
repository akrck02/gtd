# Views and routing

`router.ts` decides which **view** to draw for a path. A view is any async function with the
`viewHandler` shape from `view.ts`:

```ts
type viewHandler = (params: string[], container: HTMLElement) => Promise<void>
```

It receives the values captured from the path and the element to draw into.

## Registering routes

```ts
import { setRoute, setNotFoundRoute, showRoute } from "./gtd/router.js"

setRoute("/", homeView)                   // "/" and "" are the home page
setRoute("/settings", settingsView)
setRoute("/user/$", userView)             // $ captures one segment
setRoute("/user/$/post/$", postView)      // several captures, in order
setNotFoundRoute(notFoundView)
```

```ts
async function postView([user, post]: string[], container: HTMLElement) {
  container.textContent = `Post ${post} by ${user}`
}
```

Rules:

- A trailing slash is ignored: `"/settings/"` is `"/settings"`.
- `$` stands for one segment: anything but `/`.
- Routes with more segments are tried first, so `/docs/$` wins over `/docs` for `/docs/intro`.
- Routes are not anchored at the end: `/user/$` also matches `/user/7/anything`. Register the longer
  route when you need to tell them apart.
- Without your own home or not found views, GTD writes `Home page.` and `Page not found.`.

## Showing a route

`showRoute(path, container)` empties the container and calls the matching view. GTD does not
listen to the address bar itself, so you choose how navigation works.

### With the hash (works on any static host)

```ts
const app = document.getElementById("app")
const navigate = () => showRoute(location.hash.slice(1) || "/", app)

window.addEventListener("hashchange", navigate)
navigate()

// anywhere: location.hash = "/user/7"
```

### With the History API

```ts
function go(path: string) {
  history.pushState({}, "", path)
  showRoute(path, app)
}

window.addEventListener("popstate", () => showRoute(location.pathname, app))
showRoute(location.pathname, app)
```

The server must answer every path with `index.html` for this to survive a reload.

> On GitHub Pages, served under `/<repository>/`, remove that prefix before calling `showRoute`, or
> use the hash.

---

[← All the documentation](../README.md)
