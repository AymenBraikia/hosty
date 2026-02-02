import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/paypal";
import clientPromise from "@/lib/db";
import { order } from "@/app/[locale]/types/product";
import { UpdateFilter } from "mongodb";

export async function POST(req: Request) {
	const client = await clientPromise;
	const { orderID } = await req.json();
	const token = await getAccessToken();

	const res = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	const data = await res.json();

	// optional: validate amount, currency, status
	if (data.status !== "COMPLETED") {
		console.log("Payment not completed:", data);
		await client
			.db("hosty")
			.collection("orders")
			.updateOne({ id: data.purchase_units[0].reference_id }, { $set: { status: "Failed", capture_id: data.id } });
		// order failed
		return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
	}

	// order success
	const order = (await client
		.db("hosty")
		.collection("orders")
		.findOneAndUpdate({ id: data.purchase_units[0].reference_id }, { $set: { status: "Completed", capture_id: data.id } })) as order | null;

	if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

	const services = order.items.map((item) => {
		{
			return {
				...item,
				status: "Active",
				started_at: new Date(),
				expires_at: item.type == "Domain" ? new Date(new Date().setFullYear(new Date().getFullYear() + item.amount)) : new Date(new Date().setMonth(new Date().getMonth() + item.amount)),
			};
		}
	});

	const user = await client
		.db("hosty")
		.collection("users")
		.findOneAndUpdate(
			{ email: order.user_email },
			{
				$set: {
					first_purchase: false,
					cart: [],
				},
				$push: {
					services: { $each: services },
				} as UpdateFilter<Document>,
			},
			{ returnDocument: "after" },
		);

	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	return NextResponse.json({ success: true, data });
}
