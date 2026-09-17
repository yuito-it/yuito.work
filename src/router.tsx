import {
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import App from "./App";
import { works } from "./content";
import type { Locale } from "./content";

export const pages = ["home", "works", "about", "contact"] as const;
export type Page = (typeof pages)[number];
const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: () => (
    <Navigate to="/$lang/$page" params={{ lang: "ja", page: "home" }} replace />
  ),
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/$lang/$page",
      params: { lang: "ja", page: "home" },
      replace: true,
    });
  },
});
const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$lang/$page",
  params: {
    parse: ({ lang, page }): { lang: Locale; page: Page } => ({
      lang: lang === "en" ? "en" : "ja",
      page: pages.includes(page as Page) ? (page as Page) : "home",
    }),
    stringify: (params) => params,
  },
  validateSearch: (search: Record<string, unknown>): { work?: string } => ({
    work:
      typeof search.work === "string" &&
      works.some((work) => work.id === search.work)
        ? search.work
        : undefined,
  }),
  // Normalize unsupported URLs instead of displaying a mismatched address.
  beforeLoad: ({ params, location }) => {
    if (location.pathname !== `/${params.lang}/${params.page}`) {
      throw redirect({ to: "/$lang/$page", params, replace: true });
    }
  },
  component: App,
});
export const routeTree = rootRoute.addChildren([indexRoute, portfolioRoute]);
export const router = createRouter({
  routeTree,
  history: createHashHistory(),
  defaultPreload: false,
  scrollRestoration: ({ location }) =>
    !new URLSearchParams(location.searchStr).has("work"),
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
