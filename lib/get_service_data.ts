import { hostService } from "@/app/[locale]/types/product";
import clientPromise from "./db";
import { WithId } from "mongodb";

const collection = (await clientPromise).db("hosty").collection<hostService>("services");
export default async function get_services(ids: number | number[]): Promise<Set<WithId<hostService>> | WithId<hostService> | null> {
	const results = new Set<WithId<hostService>>([]);

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
