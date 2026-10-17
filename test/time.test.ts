import { describe, expect, it } from "./lib/test.js"
import { sleep, sleepIf } from "../src/time.js"

describe("time", () => {
  it("sleeps for the given milliseconds", async () => {
    const start = performance.now()
    await sleep(30)
    expect(performance.now() - start >= 25).toBe(true)
  })

  it("only sleeps when the condition holds", async () => {
    const start = performance.now()
    await sleepIf(200, false)
    expect(performance.now() - start < 150).toBe(true)
    await sleepIf(30, true)
    expect(performance.now() - start >= 25).toBe(true)
  })
})
