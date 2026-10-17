import { describe, expect, it, fakeFetch, mock, quiet } from "./lib/test.js"
import * as http from "../src/http.js"

describe("http", () => {
  it("sends GET without a body", async () => {
    const fetch = fakeFetch()
    await http.httpGet({ url: "/api", parameters: { a: 1 } })
    const [url, options] = fetch.calls[0] as any
    expect(url).toBe("/api")
    expect(options.method).toBe("GET")
    expect(options.body).toBe(undefined)
    expect(options.headers["Content-type"]).toBe("application/json;charset=UTF-8")
  })

  for (const [fn, method] of [
    ["httpPost", "POST"], ["httpPut", "PUT"], ["httpPatch", "PATCH"],
    ["httpDelete", "DELETE"], ["httpHead", "HEAD"], ["httpOptions", "OPTIONS"],
  ] as const) {
    it(`${fn} sends ${method} with a JSON body`, async () => {
      const fetch = fakeFetch()
      await http[fn]({ url: "/api", parameters: { a: 1 } })
      const options = (fetch.calls[0] as any)[1]
      expect(options.method).toBe(method)
      expect(options.body).toBe(`{"a":1}`)
    })
  }

  it("merges custom headers and content type", async () => {
    const fetch = fakeFetch()
    await http.httpPost({ url: "/api", parameters: {}, contentType: http.MimeType.Text,
      charset: http.TextEncoding.Iso88591, headers: { Authorization: "Bearer x" } })
    const headers = (fetch.calls[0] as any)[1].headers
    expect(headers["Content-type"]).toBe("text/plain;charset=ISO-8859-1")
    expect(headers.Authorization).toBe("Bearer x")
  })

  it("lets the browser set the multipart boundary for FormData", async () => {
    const fetch = fakeFetch()
    const form = new FormData()
    form.append("name", "cat")
    await http.httpPost({ url: "/upload", parameters: form })
    const options = (fetch.calls[0] as any)[1]
    expect(options.body).toBe(form)
    expect(options.headers["Content-type"]).toBe(undefined)
  })

  it("calls the handler for the status", async () => {
    const ok = mock(() => {}), other = mock(() => {})
    await http.handleResponseStatus(new Response("", { status: 201 }), new Map([[201, ok]]), other)
    expect(ok).toHaveBeenCalledTimes(1)
    expect(other).toHaveBeenCalledTimes(0)
  })

  it("falls back to the default handler, or logs", async () => {
    const other = mock(() => {})
    await http.handleResponseStatus(new Response("", { status: 500 }), new Map(), other)
    expect(other).toHaveBeenCalledTimes(1)
    const error = quiet("error")
    await http.handleResponseStatus(new Response("", { status: 500 }), new Map(), undefined)
    expect(error).toHaveBeenCalledTimes(1)
  })
})
