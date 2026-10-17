# Talking to a server

`http.ts` is a thin layer over `fetch`: one function per method, sensible headers, and a helper to
react to status codes.

```ts
import { httpGet, httpPost, handleResponseStatus } from "./gtd/http.js"
```

## Making a request

Every function takes an `HttpRequest` and returns the `fetch` promise of a `Response`.

```ts
const response = await httpGet({ url: "/api/notes", parameters: {} })
const notes = await response.json()

await httpPost({ url: "/api/notes", parameters: { text: "Buy milk" } })
```

| Function | Method | Body |
|---|---|---|
| `httpGet` | `GET` | none, `parameters` is ignored: put them in the URL |
| `httpPost` | `POST` | `parameters` |
| `httpPut` | `PUT` | `parameters` |
| `httpPatch` | `PATCH` | `parameters` |
| `httpDelete` | `DELETE` | `parameters` |
| `httpHead` | `HEAD` | `parameters` |
| `httpOptions` | `OPTIONS` | `parameters` |

### `HttpRequest`

| Field | Type | Default | Meaning |
|---|---|---|---|
| `url` | `string` | — | Where to send it |
| `parameters` | `object \| FormData` | — | Sent as JSON, or as multipart when it is a `FormData` |
| `contentType` | `string` | `"application/json"` | Use the `MimeType` enum |
| `charset` | `string` | `"UTF-8"` | Use the `TextEncoding` enum |
| `headers` | `object` | none | Merged over the defaults |

```ts
import { MimeType, TextEncoding } from "./gtd/http.js"

await httpPut({
  url: "/api/notes/1",
  parameters: { text: "Buy bread" },
  headers: { Authorization: `Bearer ${token}` },
})

await httpPost({ url: "/api/raw", parameters: "plain", contentType: MimeType.Text, charset: TextEncoding.Iso88591 })
```

### Sending files

Pass a `FormData`: it is sent as is, and the browser writes the `multipart/form-data` header with
its boundary.

```ts
const form = new FormData()
form.append("picture", fileInput.files[0])
await httpPost({ url: "/api/upload", parameters: form })
```

## Handling status codes

```ts
const response = await httpGet({ url: "/api/me", parameters: {} })

await handleResponseStatus(
  response,
  new Map([
    [200, async res => showProfile(await res.json())],
    [401, async () => location.hash = "/login"],
  ]),
  async res => showError(res.status), // any other status
)
```

Without a default handler, unknown statuses are logged with `console.error`. `fetch` only rejects on
network errors, never for 4xx or 5xx, so wrap calls in `try`/`catch` for those.

---

[← All the documentation](../README.md)
