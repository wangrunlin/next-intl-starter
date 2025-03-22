import "@/app/globals.css";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/i18n/config";
import { NextIntlClientProvider } from "next-intl";

// 生成静态参数
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 生成动态元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // 设置请求的语言环境
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 设置请求的语言环境
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
