// i18n/routing.ts
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "fr", "ar", "es", "ru", "de"],
	defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
