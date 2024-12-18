export const TaskSchema = {
	userID: { type: String, required: true, default: "" },
	sublist: { type: String, default: "" },

	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	dueDate: { type: Date, default: Date.now },
	completeByDate: { type: Date, default: Date.now },
	priority: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "medium",
	},
	uuid: { type: String, default: "" },
};

// export default TaskSchema;
