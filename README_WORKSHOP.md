# Workshop: AI + Automation for Stronger BA–Dev Collaboration in Bug Handling

**Using AI + Automation (Playwright + ChatGPT / Codespaces LLM) to improve BA–Dev collaboration in bug handling workflows.**

*Vietnamese version:* [README_WORKSHOP_VI.md](./README_WORKSHOP_VI.md)

---

## 1. Workshop Title

**AI-Assisted Bug Handling: From Observation to Playwright — A BA & Developer Pairing Lab**

*Subtitle (internal):* Sharpen bug reports with generative AI, hand off with less ambiguity, and leave behind tests that protect the fix.

---

## 2. Objective

Participants experience a **realistic bug-handling loop** in a safe demo application:

- **Business Analysts** practice turning messy observations into **structured, evidence-based defect reports**, then use **AI (e.g. ChatGPT or the Codespaces / Cursor LLM)** to tighten language, fill gaps, and (optionally) draft **Playwright** scenarios that encode the expected behavior.
- **Developers** use those reports to **reproduce**, **automate** (where helpful), **fix**, and **validate** — again with AI as a copilot for code and tests.
- **Product Owners** align on **acceptance intent**, **priority**, and how **automation** becomes a **regression guard** after release.

The workshop stresses **workflow**, not perfection: faster handoffs, clearer evidence, and reusable automation that survives the next refactor.

---

## 3. Learning Outcomes

By the end of this session, participants will be able to:

- **Clarify** — Separate symptoms from assumptions; write steps a stranger can follow.
- **Accelerate** — Use AI to improve wording, structure, and completeness of a bug report without losing ownership of facts.
- **Evidence** — Attach what matters (screenshots, URLs, exact labels, before/after) so Dev and PO trust the report.
- **Reuse** — Turn the same story into a **Playwright** check that fails on the bug and passes after fix.
- **Collaborate** — Experience a **1 BA + 1 Dev** rhythm: report → reproduce → test → fix → rerun.
- **Reflect** — Name what stayed manual vs what became automated, and where else this pattern applies.

---

## 4. Audience

| Role | Who they are | What they do in this workshop |
|------|----------------|-------------------------------|
| **Business Analyst (BA)** | Often non-technical to semi-technical; owns requirements and quality of handoff to engineering. | Explores the app, documents the defect using the template, uses AI to refine the report, optionally prompts a Playwright draft. |
| **Developer (Dev)** | Builds and maintains the product; comfortable with code and terminals at a basic level. | Reads the BA report, reproduces the issue, implements or refines Playwright, fixes the bug, validates with tests and the UI. |
| **Product Owner (PO)** | Owns priorities and “done”; may join as observer or rotate into a pair. | Clarifies **business impact**, **priority**, and **acceptance**; helps the pair agree when the fix is sufficient for the story. |

**Format:** Participants work in **pairs (1 BA + 1 Developer)**. The **PO** may float between pairs or debrief with the full group.

---

## 5. Tools & Setup

| Tool | Role in the workshop |
|------|------------------------|
| **GitHub Codespaces** | Prebuilt environment: Node, dependencies, browser for Playwright. Open this repo in a codespace so every pair starts from the same baseline (see `.devcontainer/devcontainer.json`). |
| **Playwright** | End-to-end browser automation. Tests live under `e2e/`. Starter files show the *intended* behavior; many will **fail** until the demo bugs are fixed — that is by design. |
| **ChatGPT (or similar)** | BA uses it to structure and improve reports; Dev uses it to suggest test code or fixes. **Always paste facts you observed** — do not ask the model to invent reproduction steps. |
| **Cursor / Copilot / Codespaces-integrated LLM** | Optional alternative to ChatGPT for the same refinement and coding tasks inside the editor. |
| **Sentry** *(optional)* | This repo may include Sentry instrumentation for demos. If enabled, BAs can note **correlation IDs** or events in **Evidence**; not required for the core exercise. |

**Pair checklist (first 10 minutes):**

- [ ] Codespace is running; terminal is at the **project root** (folder with `package.json`).
- [ ] Run `node -v` to confirm Node is available.
- [ ] If needed: `npm install`
- [ ] If Playwright reports a missing browser (local machines): `npx playwright install chromium`

