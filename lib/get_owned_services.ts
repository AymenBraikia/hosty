import { hostService } from "@/app/[locale]/types/product";
import clientPromise from "./db";
import { WithId } from "mongodb";

const collection = (await clientPromise).db("hosty").collection("services");

export default async function get_owned_services(email:string) {

	const services = ((await collection.find({}).toArray()) as WithId<hostService>[]).filter((s) => s.users.includes(email));
	return services;
}
