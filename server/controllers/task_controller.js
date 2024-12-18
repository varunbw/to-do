import { v4 as uuidv4 } from "uuid";
import Task from "../models/task_model.js";
import { db } from "../config/connection.js";

const collectionName = "tasks";

async function GetCollectionFromDB() {
	try {
		return await db.collection(collectionName);
	} catch (err) {
		console.error(`[ERROR] GetCollectionFromDB(): Error accessing collection`);
	}
}

async function GetUserTasksFromDB(givenUserID) {
	try {
		const collection = await GetCollectionFromDB();
		const userTasks = await collection.find({ userID: givenUserID }).toArray();
		return userTasks;
	} catch (err) {
		console.error(`[ERROR] GetUserTasksFromDB(): Could not fetch tasks`, err);
	}
}

/*
	Get all tasks of a particular user
	Requires the userID to search the collection

	Returns
	- status 404 if no tasks are found for the user
	- status 200 if tasks are found, along with the tasks themselves
*/
export const GetTasks = async (req, res) => {
	try {
		const userID = req.params.userID;
		const userTasks = await GetUserTasksFromDB(userID);

		if (!userTasks || userTasks.length == 0) {
			return res.status(404).send("No tasks found");
		}

		res.status(200).send(userTasks);
	} catch (err) {
		console.error("[ERROR]: GetTasks(): ", err);
	}
};

export const CreateTask = async (req, res) => {
	try {
		const newTask = new Task({
			userID: req.body.userID,
			sublist: req.body.sublist,
			title: req.body.title,
			completed: req.body.completed,
			createdAt: req.body.createdAt,
			dueDate: req.body.dueDate,
			completeByDate: req.body.completeByDate,
			priority: req.body.priority,
			uuid: uuidv4(),
		});

		const collection = await GetCollectionFromDB();
		console.log(typeof collection);

		await collection.insertOne(newTask.toObject());

		console.log(`[LOG] Created Task`, newTask.uuid);

		res.status(201).send("Task created");
	} catch (err) {
		console.error("[ERROR] CreateTask(): ", err);
	}
};