---

## 6. Workshop Structure (High-Level Flow)

1. **Both** BA and Dev run the app in Codespaces (`npm run dev`) and open the forwarded URL.
2. **Together** they trigger a known issue in the UI (e.g. **Add todo** / task submission appears to succeed but the new item **does not** appear on the dashboard).
3. **BA** investigates, captures evidence, and writes a first-pass bug report.
4. **BA** uses **AI** to structure and improve the report (still owns accuracy).
5. **(Advanced)** BA prompts AI to draft a **Playwright** test similar in style to `e2e/add-todo.answer-key.spec.ts`.
6. **Dev** uses the report to **reproduce**, **write or refine** the Playwright test, and **fix** the bug (with AI support if desired).
7. **Both** rerun **Playwright** (and a quick manual smoke) to validate the fix.
8. **Whole group** (including POs) **reflects**: what improved, what stayed manual, and how this scales to real tickets.

---

## 7. Detailed Instructions by Role

### 7.1 Business Analyst (BA)

**Responsibilities**

- Represent the **user** and the **business expectation**.
- Produce a **handoff-ready** defect report (use **Section 8**).
- Use AI to **improve clarity**, not to invent facts.

**Step-by-step tasks**

1. **Observe** — With your Dev partner, sign in and walk through **Add todo**: enter a **unique** title, click **Save todo**, return to the dashboard. Note whether the new title appears.
2. **Describe (raw)** — In your own words, jot: what you clicked, what you expected, what actually happened.
3. **Create the bug report** — Copy `bug_reports/TEMPLATE.md` to a new `.md` file under `bug_reports/` (see **Section 8**); fill every field you can from observation, optionally with AI reading the template file.
4. **Use AI to improve it** — Prompt example: *“Here is my draft bug report. Improve structure and tone for a engineering handoff. Do not add steps I did not perform. Flag anything unclear.”* Paste your draft + evidence notes.
5. **(Optional / Advanced)** — Prompt AI for a **Playwright** draft: *“Given this bug report, write a Playwright test in TypeScript that logs in, adds a todo with a unique title, saves, and asserts the title appears on the dashboard. Use getByRole and getByLabel. Reference the flow in `e2e/add-todo.answer-key.spec.ts`.”* Save output to a new file under `e2e/` only after you and Dev review it.
6. **Hand off** — Send the final report (and optional test file) to your Dev partner.

**Exploration ideas** (additional defects in the demo app — log each as its own report if you find them):

- Mark a todo **complete** — does it move to **Done**?
- **Trash** delete — does the **correct** row disappear?
- **Delete all** — does the list clear?

---

### 7.2 Developer (Dev)

**Responsibilities**

- Treat the BA report as the **source of truth** for intent.
- **Reproduce** before changing code.
- Add or refine **automation** so the bug cannot silently return.

**Step-by-step tasks**

1. **Read** the BA’s bug report end-to-end; ask clarifying questions only if steps or expected result are ambiguous.
2. **Reproduce** — Follow the report exactly in the running app; confirm **actual vs expected**.
3. **Implement Playwright** — Either extend `e2e/add-todo.spec.ts`, use the BA’s AI draft, or mirror `e2e/add-todo.answer-key.spec.ts`. Prefer stable locators: `getByRole`, `getByLabel`, and `getByRole('main').…` when there are duplicate links (e.g. two “Add todo” links).
4. **Fix the bug** — Apply the minimal code change so behavior matches the report (use AI with the report + file paths + errors pasted in).
5. **Validate** — Run Playwright; confirm the test **passes** and manual steps match the BA’s **Expected result**.
6. **Brief your BA** — One paragraph: what changed, how you verified.

---

## 8. Bug Report Template (VERY IMPORTANT)

> **Note:** THIS IS A RECOMMENDATION — FEEL FREE TO IMPROVISE THE BUG REPORT TEMPLATE ON YOUR OWN (add fields, rename sections, or match your org’s Jira/Azure DevOps schema).

Store each report as a **Markdown file under `bug_reports/`** so an LLM can read the **canonical template** and your draft together and **pre-fill sections** consistently for different bugs (without you re-pasting a long block from the workshop doc).

