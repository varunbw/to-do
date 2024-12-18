import express from "express";
import cors from "cors";
import router from "./routes/task_routes.js";
import { ConnectToDatabase } from "./config/connection.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", router);

// Start the server only after connecting to the database
ConnectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`[INFO]: Server listening on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("[ERROR] server.js: Failed to connect to the database.");
	});
