import { afterEach, describe, expect, it, vi } from "vitest"
import * as browser from "../src/browser"

function matching(...queries: string[]) {
  vi.spyOn(window, "matchMedia").mockImplementation(q => ({ matches: queries.includes(q) }) as MediaQueryList)
}

function userAgent(value: string) {
  vi.spyOn(navigator, "userAgent", "get").mockReturnValue(value)
}

afterEach(() => vi.restoreAllMocks())

describe("media queries", () => {
  it("knows the device size", () => {
    matching("only screen and (max-width: 760px)")
    expect(browser.isSmallDevice()).toBe(true)
    expect(browser.isMediumDevice()).toBe(false)
    expect(browser.isLargeDevice()).toBe(false)
  })

  it("reads user preferences", () => {
    matching("(prefers-color-scheme: dark)", "(prefers-reduced-motion: reduce)")
    expect(browser.prefersDarkMode()).toBe(true)
    expect(browser.prefersLightMode()).toBe(false)
    expect(browser.prefersReducedMotion()).toBe(true)
    expect(browser.mediaQuery("(hover: none)")).toBe(false)
  })
})

describe("user agent", () => {
  it("detects mobiles", () => {
    userAgent("Mozilla/5.0 (Linux; Android 14)")
    expect(browser.isMobile()).toBeTruthy()
    userAgent("Mozilla/5.0 (X11; Linux x86_64)")
    expect(browser.isMobile()).toBeFalsy()
  })

  it("detects the operating system", () => {
    for (const [agent, os] of [["Windows NT 10.0", "Windows"], ["Macintosh", "MacOS"],
      ["X11; Linux x86_64", "Linux"], ["X11; FreeBSD", "UNIX"], ["Plan9", undefined]]) {
      userAgent(agent)
      expect(browser.getOs()).toBe(os)
    }
  })
})
