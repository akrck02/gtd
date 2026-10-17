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

  it("types children one after the other, keeping them", async () => {
    Animations.enabled = true
    afterThis(() => Animations.enabled = false)
    const box = document.createElement("div")
    box.innerHTML = "<h1>Hi</h1><p>there</p>"
    document.body.append(box)
    afterThis(() => box.remove())
    await Animations.typing(box)
    expect(box.innerHTML).toBe("<h1>Hi</h1><p>there</p>")
  })

  it("adds the show class", async () => {
    const box = document.createElement("div")
    await Animations.show(box)
    expect(box.classList.contains("show")).toBe(true)
  })
})
