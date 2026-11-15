export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export function localizedPath(locale: Locale, path = "/") { return `/${locale}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`; }
