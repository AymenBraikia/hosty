import { exts } from "@/lib/domain_pricing";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const domainBase = searchParams.get("domain")?.split(".")[0];

	if (!domainBase) {
		return NextResponse.json({ error: "Missing domain" }, { status: 400 });
	}

	const rdapUrl = "https://rdap.org/domain/";

	try {
		const checkPromises = exts.map(async (extenstion) => {
			const fullDomain = `${domainBase}${extenstion.tld}`;

			try {
				const response = await fetch(`${rdapUrl}${fullDomain}`, {
					method: "HEAD",
				});

				if (response.status === 404) return { domain: fullDomain, firstYear: extenstion.firstYear, renew: extenstion.renew, ext: extenstion.tld, available: false };
				else return { domain: fullDomain, firstYear: extenstion.firstYear, renew: extenstion.renew, ext: extenstion.tld, available: true };
			} catch {
				return { domain: fullDomain, firstYear: extenstion.firstYear, renew: extenstion.renew, ext: extenstion.tld, available: false };
			}
		});

		const cleanResults = await Promise.all(checkPromises);

		return NextResponse.json(cleanResults, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
