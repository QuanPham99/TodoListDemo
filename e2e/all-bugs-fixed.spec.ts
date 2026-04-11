import { expect, test, type Page } from "@playwright/test";

const DASHBOARD_HEADING = "Coda Beavers - Mini Todolist";

async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("e2e@example.com");
  await page.getByLabel("Password", { exact: false }).fill("any-password");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(
    page.getByRole("heading", { name: DASHBOARD_HEADING }),
  ).toBeVisible();
}

test("toggle complete moves todo to Done section", async ({ page }) => {
  await login(page);

  const title = "Buy milk";

  await expect(
    page.getByRole("region", { name: "To do" }).getByText(title, { exact: true }),
  ).toBeVisible();

  await page
    .getByRole("main")
    .getByRole("checkbox", { name: new RegExp(`Mark «${title}» complete`) })
    .click();

  await expect(
    page.getByRole("region", { name: "To do" }).getByText(title, { exact: true }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("region", { name: "Done" }).getByText(title, { exact: true }),
  ).toBeVisible();
});

test("add todo persists and shows on dashboard", async ({ page }) => {
  await login(page);

  await page.getByRole("main").getByRole("link", { name: "Add todo" }).click();
  await expect(page.getByRole("heading", { name: "Add todo" })).toBeVisible();

  await page.getByLabel("Todo title").fill("Walk the dog");
  await page.getByRole("button", { name: "Save todo" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(
    page.getByRole("main").getByText("Walk the dog", { exact: true }),
  ).toBeVisible();
});

test("delete all removes every todo", async ({ page }) => {
  await login(page);

  await page.getByRole("button", { name: "Delete all" }).click();

  await expect(
    page.getByRole("region", { name: "To do" }).getByText("No open todos"),
  ).toBeVisible();

  await expect(
    page.getByRole("region", { name: "Done" }).getByText("No completed todos yet"),
  ).toBeVisible();
});

test("delete correct item removes only that item", async ({ page }) => {
  await login(page);

  await page
    .getByRole("button", { name: "Delete Buy milk" })
    .click();

  await expect(
    page.getByRole("main").getByText("Buy milk", { exact: true }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("main").getByText("Buy eggs", { exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("main").getByText("Buy bread", { exact: true }),
  ).toBeVisible();
});

test("edit title updates the displayed title", async ({ page }) => {
  await login(page);

  await page
    .getByRole("button", { name: "Edit Buy eggs" })
    .click();

  const editInput = page.getByRole("textbox", { name: /Edit title for «Buy eggs»/ });
  await editInput.clear();
  await editInput.fill("Buy organic eggs");

  await page.getByRole("button", { name: "Save" }).click();

  await expect(
    page.getByRole("main").getByText("Buy organic eggs", { exact: true }),
  ).toBeVisible();

  await expect(
    page.getByRole("main").getByText("Buy eggs", { exact: true }),
  ).toHaveCount(0);
});

test("logout resets todos to seed list", async ({ page }) => {
  await login(page);

  // Delete a todo so the list is modified
  await page
    .getByRole("button", { name: "Delete Buy milk" })
    .click();

  await expect(
    page.getByRole("main").getByText("Buy milk", { exact: true }),
  ).toHaveCount(0);

  // Log out
  await page.getByRole("button", { name: "Log out" }).click();

  // Log back in
  await login(page);

  // Verify the full seed list is back
  await expect(
    page.getByRole("main").getByText("Buy milk", { exact: true }),
  ).toBeVisible();
});
