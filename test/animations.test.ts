import { describe, expect, it, afterThis } from "./lib/test.js"
import Animations from "../src/animations.js"

describe("animations", () => {
  it("does nothing while disabled", async () => {
    const text = document.createElement("p")
    text.textContent = "Hello"
    await Animations.typing(text)
    expect(text.textContent).toBe("Hello")
  })

  it("types the text back letter by letter", async () => {
    Animations.enabled = true
    afterThis(() => Animations.enabled = false)
    const text = document.createElement("p")
    text.textContent = "Hi"
    document.body.append(text)
    afterThis(() => text.remove())
    await Animations.typing(text)
    expect(text.textContent).toBe("Hi")
  })

  it("adds the show class", async () => {
    const box = document.createElement("div")
    await Animations.show(box)
    expect(box.classList.contains("show")).toBe(true)
  })
})
