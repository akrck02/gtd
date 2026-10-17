import { run } from "./lib/test.js"
import "./animations.test.js"
import "./browser.test.js"
import "./configuration.test.js"
import "./crypto.test.js"
import "./display.test.js"
import "./dom.test.js"
import "./html.test.js"
import "./http.test.js"
import "./i18n.test.js"
import "./icons.test.js"
import "./paths.test.js"
import "./router.test.js"
import "./shortcuts.test.js"
import "./signals.test.js"
import "./time.test.js"

run().then(report)

function report(results: Awaited<ReturnType<typeof run>>) {
const failed = results.filter(result => result.error)

// a visual report, for people
const report = document.getElementById("report")
let suite = ""
for (const result of results) {
  if (result.suite != suite) {
    suite = result.suite
    const heading = document.createElement("h2")
    heading.textContent = suite
    report.append(heading)
  }
  const line = document.createElement("p")
  line.className = result.error ? "fail" : "pass"
  line.textContent = `${result.error ? "✗" : "✓"} ${result.name}${result.error ? ` — ${result.error}` : ""}`
  report.append(line)
}

const summary = document.getElementById("summary")
summary.className = failed.length ? "fail" : "pass"
summary.textContent = failed.length
  ? `${failed.length} of ${results.length} tests failed`
  : `All ${results.length} tests passed`

// a plain text report, for bin/test.sh
const text = document.createElement("pre")
text.id = "results"
text.hidden = true
text.textContent = [
  ...results.map(r => `${r.error ? "FAIL" : "PASS"} ${r.suite} › ${r.name}${r.error ? `: ${r.error}` : ""}`),
  `RESULT ${results.length - failed.length}/${results.length}`,
].join("\n")
document.body.append(text)
}
