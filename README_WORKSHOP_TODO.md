# BA Workshop TODO Checklist

Use this checklist during the workshop to practice turning user bug feedback into an automated Playwright test.

---

## Goal

Build confidence in this flow:

1. Reproduce the behavior manually.
2. Use an LLM to help write the Playwright test.
3. Run and interpret test results.

---

## Prerequisites TODO

**GitHub Codespaces (this repo’s devcontainer):** dependencies, Chromium, and Playwright are already set up when the codespace finishes creating (see `.devcontainer/devcontainer.json`). You can skip extra browser installs unless the terminal tells you otherwise.

- [ ] Open the repo in GitHub Codespaces (or locally if you prefer).
- [ ] In the integrated terminal, confirm you are in the project root (folder with `package.json`).
- [ ] Confirm Node works: `node -v`
- [ ] If `node_modules` is missing (rare), run: `npm install`
- [ ] (Local machine only, if needed) `npx playwright install chromium`
- [ ] Optional smoke check: `npm run dev` and open the forwarded port for Vite

---

## Manual Verification TODO

- [ ] Go to `/login`
- [ ] Sign in with any non-empty email and password
- [ ] Open `Add todo` from dashboard
- [ ] Enter a unique todo title
- [ ] Click `Save todo`
- [ ] Confirm whether the new title appears on dashboard
- [ ] Capture your observation (bug reproduced or not)

---

## Challenge: new feature — mark todo as done (LLM test)

Same workflow as **Automation TODO**, but for a different user story: the dashboard ships with a **sample** open todo (`Sample workshop todo`). After sign-in, you mark it complete with the checkbox and expect it to show under **Done** (and no longer under **To do**). In the broken demo app, the checkbox **does not** move the item — your test should capture that gap once you assert the correct “after” state.

**Why use an LLM here**

- Practice turning **new** acceptance criteria into a Playwright test (not only the add-todo flow).
- Practice stable locators for a **named** todo and for the **To do** / **Done** sections (`getByRole('region', { name: '…' })` works with this app’s `section` + `aria-labelledby`).

**Files**

- **Edit:** `e2e/mark-todo-done.spec.ts` (starter with a placeholder error)
- **Optional compare:** `e2e/mark-todo-done.answer-key.spec.ts` (reference solution; run via `npm run test:e2e:answer`, or e.g. `PW_ANSWER_KEYS=1 npx playwright test --grep "mark sample todo"`)

**Tasks** (mirror the add-todo automation list)

- [ ] Read the user story in the comments at the top of `e2e/mark-todo-done.spec.ts`.
- [ ] Manually: sign in, find the sample todo, click its “mark complete” checkbox, note whether it appears under **Done**.
- [ ] Run `npx playwright test e2e/mark-todo-done.spec.ts`, use errors + your LLM to implement assertions (login → sample title visible under **To do** → click checkbox → expect title missing from **To do** and present under **Done**).
- [ ] Prefer `getByRole('main')`, `getByRole('region', { name: 'To do' | 'Done' })`, and the checkbox’s accessible name over brittle CSS.

---

## Automation TODO (Workshop File + LLM)

You will use **any LLM you like** (ChatGPT, Copilot, Claude, Cursor Agent, etc.) to author the test. The LLM does not need to run the app for you — you paste context and errors, then apply its suggested code in this repo.

**Files**

- **Edit:** `e2e/add-todo.spec.ts` (starter with a placeholder error)
- **Optional compare:** `e2e/add-todo.answer-key.spec.ts` (reference solution; not included in default `npx playwright test` — use `npm run test:e2e:answer` or see `playwright.config.ts`)

**Tasks**

- [ ] Open `e2e/add-todo.spec.ts` and read the starter comment (user story).
- [ ] Run the test once so you have real terminal output to discuss:
      `npx playwright test`
      (You should see a failure from the placeholder `throw new Error(...)` or from an incomplete test.)
- [ ] Copy the **full error message and stack trace** from the terminal (and, if useful, the last few lines of the Playwright report path it prints).
- [ ] In your LLM, paste or explain:
      - The user story from the comments in `e2e/add-todo.spec.ts` (and anything you noted from manual verification).
      - What you expected vs what happened when you ran `npx playwright test`.
      - The **terminal error** (and the contents of `e2e/add-todo.spec.ts` if the model should fix code).
- [ ] Ask the LLM to **write or rewrite** a complete Playwright test that: logs in, opens Add todo from the **main** dashboard area, fills a **unique** title, clicks **Save todo**, then **asserts** that the same title appears under the dashboard **main** content.
- [ ] Ask the LLM to prefer stable locators (`getByRole`, `getByLabel`) and to avoid duplicate links (there are two “Add todo” links — use `getByRole('main').getByRole('link', ...)` like the answer key).
- [ ] Replace the starter implementation in `e2e/add-todo.spec.ts` with the LLM’s version (review it — you are still responsible for correctness).
- [ ] Save the file and run again in the **Codespaces terminal**:

```bash
npx playwright test
```

- [ ] If it still fails, paste the **new** error back into the LLM, get a revised test, and repeat until the test run matches your intent (failing because the app bug exists is OK if your assertion matches the story).

---

## Test Execution TODO

- [ ] Run tests from the Codespaces terminal: `npx playwright test`
- [ ] Read and summarize the failure (or pass) in plain English for a non-developer
- [ ] Confirm whether the failure **matches** the product bug (“save succeeds but todo missing”) or is a **test/automation** problem (wrong selector, wrong URL, etc.)
- [ ] (Optional) Run only your workshop file: `npx playwright test e2e/add-todo.spec.ts`
- [ ] (Optional) Run the reference answer keys: `npm run test:e2e:answer`
- [ ] Compare your file with the answer key and note differences

---

## Analysis TODO (BA Perspective)

- [ ] Explain why this test is valuable as a regression guard
- [ ] Write what should happen before/after developer fixes bug
- [ ] Define "done" criteria for this ticket
- [ ] Add notes for release validation (UAT checklist item)

Suggested "done" criteria:

- Automated test exists and is understandable.
- Test fails on buggy behavior.
- Test passes after fix.
- Test is included in team validation workflow.

---

## Stretch Tasks (Optional)

- [ ] Add a second scenario for empty title validation.
- [ ] Add a scenario for due date handling.
- [ ] Add tags/labels in test names to group BA scenarios.
- [ ] Document trace/screenshot collection during failure.
- [ ] Draft a short bug report template for future BA submissions.

---

## Quick Command Reference (Codespaces)

Primary workflow in this workshop:

```bash
npx playwright test
```

Other useful commands:

```bash
npx playwright test e2e/add-todo.spec.ts
npx playwright test e2e/mark-todo-done.spec.ts
npm run test:e2e:answer
npm run dev
```

**Local dev machines only (if not using Codespaces):** `npm install` then `npx playwright install chromium` if Playwright reports a missing browser.

Optional npm scripts (same runner, different defaults): `npm run test:e2e`, `npm run test:e2e:answer`

---

## Workshop Completion

- [ ] I can describe the bug in business language.
- [ ] I can use an LLM to explain errors and revise the test.
- [ ] I can run the test and interpret failures.
- [ ] I can explain how this prevents regressions.
