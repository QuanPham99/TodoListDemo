# Mini Todo — demo app for turning bug reports into automated tests

This repository is intentionally small: a React todo app plus Playwright end-to-end exercises. The goal is to show **how someone in a Business Analyst (BA) or product role** can connect **real user bug feedback** to a **repeatable, automated check** that developers and QA can run on every change.

**Facilitator / workshop guide:** [README_WORKSHOP.md](./README_WORKSHOP.md) (English) · [README_WORKSHOP_VI.md](./README_WORKSHOP_VI.md) (Tiếng Việt) — AI-assisted BA–Dev pairing, bug report template, and Playwright flow.

---

## What this project is for

- **Users** experience a problem (for example: “I click add todo but nothing shows up”).
- **You** turn that into a **clear expected behavior** (acceptance criterion) and a **step-by-step reproduction**.
- **Automation** encodes those steps so the same scenario runs in a browser **without manual clicking every time**.
- When the bug is fixed, the test **passes** and becomes a **regression guard**: if the bug comes back, the test fails early.

The app includes **known defects** on purpose: submitting “Add todo” does not persist new items, and marking the sample todo **complete** does not update the list. Workshop tests are written to **expect the correct behavior**, so they **fail** until each defect is fixed.

---

## How the application flow works

1. **Sign in** (`/login`)  
   Demo login: any non-empty email and password are accepted. The app stores the session in memory (no real backend).

2. **Todo dashboard** (`/dashboard`)  
   Lists open todos under “To do” and completed ones under “Done”. A **sample** todo is seeded so “mark complete” can be tried without using Add todo. The header includes a primary **Add todo** link that goes to the add form.  
   **Expected behavior:** checking an open item moves it to “Done”.  
   **Current demo behavior:** the completion toggle does **not** update state, so the sample item stays under “To do”.

3. **Add todo** (`/add-todo`)  
   User enters a **Todo title** (required) and optional **Due date**, then clicks **Save todo**.  
   **Expected behavior:** after save, the user returns to the dashboard and sees the new todo under “To do”.  
   **Current demo behavior:** the form submits and navigates back, but the new todo is **not** saved to state — so only the seeded item(s) remain. That mismatch is what the add-todo automated test catches.

Navigation also includes a header **Add todo** link from every authenticated page; the automated test uses the **main** dashboard button to avoid clicking the nav twice by mistake.

---

## The automated tests (Playwright)

- **Add todo exercise:** `e2e/add-todo.spec.ts` — implement with an AI partner; answer key `e2e/add-todo.answer-key.spec.ts`.
- **Mark done exercise:** `e2e/mark-todo-done.spec.ts` — seed todo + checkbox; answer key `e2e/mark-todo-done.answer-key.spec.ts`.
- **Default run:** `npm run test:e2e` runs every non-answer `*.spec.ts` in `e2e/` (both starters **fail** until participants replace the placeholder throws and/or the app is fixed).
- **Answer keys only:** `npm run test:e2e:answer` sets `PW_ANSWER_KEYS=1` (see `playwright.config.ts`) so reference specs run; they still **fail** while the intentional app bugs exist.

Selectors favor **role and label** (for example “Log in”, “Todo title”, “Save todo”, `getByRole('region', { name: 'Done' })`) so automation stays close to how users and assistive tech describe the UI.

---

## Prerequisites

- **Node.js** (the project targets a current LTS; check with `node -v`).
- **npm** (comes with Node).

---

## Setup (first time on a machine)

From the project root:

```bash
npm install
npx playwright install chromium
```

`npm install` adds dependencies. `playwright install chromium` downloads the browser Playwright drives for tests (one-time per environment unless versions change).

---

## Run the app locally (manual exploration)

```bash
npm run dev
```

Open the URL Vite prints (default `http://127.0.0.1:5173`). Walk through login → dashboard → Add todo → Save todo and observe that the new item does not appear — that is the bug scenario the test encodes.

---

## Run the automated test

