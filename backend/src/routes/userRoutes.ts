import express from "express";
import { getAllUsers, getUserById } from "../controllers/userController";
import { logMiddleware } from "../middlewares/logMiddleware";

const router = express.Router();

router.get("/", logMiddleware, getAllUsers);
router.get("/:id", logMiddleware, getUserById);

export default router;
