import * as Sentry from "@sentry/react";
import { reactRouterV6BrowserTracingIntegration } from "@sentry/react";
import React from "react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

const sentryDsn =
  import.meta.env.VITE_SENTRY_DSN ??
  "https://1f8446cef9fb35b12729852dcf9917e9@o4511190758850560.ingest.de.sentry.io/4511190767566928";

Sentry.init({
  dsn: sentryDsn,
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,

  // Sends default PII (e.g. automatic IP on events); see Sentry docs.
  sendDefaultPii: true,

  integrations: [
    reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      matchRoutes,
      createRoutesFromChildren,
    }),
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourapi\.io/],

  // Session Replay: 100% while developing (Sentry verify); lower in production.
  replaysSessionSampleRate: import.meta.env.DEV ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,

  enableLogs: true,
});
