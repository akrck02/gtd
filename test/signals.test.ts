import { describe, expect, it, vi } from "vitest"
import { setSignal, connectToSignal, emitSignal } from "../src/signals"

describe("signals", () => {
  it("creates unique ids", () => {
    expect(setSignal()).not.toBe(setSignal())
  })

  it("calls every handler in order with the data", async () => {
    const signal = setSignal()
    const calls: string[] = []
    connectToSignal(signal, async d => { calls.push(`a${d}`) })
    connectToSignal(signal, async d => { calls.push(`b${d}`) })
    await emitSignal(signal, 1)
    expect(calls).toEqual(["a1", "b1"])
  })

  it("does nothing for unknown signals", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    const handler = vi.fn()
    connectToSignal("nope", handler)
    await emitSignal("nope", 1)
    expect(handler).not.toHaveBeenCalled()
    expect(error).toHaveBeenCalledOnce()
  })
})
