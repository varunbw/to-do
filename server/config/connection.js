import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI || "";

let db;

async function ConnectToDatabase() {
	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
		tls: true,
		tlsAllowInvalidCertificates: false,
	});
	try {
		// Connect the client to the server
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"[INFO]: Pinged your deployment. You successfully connected to MongoDB!"
		);

		// Set the database instance
		db = client.db("todo");
	} catch (err) {
		console.error("[ERROR] ConnectToDatabase(): MongoDB connection failed!");
		console.error(err);
		process.exit(1); // Exit the process if the connection fails
	}
}

export { ConnectToDatabase, db };
