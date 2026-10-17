# Talking to a server 🌐

**Module:** `http.ts` · **Depends on:** nothing

Apps load and save data: a list of products, a user profile, a new comment. `http.ts` sends those
requests for you, with sensible defaults, using the browser's own `fetch`.

## In 30 seconds

```ts
import { httpGet, httpPost } from "./gtd/http.js"

// read
const response = await httpGet({ url: "https://jsonplaceholder.typicode.com/todos/1", parameters: {} })
const todo = await response.json()
console.log(todo.title)

// write
await httpPost({ url: "/api/notes", parameters: { text: "Buy milk" } })
```

> 💡 `await` means "wait for the answer before going on". Every function here is `async`, so put
> `await` in front of it, inside an `async` function or at the top of a module.

## The request object

Every function takes one object:

| Field | Required | What it is | Default |
|---|---|---|---|
| `url` | ✅ | Where to send the request | — |
| `parameters` | ✅ | The data to send. Use `{}` when there is none | — |
| `headers` | | Extra headers, like a login token | none |
| `contentType` | | The data format | `"application/json"` |
| `charset` | | The text encoding | `"UTF-8"` |

## One function per HTTP method

| Function | Use it to… | Sends `parameters`? |
|---|---|---|
| `httpGet` | read something | ❌ — put values in the URL instead |
| `httpPost` | create something | ✅ as JSON |
| `httpPut` | replace something | ✅ as JSON |
| `httpPatch` | change part of something | ✅ as JSON |
| `httpDelete` | delete something | ✅ as JSON |
| `httpHead` | check something exists, without the body | ✅ |
| `httpOptions` | ask what the server allows | ✅ |

### Sending values with GET

`GET` has no body, so values go in the address:

```ts
const search = encodeURIComponent("blue shoes")
await httpGet({ url: `/api/products?search=${search}&page=2`, parameters: {} })
```

## Reading the answer

You get back a standard [`Response`](https://developer.mozilla.org/docs/Web/API/Response):

```ts
const response = await httpGet({ url: "/api/me", parameters: {} })

response.ok        // true for 200–299
response.status    // 200, 404, 500…
await response.json()  // the body, parsed as JSON
await response.text()  // or as plain text
```

> ⚠️ A `404` or `500` is **not** an error for `fetch`: you still get a `Response`. Always check
> `response.ok` or the status. Errors (`throw`) only happen when there is no answer at all — no
> internet, wrong domain, blocked by CORS.

## Reacting to each status

`handleResponseStatus` picks a function by status code, so your happy path and your error paths
stay tidy:

```ts
import { handleResponseStatus } from "./gtd/http.js"

const response = await httpGet({ url: "/api/me", parameters: {} })

await handleResponseStatus(
  response,
  new Map([
    [200, async res => showProfile(await res.json())],
    [401, async () => location.hash = "/login"],
    [404, async () => showMessage("User not found")],
  ]),
  async res => showMessage(`Something went wrong (${res.status})`), // everything else
)
```

Without that last function, unknown statuses are written to the console.

## Logging in: adding headers

```ts
const token = getConfiguration("token")

await httpGet({
  url: "/api/me",
  parameters: {},
  headers: { Authorization: `Bearer ${token}` },
})
```

## Uploading files

Put the files in a `FormData` and send it as `parameters`. GTD sends it as `multipart/form-data`
automatically.

```ts
const input = uiComponent({ type: "input", attributes: { type: "file" } }) as HTMLInputElement

setDomEvents(input, {
  change: async () => {
    const form = new FormData()
    form.append("picture", input.files[0])
    form.append("title", "My cat")
    await httpPost({ url: "/api/upload", parameters: form })
  },
})
```

## Other formats

The `MimeType` and `TextEncoding` enums list common values, so you don't have to remember them:

```ts
import { httpPost, MimeType, TextEncoding } from "./gtd/http.js"

await httpPost({
  url: "/api/import",
  parameters: "name,age\nAda,36",
  contentType: MimeType.Csv,
  charset: TextEncoding.Utf8,
})
```

## Full example: load and show a list, with errors handled

```ts
import { uiComponent } from "./gtd/dom.js"
import { httpGet } from "./gtd/http.js"

type Todo = { id: number, title: string, completed: boolean }

async function showTodos(container: HTMLElement) {
  const status = uiComponent({ type: "p", text: "Loading…" })
  container.append(status)

  try {
    const response = await httpGet({ url: "https://jsonplaceholder.typicode.com/todos?_limit=5", parameters: {} })
    if (!response.ok) {
      status.textContent = `The server answered ${response.status}`
      return
    }

    const todos: Todo[] = await response.json()
    status.remove()

    const list = uiComponent({ type: "ul" })
    for (const todo of todos) {
      const item = uiComponent({ type: "li" })
      item.textContent = `${todo.completed ? "✅" : "⬜"} ${todo.title}`
      list.append(item)
    }
    container.append(list)
  } catch {
    status.textContent = "Could not reach the server. Are you online?"
  }
}

showTodos(document.body)
```

## Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| `blocked by CORS policy` | The server doesn't allow your page's address | Fix on the server (`Access-Control-Allow-Origin`) |
| Data sent with `httpGet` never arrives | `GET` ignores `parameters` | Put values in the URL |
| `response.json()` throws | The answer is not JSON (often an HTML error page) | Check `response.ok` first |
| Got a `Promise` instead of data | Missing `await` | `await response.json()` |

---

[← All the documentation](../README.md) · Next: [Signals →](signals.md)
