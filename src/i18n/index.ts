import type { UIStrings } from "./types";

export { tplStr } from "./format";

const modules = import.meta.glob<{ default: UIStrings }>("./lang/*.ts", {
  eager: true,
});

const translations: Record<string, UIStrings> = {};
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.slice("./lang/".length, -".ts".length);
  translations[locale] = mod.default;
}

/** 요청한 번역이 없을 때 한국어를 기본값으로 사용합니다. */
export function useTranslations(locale: string = "ko"): UIStrings {
  return translations[locale] ?? translations["ko"];
}
