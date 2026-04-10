import { defineConfig, devices } from "@playwright/test";

const answerKeysOnly = Boolean(process.env.PW_ANSWER_KEYS);

export default defineConfig({
  testDir: "./e2e",
  testMatch: answerKeysOnly ? "**/*.answer-key.spec.ts" : "**/*.spec.ts",
  testIgnore: answerKeysOnly ? [] : "**/*.answer-key.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
});
