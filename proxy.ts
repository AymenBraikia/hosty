import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/cart", "/checkout"];

// export default function proxy(request: NextRequest) {
// 	const { pathname } = request.nextUrl;

// 	if (pathname.startsWith("/api") || pathname.startsWith("/_next/")) return NextResponse.next();

// 	if (pathname.includes(".") || request.headers.get("purpose") === "prefetch") return handleI18nRouting(request);

// 	// const locale = routing.locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) || "en";

// 	const isProtectedRoute = protectedRoutes.some((route) => pathname.includes(route));

// 	// if (isProtectedRoute) {
// 	// 	const token = request.cookies.get("accessToken")?.value;

// 	// 	const loginPath = "/login";
// 	// 	const loginUrl = new URL(loginPath, request.url);
// 	// 	if (!token) {
// 	// 		loginUrl.searchParams.set("redirect", pathname);

// 	// 		return NextResponse.redirect(loginUrl);
// 	// 	} else
// 	// 		try {
// 	// 			if (!verifyJwt(token)) {
// 	// 				loginUrl.searchParams.set("redirect", pathname);
// 	// 				return NextResponse.redirect(loginUrl);
// 	// 			}
// 	// 		} catch {
// 	// 			loginUrl.searchParams.set("redirect", pathname);

// 	// 			return NextResponse.redirect(loginUrl);
// 	// 		}
// 	// }

// 	return handleI18nRouting(request);
// }

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// 1. ULTRA FAST EXIT: Ignore everything that isn't a page
	if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) return NextResponse.next();

	// 2. PREFETCH EXIT: Don't do auth/heavy logic for prefetches
	if (request.headers.get("purpose") === "prefetch") return handleI18nRouting(request);

	// 3. EFFICIENT ROUTE CHECK: Check if the path (ignoring locale) is protected
	// This handles both "/dashboard" and "/en/dashboard"
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
				if (!verifyJwt(token)) {
					loginUrl.searchParams.set("redirect", pathname);
					return NextResponse.redirect(loginUrl);
				}
			} catch {
				loginUrl.searchParams.set("redirect", pathname);

				return NextResponse.redirect(loginUrl);
			}
	}

	// 4. Return the i18n handler
	return handleI18nRouting(request);
}

export const config = {
	// Match ALL routes except static files and APIs
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
