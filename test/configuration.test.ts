import { beforeEach, describe, expect, it, vi } from "vitest"
import { getConfiguration, loadConfiguration, setConfiguration } from "../src/configuration"

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(console, "warn").mockImplementation(() => {})
})

describe("configuration", () => {
  it("stores and reads values", () => {
    setConfiguration("theme", "dark")
    expect(getConfiguration("theme")).toBe("dark")
    expect(getConfiguration("missing")).toBeUndefined()
  })

  it("loads every key of a JSON file", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`{"theme":"light","lang":"es"}`)))
    await loadConfiguration("./config.json")
    expect(getConfiguration("theme")).toBe("light")
    expect(getConfiguration("lang")).toBe("es")
    vi.unstubAllGlobals()
  })

  it("warns while the configuration id is the default", () => {
    setConfiguration("a", "b")
    expect(console.warn).toHaveBeenCalled()
  })
})
