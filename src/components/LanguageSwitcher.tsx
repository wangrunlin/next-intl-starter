"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, Locale, locales, localsDisplay } from "@/i18n/config";
import { useState, useRef } from "react";
import { useClickAway } from "@/hooks/useClickAway";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useClickAway(dropdownRef, () => setIsOpen(false));

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    const segments = pathname.split("/");

    // 处理当前在默认语言路径的情况
    const currentPath =
      locale === defaultLocale ? pathname : segments.slice(2).join("/") || "";

    // 构建新路径
    const newPath = `/${newLocale}${currentPath ? `/${currentPath}` : ""}`;

    const finalPath = newPath.replace(/\/+/g, "/");

    router.push(finalPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center gap-2"
      >
        {localsDisplay[locale as Locale]}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 w-40 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {locales.map((lang) => (
            <button
              key={lang}
              onClick={() => switchLocale(lang)}
              className={`
                w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700
                ${locale === lang ? "bg-gray-50 dark:bg-gray-700" : ""}
              `}
            >
              {localsDisplay[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
