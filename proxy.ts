import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/cart", "/checkout", "/admin"];


export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) return NextResponse.next();

	if (request.headers.get("purpose") === "prefetch") return handleI18nRouting(request);

	const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`) || routing.locales.some((locale) => pathname.startsWith(`/${locale}${route}`)));

	if (isProtectedRoute) {
		const token = request.cookies.get("accessToken")?.value;

		const loginPath = "/login";
		const loginUrl = new URL(loginPath, request.url);
		if (!token) {
			loginUrl.searchParams.set("redirect", pathname);
			return NextResponse.redirect(loginUrl);
		} else
			try {
				const payload = verifyJwt(token);
				if (!payload) {
					loginUrl.searchParams.set("redirect", pathname);
					return NextResponse.redirect(loginUrl);
				}
				if (request.nextUrl.pathname.includes("/admin") || request.nextUrl.pathname.includes("/admin")) if (!payload.admin) return NextResponse.redirect(new URL("/not_found", request.url));
			} catch {
				loginUrl.searchParams.set("redirect", pathname);

				return NextResponse.redirect(loginUrl);
			}
	}

	return handleI18nRouting(request);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
