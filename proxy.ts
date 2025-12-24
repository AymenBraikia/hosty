// import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // Import the shared config

const handleI18nRouting = createMiddleware(routing);

// In Next.js 16, you should export the function as 'proxy'
// Do NOT export default if you are exporting 'proxy'
export function proxy(request: NextRequest) {
	return handleI18nRouting(request);
}

export const config = {
	// Matcher ignoring internal Next.js paths
	matcher: ["/", "/(en|fr|ar|es|ru)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
