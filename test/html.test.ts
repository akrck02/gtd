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
})
