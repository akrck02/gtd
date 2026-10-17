import { describe, expect, it, fakeFetch } from "./lib/test.js"
import { getIcon, loadIcons } from "../src/icons.js"

describe("icons", () => {
  it("returns undefined before loading", () => {
    expect(getIcon("material", "home")).toBe(undefined)
  })

  it("wraps a loaded icon in a centred svg", async () => {
    fakeFetch({ "./icons.json": `{"home":"<path d=\\"M0 0\\"/>"}` })
    await loadIcons("material", "./icons.json")
    const icon = getIcon("material", "home", "32px", "red")
    const svg = icon.querySelector("svg")
    expect(svg.getAttribute("width")).toBe("32px")
    expect(svg.getAttribute("fill")).toBe("red")
    expect(svg.querySelector("path") != null).toBe(true)
    expect(icon.style.display).toBe("flex")
    expect(getIcon("material", "nope")).toBe(undefined)
  })

  it("uses 24px and #222222 by default", async () => {
    fakeFetch({ "./set.json": `{"a":""}` })
    await loadIcons("set", "./set.json")
    const svg = getIcon("set", "a").querySelector("svg")
    expect(svg.getAttribute("height")).toBe("24px")
    expect(svg.getAttribute("fill")).toBe("#222222")
  })
})
