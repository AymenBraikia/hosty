import clientPromise from "./db";

const collection = (await clientPromise).db("hosty").collection("users");

export default async function get_owned_domains(email: string): Promise<
	{
		name: string;
		reg: string;
		exp: string;
		status: boolean;
		renew: boolean;
	}[]
> {
	const domains = await collection.findOne({ email });
	return domains ? domains.domains : [];
}
