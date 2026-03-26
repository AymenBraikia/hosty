import clientPromise from "./db";
import { Document, WithId } from "mongodb";

const collection = (await clientPromise).db("hosty").collection("services");
export default async function get_services(ids: number | number[]) {
	const results = new Set<WithId<Document>>([]);

	if (typeof ids === "number") {
		return await collection.findOne({ id: ids });
	} else if (Array.isArray(ids)) {
		for (const id of ids) {
			const res = await collection.findOne({ id });
			if (res) results.add(res);
		}

		return results;
	} else return null;
}
