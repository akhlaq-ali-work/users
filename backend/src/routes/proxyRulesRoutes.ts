import express from "express";
import { logMiddleware } from "../middlewares/logMiddleware";
import {
  addWhitelistUrl,
  getLogging,
  removeWhitelistUrl,
  toggleLoggingController,
} from "../controllers/proxyRulesController";

const router = express.Router();

router.patch("/whitelist/add", logMiddleware, addWhitelistUrl);
router.patch("/whitelist/remove", logMiddleware, removeWhitelistUrl);
router.patch("/toggle-logging", logMiddleware, toggleLoggingController);
router.get("/logging-status", getLogging);

export default router;
