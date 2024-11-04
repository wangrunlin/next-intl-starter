import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    throw new Error(`Locale ${locale} is not supported`);
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
