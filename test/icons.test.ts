import { describe, expect, it, vi } from "vitest"
import { getIcon, loadIcons } from "../src/icons"

describe("icons", () => {
  it("returns undefined before loading", () => {
    expect(getIcon("material", "home")).toBeUndefined()
  })

  it("wraps a loaded icon in an svg", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`{"home":"<path d=\\"M0 0\\"/>"}`)))
    await loadIcons("material", "./icons.json")
    vi.unstubAllGlobals()

    const icon = getIcon("material", "home", "32px", "red")
    const svg = icon.querySelector("svg")
    expect(svg.getAttribute("width")).toBe("32px")
    expect(svg.getAttribute("fill")).toBe("red")
    expect(svg.querySelector("path")).not.toBeNull()
    expect(getIcon("material", "nope")).toBeUndefined()
  })

  it("uses 24px and #222222 by default", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`{"a":""}`)))
    await loadIcons("set", "./icons.json")
    vi.unstubAllGlobals()
    const svg = getIcon("set", "a").querySelector("svg")
    expect(svg.getAttribute("height")).toBe("24px")
    expect(svg.getAttribute("fill")).toBe("#222222")
  })
})
