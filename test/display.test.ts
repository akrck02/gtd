import { describe, expect, it, afterThis } from "./lib/test.js"
import isMobileDisplay, { checkDisplayType } from "../src/display.js"
import { matching } from "./browser.test.js"

describe("display", () => {
  it("marks the page as mobile or desktop", () => {
    const saved = localStorage.getItem("gtd")
    afterThis(() => null == saved ? localStorage.removeItem("gtd") : localStorage.setItem("gtd", saved))
    afterThis(() => delete document.documentElement.dataset.display)

    matching("only screen and (max-width: 760px)")
    checkDisplayType()
    expect(document.documentElement.dataset.display).toBe("mobile")
    expect(isMobileDisplay()).toBe(true)

    matching("only screen and (min-width: 1025px)")
    checkDisplayType()
    expect(document.documentElement.dataset.display).toBe("desktop")
    expect(isMobileDisplay()).toBe(false)
  })
})
