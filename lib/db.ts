// import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = process.env.MONGO_URI || "";

// export const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });

// if (!uri) throw new Error("Please add your Mongo URI to .env");

// async function run() {
// 	try {
// 		await client.connect();

// 		await client.db("admin").command({ ping: 1 });
// 		console.log("Pinged your deployment. You successfully connected to MongoDB!");
// 	} catch (e) {
// 		console.error(e);
// 	} finally {
// 		console.log("MongoDB is ready to use!");
// 	}
// }
// run().catch(console.dir);

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI || "";
if (!uri) throw new Error("Please add your Mongo URI to .env");

const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
