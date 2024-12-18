import express from "express";
const router = express.Router();
import { GetTasks, CreateTask } from "../controllers/task_controller.js";

router.get("/:userID", GetTasks);
router.post("/", CreateTask);

export default router;