**How to use**

1. Copy `bug_reports/TEMPLATE.md` to a new file in the same folder (for example `bug_reports/add-todo-not-visible-after-save.md`).
2. Add rough notes, URLs, repro details, or screenshot paths into that new file (or merge from a scratch note).
3. In ChatGPT, Cursor, or your Codespaces LLM, include **`bug_reports/TEMPLATE.md`** and **your new `.md`** in context (and `@` code paths if helpful). Ask the model to complete every section **only from facts you observed**—no invented reproduction steps.
4. Hand the finished `.md` to your Dev partner. You can still paste the same content into Jira, Azure DevOps, or email if your process requires it.

Folder index: `bug_reports/README.md`. Canonical headings and placeholders: **`bug_reports/TEMPLATE.md`**. (Optional Vietnamese section labels: **`bug_reports/TEMPLATE_VI.md`**.)

---

## 9. Hands-on Exercise Steps (Facilitator Script)

Use this as the **default path** for the core story (**add todo / task submission**).

1. **Start the app** (each pair, in Codespaces terminal at repo root):

```bash
npm run dev
```

Open the URL Codespaces shows (or localhost) in the browser.

2. **Reproduce** — Login → Dashboard → **Add todo** → unique title → **Save todo** → Dashboard. Confirm whether the title appears.

3. **BA** copies `bug_reports/TEMPLATE.md` to a new `.md` in `bug_reports/`, writes or pastes notes, then refines with ChatGPT / LLM using the template file in context (**Section 8**).

4. **Dev** reproduces from the report alone (BA stays quiet unless Dev is stuck).

5. **Run tests** (see failures while bugs exist):

```bash
npx playwright test
```

Run a single file:

```bash
npx playwright test e2e/add-todo.spec.ts
```

6. **Dev** implements fix + test; pair reruns:

```bash
npx playwright test
```

7. **Open HTML report** (after a run):

```bash
npx playwright show-report
```

8. **Reference specs** (optional compare / answer keys — see `playwright.config.ts`):

```bash
npm run test:e2e:answer
```

---

## 10. Advanced Challenge

- **BA:** After the written report is stable, prompt AI for a **full Playwright spec** modeled on `e2e/add-todo.answer-key.spec.ts` (login → main area navigation → unique data → assertion on dashboard).
- **Dev:** Review for **flaky selectors**, duplicate-link pitfalls, and **assertions** that match the BA’s **Expected result**; merge into `e2e/` and wire into the default run if appropriate.

Success criteria: the test **fails** on the unfixed app for the right reason, and **passes** after the fix.

---

## 11. Key Insights / Takeaways

- **AI reduces ambiguity** when it restructures drafts **you** already grounded in observation — it does not replace reproduction.
- **BA → Dev handoff improves** when every ticket has **steps**, **expected vs actual**, and **evidence** in one place.
- **Automation** turns a one-time bug into a **regression test** the whole team can run in CI later.

---

## 12. Reflection Questions

- What was **manual** before this workshop that you might still do on real projects?
- What became **automated** (or semi-automated) with Playwright and AI assistance?
- **Where else** could this pattern apply (e.g. onboarding flows, permissions, reporting exports)?
- What would **POs** need to see on a real backlog item to say “ready for release”?

---

## 13. Optional Extensions

- **Second bug** — Repeat the flow for **mark complete** (`e2e/mark-todo-done.spec.ts`) or another UI defect; second full report + test.
- **Jira / Azure DevOps** — Start from `bug_reports/TEMPLATE.md` (or your filled `.md` in `bug_reports/`); paste into your real tool; map **Severity** to your scheme; add **labels** for `playwright`, `ai-assisted`.
- **CI/CD** — Run `npx playwright test` (or `npm run test:e2e`) on pull requests so merged fixes stay protected.

---

## Quick command reference

```bash
npm run dev
npx playwright test
npx playwright test e2e/add-todo.spec.ts
npx playwright test e2e/mark-todo-done.spec.ts
npx playwright show-report
npm run test:e2e:answer
```

---

*This guide supersedes the short checklist previously in `README_WORKSHOP_TODO.md` (renamed and expanded into this document).*
