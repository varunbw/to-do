import express from "express";
import { GetTasks, CreateTask } from "../controllers/task_controller.js";

const router = express.Router();

router.get("/:userID", GetTasks);
router.post("/", CreateTask);

export default router;
