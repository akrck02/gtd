# Paths 🔗

**Module:** `paths.ts` · **Depends on:** nothing

Read pieces of a web address, and make the browser download a file.

## In 30 seconds

```ts
import { getUrlGetParameters, downloadFile } from "./gtd/paths.js"

getUrlGetParameters("https://shop.example.org/?search=shoes&page=2")
// { search: "shoes", page: "2" }

downloadFile("./reports/2026.pdf", "report.pdf")
```

## Query parameters (`?key=value`)

```ts
const query = getUrlGetParameters(location.href)
const page = Number(query["page"] ?? "1")
```

Values come back exactly as written in the address. If they may contain spaces or symbols
(`%20`…), decode them: `decodeURIComponent(query["search"])`.

## Segments (`/a/b/c`)

**After a word** — everything that follows a given segment:

```ts
getUrlParametersByBreakPoint("https://example.org/search/user/1/page/2", "search")
// ["user", "1", "page", "2"]

getUrlParametersByBreakPoint("https://example.org/about", "search")
// [] — "search" is not in the address
```

**From a position** — splits on every `/` and keeps from that index:

```ts
getUrlParametersByIndex("search/user/1/page/2", 2)
// ["1", "page", "2"]
```

With a full address, remember that `https:`, an empty piece and the domain count as the first
three positions.

> 💡 Using the [router](../guides/router.md)? It already gives your views the values of `$`
> segments — you rarely need these functions for that.

## Downloading a file

```ts
downloadFile(address, fileName)
```

Works with files on your site and with data you create in the page:

```ts
// a file from your site
downloadFile("./docs/manual.pdf", "manual.pdf")

// a file made on the fly
const csv = "name,age\nAda,36\nAlan,41"
const address = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
downloadFile(address, "people.csv")
```

The browser only uses your `fileName` for files from your own site or created in the page; files
from other sites keep their own name, or open in a new tab.

---

[← All the documentation](../README.md)
