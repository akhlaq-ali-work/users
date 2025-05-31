import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import proxyRulesRoutes from "./proxyRulesRoutes";

import logsRoutes from "./logsRoutes";

const router = express.Router();
router.use("/api/auth", authRoutes);
router.use("/api/users", authMiddleware, userRoutes);
router.use("/api/proxy-rules", authMiddleware, proxyRulesRoutes);
router.use("/api/logs", authMiddleware, logsRoutes);

export default router;
