import { Locale } from "@/i18n-config";
import "server-only";

const dictionaries = {
  en: () => import("../../dictData/en.js").then((module) => module.default),
  ja: () => import("../../dictData/ja.js").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.ja();
