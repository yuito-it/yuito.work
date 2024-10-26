import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator はプレーンオブジェクトを期待しているため、ヘッダーを変換する必要があります
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: readonly string[] = i18n.locales;

  // Negotiator と intl-localematcher を使用して最適なロケールを取得
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // `/_next/` と `/api/` はウォッチャーによって無視されますが、`public` 内のファイルは手動で無視する必要があります。
  // もし存在する場合
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/robots.txt',
      '/sitemap.xml',
      '/img/'
    ].includes(pathname)
  ) return;

  // パス名にサポートされているロケールが含まれているかどうかを確認
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // ロケールがない場合はリダイレクト
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // 例えば、リクエストが /products の場合
    // 新しいURLは /en-US/products になります
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
