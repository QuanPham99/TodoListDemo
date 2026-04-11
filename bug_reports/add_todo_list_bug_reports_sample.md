# Bug report

> Sample filled from `TEMPLATE.md` — workshop example: **Add todo** does not appear on the dashboard after save.

## Title

New todo title does not appear on the dashboard after clicking “Save todo”

## Business Context

Any user who creates a task through **Add todo** expects their work to be saved. The workflow appears to complete (user returns to the dashboard), but the new item is missing. This blocks core task capture and erodes trust in “save” actions. If released, users would lose tasks they believe they filed.

## Preconditions

- Environment: GitHub Codespaces (or local `npm run dev`), Vite dev server URL shown in terminal / forwarded port
- Account / data: Demo login — any non-empty **Email** and **Password** on `/login`
- Version / branch: Workshop demo app (`main` or current workshop branch)

## Steps to Reproduce

1. Open the app and go to `/login`. Enter any email (e.g. `analyst@example.com`) and any password; click **Log in**.
2. On the dashboard, click **Add todo** (from the main area or nav).
3. On **Add todo**, enter a **unique** title (e.g. `Workshop item 2026-04-11-001`) and optionally a due date; click **Save todo**.
4. Confirm you are returned to the dashboard (`/dashboard`). Scroll the **To do** list and look for the exact title you entered.

## Expected Result

After **Save todo**, the dashboard should list the new todo under **To do** with the same title the user entered. The user should be able to continue working with that item (e.g. mark complete later).

## Actual Result

The app navigates back to the dashboard, but the **To do** section only shows previously seeded items (e.g. grocery-style defaults). The **new title does not appear** anywhere on the dashboard.

## Severity

**High** — Primary “create task” path appears successful but data is not reflected in the main list; users cannot rely on the feature.

## Priority

**P1** — Core flow for the product; should be fixed before any release that advertises task creation.

## Evidence

- Manual repro: repeatable on every save with a unique string (easy to search for on the page).
- Optional: screenshot of Add todo form with title filled + screenshot of dashboard missing that title (attach paths or images if your process requires).
- `n/a` for server logs in this demo (in-memory client app); browser console may show navigation without errors.

## *Advanced:* Playwright recreation test

I encoded the same user journey in **Playwright** so Dev can see an **automated repro** (not only manual steps). Playwright starts the dev server from config (`npm run dev` on `http://127.0.0.1:5173`) unless a server is already running (`playwright.config.ts`).

- **Story covered:** Log in → open **Add todo** from the **main** dashboard area → fill a **unique** title → **Save todo** → assert that title appears under the dashboard **main** content.
- **Reference implementation:** Same flow as `e2e/add-todo.answer-key.spec.ts` (workshop reference spec).

**Commands I ran** (repository root):

```bash
# Run only the add-todo answer-key scenario (answer-key specs need PW_ANSWER_KEYS)
npm run test:e2e:answer -- --grep "add todo from dashboard"
```

```bash
# Alternative equivalent
PW_ANSWER_KEYS=1 npx playwright test e2e/add-todo.answer-key.spec.ts
```

```bash
# After a failing run — open HTML report (trace/screenshots if configured)
npx playwright show-report
```

- **Outcome:** Test **failed** while the product bug is present: assertion that the new todo title appears in `main` does not pass (title missing on dashboard). This matches **Actual result** above.
- **What this proves for Dev:** The defect is **reproducible headlessly**; fixing persistence should turn this scenario **green** without changing the test’s intent.

## Recommendation

- **Engineering:** Ensure the add-todo submit path persists the new item into shared app state (e.g. context/store) before or when navigating to the dashboard; align with how seeded todos are loaded.
- **Acceptance / automation:** Add or extend a Playwright test: login → **Add todo** from main → unique title → **Save todo** → assert title visible under **To do** (see `e2e/add-todo.answer-key.spec.ts` for reference flow).
- **Release notes (after fix):** “Saving a new todo now correctly shows the item on your dashboard.”
