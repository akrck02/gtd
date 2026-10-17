import { describe, expect, it, mock, replace } from "./lib/test.js"
import {
  getUrlParametersByBreakPoint, getUrlParametersByIndex, getUrlGetParameters, downloadFile,
} from "../src/paths.js"

const url = "https://www.website.org/search/user/1/page/2"

describe("paths", () => {
  it("returns the parts after a breakpoint", () => {
    expect(getUrlParametersByBreakPoint(url, "search")).toEqual(["user", "1", "page", "2"])
    expect(getUrlParametersByBreakPoint(url, "missing")).toEqual([])
  })

  it("returns the parts from an index of the split url", () => {
    expect(getUrlParametersByIndex("search/user/1/page/2", 2)).toEqual(["1", "page", "2"])
  })

  it("parses query parameters", () => {
    expect(getUrlGetParameters("https://w.org?search=&user=akrck02&page=2"))
      .toEqual({ search: "", user: "akrck02", page: "2" })
    expect(getUrlGetParameters("https://w.org")).toEqual({})
  })

  it("downloads through a temporary link", () => {
    let clicked: HTMLAnchorElement
    replace(HTMLAnchorElement.prototype, "click", mock(function (this: HTMLAnchorElement) { clicked = this }))
    downloadFile("https://w.org/files/1.jpg", "cat.jpg")
    expect(clicked.download).toBe("cat.jpg")
    expect(clicked.href).toContain("files/1.jpg")
    expect(clicked.isConnected).toBe(false)
  })
})
