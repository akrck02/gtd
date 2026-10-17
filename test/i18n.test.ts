import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

let i18n: typeof import("../src/i18n")
const bundles: Record<string, object> = {
  "./i18n/en/home.json": { title: "Hello" },
  "./i18n/es/home.json": { title: "Hola" },
}
let fetch: ReturnType<typeof vi.fn>

beforeEach(async () => {
  vi.resetModules()
  fetch = vi.fn(async (path: string) => path in bundles
    ? new Response(JSON.stringify(bundles[path]))
    : new Response("not found", { status: 404 }))
  vi.stubGlobal("fetch", fetch)
  vi.spyOn(console, "warn").mockImplementation(() => {})
  i18n = await import("../src/i18n")
})

afterEach(() => vi.unstubAllGlobals())

describe("i18n", () => {
  it("returns empty text for unknown bundles and keys", async () => {
    expect(i18n.getText("home", "title")).toBe("")
    await i18n.loadTextBundle("home")
    expect(i18n.getText("home", "missing")).toBe("")
  })

  it("loads a bundle once for the current language", async () => {
    await i18n.loadTextBundle("home")
    await i18n.loadTextBundle("home")
    expect(i18n.getText("home", "title")).toBe("Hello")
    expect(fetch).toHaveBeenCalledOnce()
  })

  it("switches language and reloads bundles", async () => {
    await i18n.loadTextBundle("home")
    await i18n.setCurrentLanguage("es-ES", true)
    expect(i18n.getText("home", "title")).toBe("Hola")
  })

  it("falls back to English for unknown locales", async () => {
    await i18n.setCurrentLanguage("fr")
    await i18n.loadTextBundle("home")
    expect(i18n.getText("home", "title")).toBe("Hello")
  })

  it("retries and gives up quietly on missing bundles", async () => {
    await i18n.loadTextBundle("absent", false, 3)
    expect(fetch).toHaveBeenCalledTimes(3)
    expect(i18n.getText("absent", "x")).toBe("")
  })
})
