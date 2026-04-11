# Complete Bug Report — Coda Baevers Mini Todolist

**Date:** 2026-04-11
**Audited by:** Code analysis + browser verification (localhost:5173)

---

## Critical / High Severity

### Bug 1: Toggle complete is a no-op
- **File:** `src/context/AppContext.tsx:57-62`
- **Description:** `toggleTodoComplete` callback has an empty function body — the actual state update is commented out. Clicking a checkbox has zero effect; items never move between "To do" and "Done" sections.
- **Reproduction:** Log in > Dashboard > Click any todo checkbox > Observe counter stays unchanged, item stays under "To do".
- **Expected:** Checking a todo should move it to the "Done" section and update the counter.

### Bug 2: Add todo not persisted
- **File:** `src/pages/AddTodoPage.tsx:19-43`
- **Description:** `handleSubmit` navigates back to `/dashboard` but never calls `addTodo()` from the app context. The todo is silently lost.
- **Reproduction:** Log in > Click "Add todo" > Enter a title > Click "Save todo" > Observe the new item does not appear on the dashboard.
- **Expected:** After saving, the new todo should appear under "To do" on the dashboard.

### Bug 3: "Delete all" is a no-op
- **File:** `src/context/AppContext.tsx:64-66`
- **Description:** `deleteAllTodos` callback has an empty function body. The "Delete all" button does nothing.
- **Reproduction:** Log in > Dashboard > Click "Delete all" > Observe all items remain.
- **Expected:** All todos should be removed from the list.

### Bug 4: Delete removes a random item
- **File:** `src/context/AppContext.tsx:68-75`
- **Description:** `deleteTodo` ignores the `id` parameter and instead removes a todo at a random index using `Math.random()`.
- **Reproduction:** Log in > Dashboard > Click the trash icon on "Buy milk" > Observe a different item may be deleted instead.
- **Expected:** The specific todo whose trash icon was clicked should be removed.

### Bug 5: Edit mangles the title
- **File:** `src/context/AppContext.tsx:77-90`
- **Description:** `updateTodoTitle` ignores the `newTitle` parameter. Instead, it takes the original title, PascalCases each word, concatenates them, and duplicates the result (e.g., "Buy milk" becomes "BuyMilk BuyMilk").
- **Reproduction:** Log in > Dashboard > Click pencil on any todo > Type a new title > Click "Save" > Observe the title is mangled, not updated.
- **Expected:** The todo title should be updated to the new text the user typed.

---

## Medium Severity

### Bug 6: Logout doesn't clear todos
- **File:** `src/components/Layout.tsx:9`
- **Description:** `handleLogout` sets `userEmail` to `null` but does not reset the `todos` state. If another user logs in, they see the previous user's todo list (including any modifications).
- **Reproduction:** Log in as user A > Delete some todos > Log out > Log in as user B > Observe user A's modified todo list.
- **Expected:** Logging out should reset the todo list to the default seed data, or each user session should have isolated state.

---

## Low Severity

### Bug 7: Add todo navigation doesn't use `replace: true`
- **File:** `src/pages/AddTodoPage.tsx:43`
- **Description:** After submitting, `navigate("/dashboard")` is called without `{ replace: true }`. The browser back button returns to the add-todo form with stale state. The LoginPage correctly uses `replace: true` for its navigation.
- **Expected:** Navigation after form submission should replace the history entry.

### Bug 8: Edit input not auto-focused
- **File:** `src/pages/DashboardPage.tsx:102`
- **Description:** When clicking the pencil icon to edit a todo, the inline text input appears but is not auto-focused. The user must click the input again to start typing.
- **Expected:** The edit input should receive focus automatically when editing begins.

### Bug 9: Misleading cursor on todo label
- **File:** `src/index.css:253`
- **Description:** `.todo-label` has `cursor: pointer` on the entire label container, but only the checkbox is interactive. Clicking the title text does not toggle completion, creating a misleading affordance.
- **Expected:** Either make the entire label clickable, or restrict `cursor: pointer` to just the checkbox.

### Bug 10: "Baevers" typo in app title
- **Files:** `src/pages/DashboardPage.tsx:6`, `src/components/Layout.tsx:16`, `index.html:6`
- **Description:** The app title reads "Coda Baevers" — likely a misspelling of "Beavers". Appears in three locations.
- **Expected:** Consistent, correctly spelled app title.

---

## Test Coverage Gaps

| Bug | Has e2e test? | Has bug report? |
|-----|--------------|-----------------|
| Bug 1 (toggle complete) | Yes (answer-key) | No |
| Bug 2 (add todo) | Yes (answer-key) | Yes |
| Bug 3 (delete all) | **No** | **No** |
| Bug 4 (delete wrong item) | **No** | **No** |
| Bug 5 (edit mangles) | **No** | **No** |
| Bug 6 (logout state) | **No** | **No** |

Workshop test stubs (`add-todo.spec.ts`, `mark-todo-done.spec.ts`) just `throw` — only the answer-key specs contain real test logic. Only Chromium is tested (no cross-browser coverage).
