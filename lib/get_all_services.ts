import { hostService } from "@/app/[locale]/types/product";
import clientPromise from "./db";
import { WithId } from "mongodb";

const collection = (await clientPromise).db("hosty").collection<hostService>("services");

export default async function get_all_services(): Promise<WithId<hostService>[]> {
	return await collection.find({}).toArray();
}
