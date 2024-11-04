export const locales = [
  "en",
  "zh",
  "es",
  "ar",
  "fr",
  "de",
  "ja",
  "ru",
  "pt",
  "hi",
  "id",
  "ms",
  "ko",
] as const;

export const localsDisplay: Record<Locale, string> = {
  en: "English",
  zh: "简体中文",
  es: "Español",
  ar: "العربية",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  ru: "Русский",
  pt: "Português",
  hi: "हिंदी",
  id: "Indonesia",
  ms: "Bahasa Melayu",
  ko: "한국어",
} as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
