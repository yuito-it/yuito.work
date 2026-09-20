import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import { works } from "./content";
import type { Locale } from "./content";

import { pageNames } from "./seo/metadata";
export const pages = pageNames;
export type Page = (typeof pages)[number];
const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFoundPage,
});
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({
      to: "/$lang/$page/",
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
  // Unsupported language/page pairs are real missing pages.
  beforeLoad: ({ params, location }) => {
    if (
      location.pathname.replace(/\/$/, "") !==
      `${import.meta.env.BASE_URL}${params.lang}/${params.page}`
    ) {
      throw notFound();
    }
  },
  component: App,
  notFoundComponent: NotFoundPage,
});
export const routeTree = rootRoute.addChildren([indexRoute, portfolioRoute]);
// Preserve old shared hash links, including a selected work.
const legacy = window.location.hash.match(
  /^#\/(ja|en)\/(home|works|about|contact)\/?(\?[^#]*)?$/,
);
if (legacy)
  window.history.replaceState(
    window.history.state,
    "",
    `${import.meta.env.BASE_URL}${legacy[1]}/${legacy[2]}/${legacy[3] || ""}`,
  );
export const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
  basepath: import.meta.env.BASE_URL,
  trailingSlash: "always",
  defaultPreload: false,
  scrollRestoration: ({ location }) =>
    !new URLSearchParams(location.searchStr).has("work"),
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
