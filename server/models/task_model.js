import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const TaskSchema = new mongoose.Schema({
	userID: { type: String, required: true, default: "" },
	sublist: { type: String, default: "" },
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	dueDate: { type: Date },
	completeByDate: { type: Date },
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "medium",
	},
	uuid: { type: String, default: uuidv4() }, // UUID generation
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
