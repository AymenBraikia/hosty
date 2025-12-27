import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json({ error: "Missing fields" }, { status: 400 });
		}

		// do your logic (db, auth, etc.)
		return NextResponse.json({ success: true }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 500 });
	}
}
