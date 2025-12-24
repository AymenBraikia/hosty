import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "fr", "ar", "es","ru","de"], // Add all your supported languages here
	defaultLocale: "en",
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
