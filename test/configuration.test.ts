import { describe, expect, it, fakeFetch, afterThis } from "./lib/test.js"
import {
  getConfiguration, loadConfiguration, setConfiguration, isConfigurationSet, isConfigurationActive,
} from "../src/configuration.js"

function cleanStorage() {
  const saved = localStorage.getItem("gtd")
  localStorage.removeItem("gtd")
  afterThis(() => null == saved ? localStorage.removeItem("gtd") : localStorage.setItem("gtd", saved))
}

describe("configuration", () => {
  it("reads nothing before anything is stored", () => {
    cleanStorage()
    expect(getConfiguration("theme")).toBe(undefined)
    expect(isConfigurationSet("theme")).toBe(false)
  })

  it("stores any JSON value under one localStorage key", () => {
    cleanStorage()
    setConfiguration("theme", "dark")
    setConfiguration("size", 18)
    setConfiguration("compact", true)
    expect(getConfiguration("theme")).toBe("dark")
    expect(getConfiguration("size")).toBe(18)
    expect(isConfigurationActive("compact")).toBe(true)
    expect(JSON.parse(localStorage.getItem("gtd"))).toEqual({ theme: "dark", size: 18, compact: true })
  })

  it("loads every key of a JSON file", async () => {
    cleanStorage()
    fakeFetch({ "./config.json": `{"theme":"light","lang":"es"}` })
    await loadConfiguration("./config.json")
    expect(getConfiguration("theme")).toBe("light")
    expect(getConfiguration("lang")).toBe("es")
  })

  it("merges a file over what is stored", async () => {
    cleanStorage()
    setConfiguration("user", "ada")
    fakeFetch({ "./config.json": `{"theme":"light"}` })
    await loadConfiguration("./config.json")
    expect(getConfiguration("user")).toBe("ada")
    expect(getConfiguration("theme")).toBe("light")
  })
})
