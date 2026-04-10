import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Codespaces sets CODESPACES=true; bind so forwarded port is reachable.
  server:
    process.env.CODESPACES === "true"
      ? { host: true, strictPort: true, port: 5173 }
      : undefined,
  build: { sourcemap: "hidden" },
  plugins: [
    react(),
    ...(process.env.SENTRY_AUTH_TOKEN
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
        ]
      : []),
  ],
});
