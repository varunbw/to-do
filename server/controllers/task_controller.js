import Task from '../models/task_model.js';

export const GetTasks = async (req, res) => {
	const tasks = await Task.find();
	res.json(tasks);
};

export const CreateTask = async (req, res) => {
	const task = new Task(req.body);
	await task.save();
	res.status(201).json(task);
};

