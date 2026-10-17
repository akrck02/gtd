import { describe, expect, it, fakeFetch, quiet } from "./lib/test.js"
import { setCurrentLanguage, loadTextBundle, getText } from "../src/i18n.js"

const files = {
  "./resources/i18n/en/home.json": `{"title": "Hello"}`,
  "./resources/i18n/es/home.json": `{"title": "Hola"}`,
}

// i18n keeps its bundles for the whole page, so these tests run in order
describe("i18n", () => {
  it("returns empty text for unknown bundles and keys", async () => {
    fakeFetch(files)
    expect(getText("home", "title")).toBe("")
    await loadTextBundle("home")
    expect(getText("home", "missing")).toBe("")
  })

  it("loads a bundle once for the current language", async () => {
    const fetch = fakeFetch(files)
    await loadTextBundle("home")
    expect(getText("home", "title")).toBe("Hello")
    expect(fetch).toHaveBeenCalledTimes(0)
  })

  it("switches language and reloads bundles", async () => {
    fakeFetch(files)
    await setCurrentLanguage("es-ES", true)
    expect(getText("home", "title")).toBe("Hola")
  })

  it("falls back to English for unknown locales", async () => {
    fakeFetch(files)
    const warn = quiet("warn")
    await setCurrentLanguage("fr", true)
    expect(getText("home", "title")).toBe("Hello")
    expect(warn).toHaveBeenCalledTimes(1)
  })

  it("retries and gives up quietly on missing bundles", async () => {
    const fetch = fakeFetch(files)
    await loadTextBundle("absent", false, 3)
    expect(fetch).toHaveBeenCalledTimes(3)
    expect(getText("absent", "x")).toBe("")
  })
})
