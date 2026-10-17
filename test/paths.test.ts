import { afterEach, describe, expect, it, vi } from "vitest"
import {
  getUrlParametersByBreakPoint, getUrlParametersByIndex, getUrlGetParameters, downloadFile,
} from "../src/paths"

const url = "https://www.website.org/search/user/1/page/2"

describe("paths", () => {
  it("returns the parts after a breakpoint", () => {
    expect(getUrlParametersByBreakPoint(url, "search")).toEqual(["user", "1", "page", "2"])
    expect(getUrlParametersByBreakPoint(url, "missing")).toEqual([])
  })

  it("returns the parts from an index of the split url", () => {
    expect(getUrlParametersByIndex("search/user/1", 1)).toEqual(["user", "1"])
  })

  it("parses query parameters", () => {
    expect(getUrlGetParameters("https://w.org?search=&user=akrck02&page=2"))
      .toEqual({ search: "", user: "akrck02", page: "2" })
    expect(getUrlGetParameters("https://w.org")).toEqual({})
  })
})

describe("downloadFile", () => {
  afterEach(() => vi.restoreAllMocks())

  it("clicks a temporary download link", () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      expect(this.download).toBe("cat.jpg")
      expect(this.href).toContain("files/1.jpg")
    })
    downloadFile("https://w.org/files/1.jpg", "cat.jpg")
    expect(click).toHaveBeenCalledOnce()
    expect(document.querySelector("a")).toBeNull()
  })
})
