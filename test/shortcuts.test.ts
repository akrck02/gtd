import { describe, expect, it, mock } from "./lib/test.js"
import Shortcuts, { KeyInteraction } from "../src/shortcuts.js"

function press(target: EventTarget, init: KeyboardEventInit, type = "keydown") {
  target.dispatchEvent(new KeyboardEvent(type, { bubbles: true, ...init }))
}

describe("shortcuts", () => {
  it("calls the callback for its key combination", () => {
    const area = document.createElement("div")
    const save = mock(() => {})
    const context = Shortcuts.register(area)
    Shortcuts.set(context, { interaction: KeyInteraction.keyDown, key: "s", ctrlKey: true, callback: save })

    press(area, { key: "s" })
    press(area, { key: "s", ctrlKey: true }, "keyup")
    press(area, { key: "s", ctrlKey: true })
    expect(save).toHaveBeenCalledTimes(1)
  })

  it("ignores repeats unless repeatable", () => {
    const area = document.createElement("div")
    const once = mock(() => {}), many = mock(() => {})
    const context = Shortcuts.register(area)
    Shortcuts.set(context, { interaction: KeyInteraction.keyDown, key: "a", callback: once })
    Shortcuts.set(context, { interaction: KeyInteraction.keyDown, key: "b", callback: many, repeatable: true })

    press(area, { key: "a", repeat: true })
    press(area, { key: "b", repeat: true })
    expect(once).toHaveBeenCalledTimes(0)
    expect(many).toHaveBeenCalledTimes(1)
  })

  it("can skip text fields and prevent the browser's action", () => {
    const area = document.createElement("div")
    const input = document.createElement("input")
    area.append(input)
    const search = mock(() => {})
    const context = Shortcuts.register(area)
    Shortcuts.set(context, {
      interaction: KeyInteraction.keyDown, key: "k", ctrlKey: true, callback: search,
      omitEditableContent: true, preventDefault: true,
    })

    press(input, { key: "k", ctrlKey: true })
    expect(search).toHaveBeenCalledTimes(0)

    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, cancelable: true })
    area.dispatchEvent(event)
    expect(search).toHaveBeenCalledTimes(1)
    expect(event.defaultPrevented).toBe(true)
  })
})