```bash
npm run test:e2e
```

Playwright starts (or reuses) the dev server, runs the **workshop** specs in `e2e/`, then prints pass or fail.

Reference solutions only:

```bash
npm run test:e2e:answer
```

- **Fail (today):** answer keys assert correct product behavior; the demo app still skips persisting new todos and skips updating completion, so those assertions fail until each bug is fixed.
- **Pass (after fixes):** implementing `addTodo` on submit and restoring `toggleTodoComplete` state updates turns the same tests green and guards against regressions.

In CI, set `CI=1` so the config uses stricter Playwright defaults (for example no reuse of an already-running dev server). Locally, an existing `npm run dev` can be reused when `CI` is unset.

---

## GitHub Codespaces

This repo is set up so you can work in a browser-based dev environment without installing Node or Playwright browsers on your laptop.

1. **Configuration** — `.devcontainer/devcontainer.json` uses the Microsoft **Node 20** dev image, forwards port **5173**, runs `npm install` and `npx playwright install chromium --with-deps` after the container is created (so Chromium and Linux libs needed for Playwright are present).
2. **Vite in Codespaces** — GitHub sets `CODESPACES=true` in the environment. `vite.config.ts` listens on all interfaces in that case so the **Ports** tab / forwarded URL can reach the dev server.
3. **Using it** — Push the repository to GitHub, open the repo on github.com, choose **Code → Codespaces → Create codespace on …** (your account or organization must have [Codespaces enabled](https://docs.github.com/en/codespaces/developing-in-a-codespace/creating-a-codespace-for-a-repository) and billing where required). After setup finishes, run `npm run dev` and open the **5173** URL when prompted, or run `npm run test:e2e` in the terminal.
4. **Optional polish** — Repository settings → **Codespaces** can define default secrets or machine types for the team; you do not need that for this demo to work.

---

## Step-by-step: from bug feedback to this test (BA-friendly)

Use this as a template when a user emails or tickets: “Add todo doesn’t work.”

| Step | What you do | In this repo |
|------|-------------|--------------|
| 1 | **Capture the complaint in plain language** | “After I save a new todo, I don’t see it on my list.” |
| 2 | **Define expected behavior (acceptance criterion)** | “Given I am logged in, when I create a todo with a title and save, then I see that title on the dashboard under open items.” |
| 3 | **List reproduction steps** | Login → Dashboard → Add todo → enter title → Save todo → land on dashboard → look for the title. |
| 4 | **Note environment** | Browser, URL, account type; here it’s the local demo and any demo credentials. |
| 5 | **Translate steps to automation** | Each manual step becomes one or more Playwright lines: `goto` login, `fill` fields, `click` buttons, `expect` visibility of the title in `main`. |
| 6 | **Use stable selectors** | Prefer labels and roles (`getByLabel`, `getByRole`) so tests survive minor CSS changes. |
| 7 | **Run the test** | `npm run test:e2e` — failing means “bug still there or test wrong”; passing after a fix means “automation can guard this story.” |

You do not need to write every test yourself; **your** artifact is often steps 1–4 in the ticket or refinement doc. Engineers fold that into code like `e2e/add-todo.spec.ts` (workshop starter) or the answer key at `e2e/add-todo.answer-key.spec.ts`. The closer your written steps match user language (“Save todo”, “dashboard”), the easier handoff is.

---

## Project layout (short)

- `src/` — React app (pages, layout, in-memory todo context).
- `e2e/` — Playwright tests.
- `playwright.config.ts` — test runner config, including starting `npm run dev` before tests.
- `.devcontainer/` — GitHub Codespaces / VS Code Dev Containers definition.

---

## Summary

This project demonstrates a full loop: **user bug** → **clear scenario** → **Playwright test that encodes the scenario** → **red test while broken, green test when fixed**. For BA and product roles, the README flow is meant to show **why** automation helps (repeatability, regression) and **how** your written reproduction steps map directly to executable checks.
