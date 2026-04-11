import { expect, test } from "@playwright/test";

/**
 * Reference solution for the BA workshop exercise in `mark-todo-done.spec.ts`.
 * Not run by default — use: `npm run test:e2e:answer` (answer-key specs only; see `playwright.config.ts`).
 *
 * Reproduces user report: checking “mark complete” should move the item to Done.
 * Expected to fail while toggleTodoComplete skips updating state.
 */
const SAMPLE_TITLE = "Buy milk";

test("mark sample todo complete moves it to Done section", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("e2e@example.com");
  await page.getByLabel("Password", { exact: false }).fill("any-password");
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Coda Beavers - Mini Todolist",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("region", { name: "To do" }).getByText(SAMPLE_TITLE, { exact: true }),
  ).toBeVisible();

  await page
    .getByRole("main")
    .getByRole("checkbox", { name: new RegExp(`Mark «${SAMPLE_TITLE}» complete`) })
    .click();

  await expect(
    page.getByRole("region", { name: "To do" }).getByText(SAMPLE_TITLE, { exact: true }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("region", { name: "Done" }).getByText(SAMPLE_TITLE, { exact: true }),
  ).toBeVisible();
});
