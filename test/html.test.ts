import { describe, expect, it } from "./lib/test.js"
import { Html } from "../src/html.js"
import { BubbleUI } from "../src/bubble.js"
import { uiComponent } from "../src/dom.js"

describe("html and bubble", () => {
  it("names tags and classes for uiComponent", () => {
    const element = uiComponent({ type: Html.Section, classes: [BubbleUI.BoxColumn, BubbleUI.BoxCenter] })
    expect(element.tagName).toBe("SECTION")
    expect(element.className).toBe("box-column box-center")
  })

  it("names only classes that exist in the Bubble UI stylesheet", () => {
    // XMLHttpRequest also reads files when the page is opened from file://
    // (bin/test.sh allows it; a page opened by double click may not, then this test is skipped)
    let css = ""
    try {
      const request = new XMLHttpRequest()
      request.open("GET", "../styles/bubbleui-v3.0.0.css", false)
      request.send()
      css = request.responseText
    } catch {
      return
    }
    expect(css.length > 1000).toBe(true)
    for (const name of Object.values(BubbleUI))
      expect(css.includes(`.${name}`) ? name : `missing .${name}`).toBe(name)
  })
})
