import { Router } from "express";
import { getLogs, getTotalLogCount } from "../controllers/logsController";

const router = Router();

router.get("/", getLogs);
router.get("/count", getTotalLogCount);

export default router;
