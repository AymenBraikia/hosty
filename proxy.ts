import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/cart", "/checkout"];

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const locale = routing.locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

	const pathnameWithoutLocale = locale ? pathname.replace(`/${locale}`, "") || "/" : pathname;

	const isProtectedRoute = protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route));

	if (isProtectedRoute) {
		const token = request.cookies.get("accessToken")?.value;

		if (!token || !verifyJwt(token)) {
			const loginPath = locale ? `/${locale}/login` : "/login";
			const loginUrl = new URL(loginPath, request.url);

			loginUrl.searchParams.set("redirect", pathname);

			return NextResponse.redirect(loginUrl);
		}
	}

	return handleI18nRouting(request);
}

export const config = {
	matcher: ["/", "/(en|fr|ar|es|ru)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
