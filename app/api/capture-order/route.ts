import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/paypal";
import { order } from "@/app/[locale]/types/product";
import { UpdateFilter } from "mongodb";
import { ordersCollection, servicesCollection, userCollection } from "@/app/db/collections";

export async function POST(req: Request) {
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
		await ordersCollection.updateOne({ id: data.purchase_units[0].reference_id }, { $set: { status: "Failed", capture_id: data.id } });
		// order failed

		await userCollection.findOneAndUpdate(
			{ email: data.user_email },
			{
				$set: {
					"recent_activity.$[activity].status": 1,
				},
			},
			{
				arrayFilters: [{ "activity.id": data.id }],
			},
		);

		return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
	}

	// order success
	const order = (await ordersCollection.findOneAndUpdate({ id: data.purchase_units[0].reference_id }, { $set: { status: "Completed", capture_id: data.id } })) as order | null;

	if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

	const services = order.items.map((item) => {
		{
			return {
				...item,
				status: "Active",
				active: true,
				suspended: false,
				started_at: new Date(),
				expires_at: item.type == "Domain" ? new Date(new Date().setFullYear(new Date().getFullYear() + item.years)) : new Date(new Date().setMonth(new Date().getMonth() + item.amount)),
			};
		}
	});

	const user = await userCollection.findOneAndUpdate(
		{ email: order.user_email },
		{
			$set: {
				first_purchase: false,
				cart: [],
			},
		},
		{ returnDocument: "after" },
	);

	await servicesCollection.updateMany(
		{
			id: {
				$in: services.map((e) => {
					if (e.type != "Domain") return e.id;
				}) as number[],
			},
		},
		{ $push: { users: order.user_email } },
	);

	if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

	await userCollection.findOneAndUpdate(
		{ email: order.user_email },
		{
			$set: {
				"recent_activity.$[activity].status": 2,
				"billing.$[activity].paid": true,
				monthly_spendings: user.monthly_spendings + order.amount_to_pay,
				total_spent: user.total_spent + order.amount_to_pay,
			},
			$push: {
				services: {
					$each: [...order.items].map((e) => ({
						...e,
						renew: true,
						suspended: false,
						started_at: new Date(),
						expire_at: e.type == "Domain" ? new Date(new Date().setFullYear(new Date().getFullYear() + e.years)) : new Date(new Date().setMonth(new Date().getMonth() + e.amount)),
					})),
				},
			} as UpdateFilter<Document>,
		},
		{
			arrayFilters: [{ "activity.id": order.id }],
		},
	);

	return NextResponse.json({ success: true, data });
}
