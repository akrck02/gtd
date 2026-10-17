import { describe, expect, it, replace } from "./lib/test.js"
import * as browser from "../src/browser.js"

export function matching(...queries: string[]) {
  replace(window, "matchMedia", ((query: string) => ({ matches: queries.includes(query) })) as any)
}

export function userAgent(value: string) {
  Object.defineProperty(navigator, "userAgent", { get: () => value, configurable: true })
}

function restoreUserAgent() {
  delete (navigator as any).userAgent
}

describe("browser", () => {
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

  it("detects mobiles", () => {
    userAgent("Mozilla/5.0 (Linux; Android 14)")
    expect(browser.isMobile()).toBeTruthy()
    userAgent("Mozilla/5.0 (X11; Linux x86_64)")
    expect(browser.isMobile()).toBeFalsy()
    restoreUserAgent()
  })

  it("detects the operating system", () => {
    for (const [agent, os] of [["Windows NT 10.0", "Windows"], ["Macintosh", "MacOS"],
      ["X11; Linux x86_64", "Linux"], ["X11; FreeBSD", "UNIX"], ["Plan9", undefined]]) {
      userAgent(agent)
      expect(browser.getOs()).toBe(os)
    }
    restoreUserAgent()
  })
})
