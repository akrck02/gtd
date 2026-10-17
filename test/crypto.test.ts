import { describe, expect, it } from "vitest"
import { uuidv4 } from "../src/crypto"

describe("uuidv4", () => {
  it("returns RFC 4122 version 4 ids", () => {
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    const ids = new Set(Array.from({ length: 200 }, uuidv4))
    expect(ids.size).toBe(200)
    for (const id of ids) expect(id).toMatch(pattern)
  })
})
