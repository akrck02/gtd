import { describe, expect, it, mock, afterThis } from "./lib/test.js"
import {
  uiComponent, setDomAttributes, removeDomAttributes, setDomClasses, removeDomClasses,
  setDomStyles, removeDomStyles, setDomEvents, removeDomEvents, setDomDataset,
  removeDomDataset, removeDomById, removeAllDomBySelector,
} from "../src/dom.js"

function sandbox(html = ""): HTMLElement {
  const box = document.createElement("div")
  box.innerHTML = html
  document.body.append(box)
  afterThis(() => box.remove())
  return box
}

describe("dom", () => {
  describe("uiComponent", () => {
    it("creates an empty div by default", () => {
      const element = uiComponent()
      expect(element.tagName).toBe("DIV")
      expect(element.innerHTML).toBe("")
      expect(element.hasAttribute("id")).toBe(false)
    })

    it("applies every property", () => {
      const element = uiComponent({
        type: "h1", text: "Hello", id: "title", classes: ["a", "b"],
        attributes: { title: "tip" }, styles: { color: "red" }, data: { topic: "code" },
      })
      expect(element.tagName).toBe("H1")
      expect(element.textContent).toBe("Hello")
      expect(element.id).toBe("title")
      expect([...element.classList]).toEqual(["a", "b"])
      expect(element.getAttribute("title")).toBe("tip")
      expect(element.style.color).toBe("red")
      expect(element.dataset.topic).toBe("code")
    })

    it("only blocks selection when selectable is false", () => {
      expect(uiComponent({}).style.userSelect).toBe("")
      expect(uiComponent({ selectable: false }).style.userSelect).toBe("none")
    })
  })

  describe("attributes, classes, styles and data", () => {
    it("sets and removes attributes", () => {
      const element = document.createElement("img")
      setDomAttributes(element, { src: "cat.png", alt: "cat" })
      removeDomAttributes(element, ["alt"])
      expect(element.getAttribute("src")).toBe("cat.png")
      expect(element.hasAttribute("alt")).toBe(false)
    })

    it("sets and removes classes", () => {
      const element = document.createElement("div")
      setDomClasses(element, ["a", "b", "c"])
      removeDomClasses(element, ["b"])
      expect([...element.classList]).toEqual(["a", "c"])
    })

    it("sets and removes styles", () => {
      const element = document.createElement("div")
      setDomStyles(element, { color: "red", backgroundColor: "blue" })
      removeDomStyles(element, ["color", "background-color"])
      expect(element.style.color).toBe("")
      expect(element.style.backgroundColor).toBe("")
    })

    it("sets and removes dataset entries", () => {
      const element = document.createElement("div")
      setDomDataset(element, { topic: "code", language: "ts" })
      removeDomDataset(element, ["topic"])
      expect(element.dataset.topic).toBe(undefined)
      expect(element.dataset.language).toBe("ts")
    })

    it("returns the element untouched when given nothing", () => {
      const element = document.createElement("div")
      for (const fn of [setDomAttributes, removeDomAttributes, setDomClasses, removeDomClasses,
        setDomStyles, removeDomStyles, setDomEvents, removeDomEvents, setDomDataset, removeDomDataset])
        expect(fn(element, undefined)).toBe(element)
      expect(element.outerHTML).toBe("<div></div>")
    })
  })

  describe("events", () => {
    it("adds and removes listeners", () => {
      const element = document.createElement("button")
      const click = mock(() => {})
      setDomEvents(element, { click })
      element.click()
      removeDomEvents(element, { click })
      element.click()
      expect(click).toHaveBeenCalledTimes(1)
    })
  })

  describe("removing elements", () => {
    it("removes by id", () => {
      const box = sandbox(`<p id="gtd-a"></p><p id="gtd-b"></p>`)
      removeDomById("gtd-a")
      removeDomById("missing")
      removeDomById(undefined)
      expect(box.innerHTML).toBe(`<p id="gtd-b"></p>`)
    })

    it("removes every match of a selector and counts them", () => {
      const box = sandbox(`<p class="gtd-x"></p><p class="gtd-x"></p><p></p>`)
      expect(removeAllDomBySelector(".gtd-x")).toBe(2)
      expect(removeAllDomBySelector(".gtd-x")).toBe(0)
      expect(removeAllDomBySelector(undefined)).toBe(0)
      expect(box.children.length).toBe(1)
    })
  })
})
