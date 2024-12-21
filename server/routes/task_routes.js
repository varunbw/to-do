import express from "express";
import {
	GetTasks,
	CreateTask,
	UpdateTask,
} from "../controllers/task_controller.js";

const router = express.Router();

router.get("/:userID", GetTasks);
router.post("/", CreateTask);
router.patch("/:uuid", UpdateTask);

export default router;
