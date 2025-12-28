import { client } from "./db";
import { Document, WithId } from "mongodb";

const collection = client.db("hosty").collection("services");
export default async function get_services(ids: number | number[]) {
	const results = new Set<WithId<Document> | null>([]);

	if (typeof ids === "number") {
		return await collection.findOne({ id: ids });
	} else if (Array.isArray(ids)) {
		for (const id of ids) results.add(await collection.findOne({ id }));

		return results;
	} else return null;
}
