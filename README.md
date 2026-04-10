# Mini Todo — demo app for turning bug reports into automated tests

This repository is intentionally small: a React todo app plus one Playwright end-to-end test. The goal is to show **how someone in a Business Analyst (BA) or product role** can connect **real user bug feedback** to a **repeatable, automated check** that developers and QA can run on every change.

---

## What this project is for

- **Users** experience a problem (for example: “I click add todo but nothing shows up”).
- **You** turn that into a **clear expected behavior** (acceptance criterion) and a **step-by-step reproduction**.
- **Automation** encodes those steps so the same scenario runs in a browser **without manual clicking every time**.
- When the bug is fixed, the test **passes** and becomes a **regression guard**: if the bug comes back, the test fails early.

The app includes a **known defect** on purpose: submitting “Add todo” does not persist the item to the dashboard. The Playwright test is written to **expect the correct behavior**, so it **fails** until that defect is fixed — exactly the signal you want when validating a user report.

---

## How the application flow works

1. **Sign in** (`/login`)  
   Demo login: any non-empty email and password are accepted. The app stores the session in memory (no real backend).

2. **Todo dashboard** (`/dashboard`)  
   Lists open todos under “To do” and completed ones under “Done”. The header includes a primary **Add todo** link that goes to the add form.

3. **Add todo** (`/add-todo`)  
   User enters a **Todo title** (required) and optional **Due date**, then clicks **Save todo**.  
   **Expected behavior:** after save, the user returns to the dashboard and sees the new todo under “To do”.  
   **Current demo behavior:** the form submits and navigates back, but the todo is **not** saved to state — so the dashboard still looks empty. That mismatch is what the automated test catches.

Navigation also includes a header **Add todo** link from every authenticated page; the automated test uses the **main** dashboard button to avoid clicking the nav twice by mistake.

---

## The automated test (Playwright)

- **File:** `e2e/add-todo.spec.ts`
- **Name:** `add todo from dashboard shows new item on dashboard`
- **Idea:** Do exactly what a user would do: log in, open Add todo, type a unique title, save, then **assert** that title appears on the dashboard.

The test uses **role and label** selectors (for example “Log in”, “Todo title”, “Save todo”) so it stays close to how accessibility tools — and humans — describe the UI.

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

Playwright starts (or reuses) the dev server, runs the test in Chromium, then prints pass or fail.

- **Fail (today):** the test expects the new todo **on the dashboard**; the demo app does not persist it, so the assertion times out. That **confirms** the automation matches the user complaint.
- **Pass (after a fix):** once the app calls the real “add todo” behavior before navigating away, the same test should turn green and protect against the bug returning.

In CI, set `CI=1` so the config uses stricter Playwright defaults (for example no reuse of an already-running dev server). Locally, an existing `npm run dev` can be reused when `CI` is unset.

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

You do not need to write every test yourself; **your** artifact is often steps 1–4 in the ticket or refinement doc. Engineers fold that into code like `e2e/add-todo.spec.ts`. The closer your written steps match user language (“Save todo”, “dashboard”), the easier handoff is.

---

## Project layout (short)

- `src/` — React app (pages, layout, in-memory todo context).
- `e2e/` — Playwright tests.
- `playwright.config.ts` — test runner config, including starting `npm run dev` before tests.

---

## Summary

This project demonstrates a full loop: **user bug** → **clear scenario** → **Playwright test that encodes the scenario** → **red test while broken, green test when fixed**. For BA and product roles, the README flow is meant to show **why** automation helps (repeatability, regression) and **how** your written reproduction steps map directly to executable checks.
