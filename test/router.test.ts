import { beforeEach, describe, expect, it, vi } from "vitest"

let router: typeof import("../src/router")
let container: HTMLElement

beforeEach(async () => {
  vi.resetModules()
  vi.spyOn(console, "debug").mockImplementation(() => {})
  router = await import("../src/router")
  container = document.createElement("main")
})

describe("router", () => {
  it("shows default home and not found views", () => {
    router.showRoute("/", container)
    expect(container.innerHTML).toBe("Home page.")
    router.showRoute("/nowhere", container)
    expect(container.innerHTML).toBe("Page not found.")
  })

  it("registers home for empty and slash paths", () => {
    const home = vi.fn(async () => {})
    router.setRoute(" / ", home)
    router.showRoute("", container)
    expect(home).toHaveBeenCalledWith([], container)
  })

  it("captures $ parameters", () => {
    const user = vi.fn(async () => {})
    router.setRoute("/user/$/post/$", user)
    router.showRoute("/user/7/post/42", container)
    expect(user).toHaveBeenCalledWith(["7", "42"], container)
  })

  it("prefers the longest route", () => {
    const short = vi.fn(async () => {}), long = vi.fn(async () => {})
    router.setRoute("/docs/", short)
    router.setRoute("/docs/$", long)
    router.showRoute("/docs/intro", container)
    expect(long).toHaveBeenCalledWith(["intro"], container)
    expect(short).not.toHaveBeenCalled()
  })

  it("uses the custom not found view and clears the container", () => {
    container.innerHTML = "old"
    const notFound = vi.fn(async () => {})
    router.setNotFoundRoute(notFound)
    router.showRoute("/missing", container)
    expect(container.innerHTML).toBe("")
    expect(notFound).toHaveBeenCalledWith([], container)
  })

  it("ignores undefined paths", () => {
    router.setRoute(undefined, vi.fn())
    router.showRoute("/x", container)
    expect(container.innerHTML).toBe("Page not found.")
  })
})
