import { afterEach, describe, expect, it, vi } from "vitest"
import * as http from "../src/http"

function mockFetch() {
  const fetch = vi.fn(async () => new Response("{}"))
  vi.stubGlobal("fetch", fetch)
  return fetch
}

afterEach(() => vi.unstubAllGlobals())

describe("requests", () => {
  it("sends GET without a body", async () => {
    const fetch = mockFetch()
    await http.httpGet({ url: "/api", parameters: { a: 1 } })
    const [url, options] = fetch.mock.calls[0] as any
    expect(url).toBe("/api")
    expect(options.method).toBe("GET")
    expect(options.body).toBeUndefined()
    expect(options.headers["Content-type"]).toBe("application/json;charset=UTF-8")
  })

  it.each([
    ["httpPost", "POST"], ["httpPut", "PUT"], ["httpPatch", "PATCH"],
    ["httpDelete", "DELETE"], ["httpHead", "HEAD"], ["httpOptions", "OPTIONS"],
  ] as const)("%s sends %s with a JSON body", async (fn, method) => {
    const fetch = mockFetch()
    await http[fn]({ url: "/api", parameters: { a: 1 } })
    const options = (fetch.mock.calls[0] as any)[1]
    expect(options.method).toBe(method)
    expect(options.body).toBe(`{"a":1}`)
  })

  it("merges custom headers and content type", async () => {
    const fetch = mockFetch()
    await http.httpPost({ url: "/api", parameters: {}, contentType: http.MimeType.Text,
      charset: http.TextEncoding.Iso88591, headers: { Authorization: "Bearer x" } })
    const headers = (fetch.mock.calls[0] as any)[1].headers
    expect(headers["Content-type"]).toBe("text/plain;charset=ISO-8859-1")
    expect(headers.Authorization).toBe("Bearer x")
  })

  it("lets the browser set the multipart boundary for FormData", async () => {
    const fetch = mockFetch()
    const form = new FormData()
    form.append("name", "cat")
    await http.httpPost({ url: "/upload", parameters: form })
    const options = (fetch.mock.calls[0] as any)[1]
    expect(options.body).toBe(form)
    expect(options.headers["Content-type"]).toBeUndefined()
  })
})

describe("handleResponseStatus", () => {
  it("calls the handler for the status", async () => {
    const ok = vi.fn(), other = vi.fn()
    await http.handleResponseStatus(new Response("", { status: 201 }), new Map([[201, ok]]), other)
    expect(ok).toHaveBeenCalledOnce()
    expect(other).not.toHaveBeenCalled()
  })

  it("falls back to the default handler, or logs", async () => {
    const other = vi.fn()
    await http.handleResponseStatus(new Response("", { status: 500 }), new Map(), other)
    expect(other).toHaveBeenCalledOnce()
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    await http.handleResponseStatus(new Response("", { status: 500 }), new Map(), undefined)
    expect(error).toHaveBeenCalledOnce()
  })
})
