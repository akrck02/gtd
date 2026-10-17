# Paths

`paths.ts` reads pieces of URLs and downloads files.

```ts
import { getUrlParametersByBreakPoint, getUrlParametersByIndex, getUrlGetParameters, downloadFile } from "./gtd/paths.js"
```

## Segments

```ts
const url = "https://www.website.org/search/user/1/page/2"

getUrlParametersByBreakPoint(url, "search") // ["user", "1", "page", "2"]  segments after "search"
getUrlParametersByBreakPoint(url, "nope")   // []

getUrlParametersByIndex("search/user/1/page/2", 2) // ["1", "page", "2"]
```

`getUrlParametersByIndex` splits on every `/`, so with a full URL the scheme and host count as
segments: `"https:"`, `""`, `"www.website.org"`.

## Query string

```ts
getUrlGetParameters("https://www.website.org?search=&user=akrck02&page=2")
// { search: "", user: "akrck02", page: "2" }
```

Values are not decoded; use `decodeURIComponent` or the native `URLSearchParams` when they may
contain encoded characters.

## Downloading

```ts
downloadFile("https://example.org/files/17293.jpg", "cat.jpg")
downloadFile(URL.createObjectURL(new Blob([csv], { type: "text/csv" })), "report.csv")
```

The browser only honours the file name for same-origin URLs and `blob:` URLs.

---

[← All the documentation](../README.md)
