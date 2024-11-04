import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-end mb-12">
          <LanguageSwitcher />
        </div>

        <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          {t("title")}
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("features.title")}
            </h2>
            <ul className="space-y-4">
              {["i18n", "nextjs", "typescript"].map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {t(`features.${feature}`)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {t("demo.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("demo.description")}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
