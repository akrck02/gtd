import { describe, expect, it, mock, quiet } from "./lib/test.js"
import { setSignal, connectToSignal, disconnectSignal, emitSignal } from "../src/signals.js"
import { sleep } from "../src/time.js"

describe("signals", () => {
  it("creates unique ids", () => {
    expect(setSignal() == setSignal()).toBe(false)
  })

  it("calls every handler in order with the data", async () => {
    const signal = setSignal()
    const calls: string[] = []
    connectToSignal(signal, async d => { calls.push(`a${d}`) })
    connectToSignal(signal, async d => { calls.push(`b${d}`) })
    await emitSignal(signal, 1)
    expect(calls).toEqual(["a1", "b1"])
  })

  it("waits for every handler to finish", async () => {
    const signal = setSignal()
    let done = false
    connectToSignal(signal, async () => { await sleep(10); done = true })
    await emitSignal(signal)
    expect(done).toBe(true)
  })

  it("disconnects every handler", async () => {
    const signal = setSignal()
    const handler = mock(async () => {})
    connectToSignal(signal, handler)
    disconnectSignal(signal)
    await emitSignal(signal, 1)
    expect(handler).toHaveBeenCalledTimes(0)
  })

  it("does nothing for unknown signals", async () => {
    const error = quiet("error")
    const handler = mock(async () => {})
    connectToSignal("nope", handler)
    disconnectSignal("nope")
    await emitSignal("nope", 1)
    expect(handler).toHaveBeenCalledTimes(0)
    expect(error).toHaveBeenCalledTimes(2)
  })
})
