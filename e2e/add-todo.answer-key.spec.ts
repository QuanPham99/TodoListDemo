import { expect, test } from "@playwright/test";

/**
 * Reference solution for the BA workshop exercise in `add-todo.spec.ts`.
 * Not run by default — use: `npm run test:e2e:answer` (answer-key specs only; see `playwright.config.ts`).
 *
 * Reproduces user report: submitting the add-todo form should show the new item
 * on the dashboard. Expected to fail while AddTodoPage skips persistence.
 */
test("add todo from dashboard shows new item on dashboard", async ({ page }) => {
  const uniqueTitle = `Playwright todo ${Date.now()}`;

  await page.goto("/login");
  await page.getByLabel("Email").fill("e2e@example.com");
  await page.getByLabel("Password", { exact: false }).fill("any-password");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Coda Baevers - Mini Todolist",
    }),
  ).toBeVisible();

  await page.getByRole("main").getByRole("link", { name: "Add todo" }).click();
  await expect(page.getByRole("heading", { name: "Add todo" })).toBeVisible();

  await page.getByLabel("Todo title").fill(uniqueTitle);
  await page.getByRole("button", { name: "Save todo" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("heading", {
      name: "Coda Baevers - Mini Todolist",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("main").getByText(uniqueTitle, { exact: true }),
  ).toBeVisible();
});
