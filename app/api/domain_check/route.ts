import { NextResponse } from "next/server";

const tldData = [
	// --- CORE & POPULAR ---
	{ extension: ".com", category: "Popular", firstYear: 12.99, renewal: 15.99 },
	{ extension: ".net", category: "Popular", firstYear: 11.5, renewal: 14.99 },
	{ extension: ".org", category: "Popular", firstYear: 13.99, renewal: 16.5 },
	{ extension: ".info", category: "Popular", firstYear: 3.99, renewal: 18.99 },
	{ extension: ".biz", category: "Popular", firstYear: 4.99, renewal: 19.99 },
	{ extension: ".me", category: "Popular", firstYear: 7.99, renewal: 19.5 },
	{ extension: ".us", category: "Popular", firstYear: 2.99, renewal: 14.99 },
	{ extension: ".co", category: "Popular", firstYear: 10.99, renewal: 29.99 },

	// --- TECH & DEVELOPER ---
	{ extension: ".io", category: "Tech", firstYear: 39.99, renewal: 44.99 },
	{ extension: ".ai", category: "Tech", firstYear: 69.99, renewal: 74.99 },
	{ extension: ".dev", category: "Tech", firstYear: 14.99, renewal: 14.99 },
	{ extension: ".tech", category: "Tech", firstYear: 4.99, renewal: 45.99 },
	{ extension: ".app", category: "Tech", firstYear: 14.5, renewal: 14.5 },
	{ extension: ".code", category: "Tech", firstYear: 29.99, renewal: 29.99 },
	{ extension: ".systems", category: "Tech", firstYear: 12.99, renewal: 24.99 },
	{ extension: ".cloud", category: "Tech", firstYear: 8.99, renewal: 28.5 },
	{ extension: ".digital", category: "Tech", firstYear: 6.99, renewal: 34.99 },
	{ extension: ".software", category: "Tech", firstYear: 9.99, renewal: 38.0 },
	{ extension: ".network", category: "Tech", firstYear: 11.99, renewal: 32.5 },
	{ extension: ".data", category: "Tech", firstYear: 15.99, renewal: 45.0 },
	{ extension: ".security", category: "Tech", firstYear: 34.99, renewal: 2450.0 }, // Premium TLD
	{ extension: ".bot", category: "Tech", firstYear: 49.99, renewal: 55.0 },

	// --- BUSINESS & COMMERCE ---
	{ extension: ".store", category: "Business", firstYear: 2.99, renewal: 49.99 },
	{ extension: ".shop", category: "Business", firstYear: 1.99, renewal: 39.99 },
	{ extension: ".online", category: "Business", firstYear: 0.99, renewal: 34.99 },
	{ extension: ".site", category: "Business", firstYear: 0.99, renewal: 29.99 },
	{ extension: ".website", category: "Business", firstYear: 1.5, renewal: 25.0 },
	{ extension: ".company", category: "Business", firstYear: 8.99, renewal: 32.0 },
	{ extension: ".agency", category: "Business", firstYear: 4.99, renewal: 28.0 },
	{ extension: ".enterprise", category: "Business", firstYear: 24.99, renewal: 45.0 },
	{ extension: ".solutions", category: "Business", firstYear: 3.99, renewal: 28.5 },
	{ extension: ".market", category: "Business", firstYear: 12.99, renewal: 35.0 },
	{ extension: ".inc", category: "Business", firstYear: 999.0, renewal: 1999.0 }, // Ultra Premium
	{ extension: ".ext", category: "Business", firstYear: 5.99, renewal: 24.99 },
	{ extension: ".limited", category: "Business", firstYear: 7.5, renewal: 28.0 },

	// --- WEB3 & MODERN ---
	{ extension: ".xyz", category: "Modern", firstYear: 1.99, renewal: 14.99 },
	{ extension: ".link", category: "Modern", firstYear: 4.5, renewal: 12.99 },
	{ extension: ".click", category: "Modern", firstYear: 2.99, renewal: 13.99 },
	{ extension: ".space", category: "Modern", firstYear: 1.5, renewal: 24.0 },
	{ extension: ".world", category: "Modern", firstYear: 3.99, renewal: 32.0 },
	{ extension: ".zone", category: "Modern", firstYear: 6.5, renewal: 34.99 },
	{ extension: ".today", category: "Modern", firstYear: 5.99, renewal: 29.99 },

	// --- CREATIVE & MEDIA ---
	{ extension: ".art", category: "Creative", firstYear: 4.99, renewal: 16.0 },
	{ extension: ".design", category: "Creative", firstYear: 5.99, renewal: 42.0 },
	{ extension: ".studio", category: "Creative", firstYear: 8.5, renewal: 29.0 },
	{ extension: ".media", category: "Creative", firstYear: 6.99, renewal: 34.99 },
	{ extension: ".live", category: "Creative", firstYear: 2.99, renewal: 25.99 },
	{ extension: ".video", category: "Creative", firstYear: 12.99, renewal: 24.5 },
	{ extension: ".stream", category: "Creative", firstYear: 8.5, renewal: 32.0 },
	{ extension: ".tv", category: "Creative", firstYear: 29.99, renewal: 34.99 },
	{ extension: ".photography", category: "Creative", firstYear: 9.99, renewal: 55.0 },
	{ extension: ".photos", category: "Creative", firstYear: 4.99, renewal: 24.0 },
	{ extension: ".ink", category: "Creative", firstYear: 3.99, renewal: 28.99 },
	{ extension: ".actor", category: "Creative", firstYear: 24.5, renewal: 35.0 },
	{ extension: ".gallery", category: "Creative", firstYear: 4.99, renewal: 22.0 },
	{ extension: ".music", category: "Creative", firstYear: 12.99, renewal: 12.99 },

	// --- SERVICES & LIFESTYLE ---
	{ extension: ".help", category: "Services", firstYear: 6.5, renewal: 29.99 },
	{ extension: ".support", category: "Services", firstYear: 3.99, renewal: 24.99 },
	{ extension: ".expert", category: "Services", firstYear: 5.99, renewal: 45.0 },
	{ extension: ".guide", category: "Services", firstYear: 6.5, renewal: 32.5 },
	{ extension: ".tips", category: "Services", firstYear: 4.99, renewal: 22.0 },
	{ extension: ".pro", category: "Services", firstYear: 3.5, renewal: 22.0 },
	{ extension: ".blog", category: "Services", firstYear: 9.99, renewal: 29.99 },
	{ extension: ".news", category: "Services", firstYear: 7.99, renewal: 29.5 },
	{ extension: ".education", category: "Services", firstYear: 14.5, renewal: 28.0 },
	{ extension: ".academy", category: "Services", firstYear: 6.99, renewal: 34.0 },
	{ extension: ".coffee", category: "Services", firstYear: 12.99, renewal: 32.5 },
	{ extension: ".fitness", category: "Services", firstYear: 4.99, renewal: 32.0 },
	{ extension: ".yoga", category: "Services", firstYear: 4.99, renewal: 32.0 },

	// --- REAL ESTATE & LOCAL ---
	{ extension: ".house", category: "Real Estate", firstYear: 8.5, renewal: 34.0 },
	{ extension: ".estate", category: "Real Estate", firstYear: 9.99, renewal: 32.0 },
	{ extension: ".properties", category: "Real Estate", firstYear: 10.5, renewal: 35.0 },
	{ extension: ".rent", category: "Real Estate", firstYear: 24.5, renewal: 65.0 },
	{ extension: ".city", category: "Real Estate", firstYear: 4.99, renewal: 19.99 },
	{ extension: ".land", category: "Real Estate", firstYear: 12.5, renewal: 35.0 },

	// --- FINANCE & LEGAL ---
	{ extension: ".cash", category: "Finance", firstYear: 12.5, renewal: 34.0 },
	{ extension: ".money", category: "Finance", firstYear: 10.99, renewal: 32.0 },
	{ extension: ".finance", category: "Finance", firstYear: 14.99, renewal: 49.99 },
	{ extension: ".tax", category: "Finance", firstYear: 16.5, renewal: 55.0 },
	{ extension: ".law", category: "Finance", firstYear: 24.99, renewal: 85.0 },
	{ extension: ".legal", category: "Finance", firstYear: 12.99, renewal: 55.0 },

	// --- GLOBAL (ccTLDs) ---
	{ extension: ".uk", category: "Global", firstYear: 6.99, renewal: 10.5 },
	{ extension: ".ca", category: "Global", firstYear: 9.99, renewal: 14.5 },
	{ extension: ".de", category: "Global", firstYear: 5.99, renewal: 12.0 },
	{ extension: ".fr", category: "Global", firstYear: 6.5, renewal: 14.0 },
	{ extension: ".in", category: "Global", firstYear: 4.99, renewal: 12.5 },
	{ extension: ".co.uk", category: "Global", firstYear: 6.99, renewal: 10.5 },
	{ extension: ".to", category: "Global", firstYear: 39.0, renewal: 45.0 },
	{ extension: ".ch", category: "Global", firstYear: 12.99, renewal: 16.0 },
];

// Create a flat list of extensions
const exts = tldData.map((tld) => {
	return { tld: tld.extension, firstYear: tld.firstYear, renew: tld.renewal };
});

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
