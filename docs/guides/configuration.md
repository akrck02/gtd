# Configuration

`configuration.ts` keeps settings in `localStorage`, so they survive reloads, and can fill them from
a JSON file.

```ts
import { loadConfiguration, setConfiguration, getConfiguration } from "./gtd/configuration.js"
```

## Using it

```ts
await loadConfiguration("./config.json") // every key of the file is stored

setConfiguration("theme", "dark")
getConfiguration("theme")   // "dark"
getConfiguration("missing") // undefined
```

`config.json`:

```json
{ "api": "https://example.org/api", "theme": "light" }
```

Values are stored as strings. Store objects with `JSON.stringify` and read them with `JSON.parse`.

> `loadConfiguration` overwrites what the user changed with the values of the file. Load it only
> the first time, for example when `getConfiguration("api")` is `undefined`.

## Naming your configuration

The module warns in the console until you change `configurationId` at the top of
`configuration.ts` to your application's name:

```ts
const configurationId = "my-notes-app"
```

---

[← All the documentation](../README.md)
