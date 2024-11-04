import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/config";

// 创建中间件
export default createMiddleware({
  locales,
  defaultLocale,
  // 添加此配置来处理根路径
  localePrefix: "as-needed", // 'always' | 'as-needed' | 'never'
});

// 更新匹配规则
export const config = {
  matcher: [
    // 匹配所有路径（不包括 api, _next, static 文件等）
    "/((?!api|_next|.*\\..*).*)",
    // 可选：添加更多需要匹配的路径
    "/",
  ],
};
