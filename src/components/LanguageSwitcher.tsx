"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, Locale, locales, localsDisplay } from "@/i18n/config";
import { useState, useRef, KeyboardEvent } from "react";
import { useClickAway } from "@/hooks/useClickAway";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  // 关闭下拉菜单
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // 处理下拉菜单按钮的键盘事件
  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) {
          optionRefs.current[0]?.focus();
        }
        break;
      case "ArrowDown":
        if (isOpen) {
          e.preventDefault();
          optionRefs.current[0]?.focus();
        }
        break;
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          closeDropdown();
        }
        break;
    }
  };

  // 处理选项的键盘事件
  const handleOptionKeyDown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        switchLocale(locales[index]);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (index > 0) {
          optionRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (index < locales.length - 1) {
          optionRefs.current[index + 1]?.focus();
        }
        break;
      case "Escape":
        e.preventDefault();
        closeDropdown();
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center gap-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
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
        <div
          className="absolute top-full mt-1 w-40 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
        >
          {locales.map((lang, index) => (
            <button
              key={lang}
              ref={(el) => {
                if (el) {
                  optionRefs.current[index] = el;
                }
              }}
              onClick={() => switchLocale(lang)}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              className={`
                w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700
                ${locale === lang ? "bg-gray-50 dark:bg-gray-700" : ""}
              `}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              {localsDisplay[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
