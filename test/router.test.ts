import { describe, expect, it, mock } from "./lib/test.js"
import { setRoute, setHomeRoute, setNotFoundRoute, showRoute } from "../src/router.js"

const container = () => document.createElement("main")

// the router keeps its routes for the whole page, so these tests run in order
describe("router", () => {
  it("shows default home and not found views", () => {
    const box = container()
    showRoute("/", box)
    expect(box.innerHTML).toBe("Home page.")
    showRoute("/nowhere", box)
    expect(box.innerHTML).toBe("Page not found.")
  })

  it("registers home for empty and slash paths", () => {
    const home = mock(async () => {})
    setRoute(" / ", home)
    const box = container()
    showRoute("", box)
    expect(home).toHaveBeenCalledWith([], box)
  })

  it("registers home with setHomeRoute", () => {
    const home = mock(async () => {})
    setHomeRoute(home)
    showRoute("/", container())
    expect(home).toHaveBeenCalledTimes(1)
  })

  it("captures $ parameters", () => {
    const user = mock(async () => {})
    setRoute("/user/$/post/$", user)
    const box = container()
    showRoute("/user/7/post/42", box)
    expect(user).toHaveBeenCalledWith(["7", "42"], box)
  })

  it("prefers the longest route", () => {
    const short = mock(async () => {}), long = mock(async () => {})
    setRoute("/docs/", short)
    setRoute("/docs/$", long)
    const box = container()
    showRoute("/docs/intro", box)
    expect(long).toHaveBeenCalledWith(["intro"], box)
    expect(short).toHaveBeenCalledTimes(0)
  })

  it("clears the container unless told not to", () => {
    setRoute("/append", async (_, box) => { box.append("new") })
    const box = container()
    box.innerHTML = "old"
    showRoute("/append", box, false)
    expect(box.innerHTML).toBe("oldnew")
    showRoute("/append", box)
    expect(box.innerHTML).toBe("new")
  })

  it("uses the custom not found view", () => {
    const notFound = mock(async () => {})
    setNotFoundRoute(notFound)
    const box = container()
    showRoute("/missing", box)
    expect(notFound).toHaveBeenCalledWith([], box)
  })
})
