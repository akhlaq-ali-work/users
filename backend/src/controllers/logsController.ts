import { Request, Response } from "express";
import { fetchLogs, getLogCount } from "../services/logService";

export const getLogs = async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.max(1, parseInt(req.query.limit as string) || 10);

  try {
    const result = await fetchLogs(page, limit);
    res.json(result);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

export const getTotalLogCount = async (req: Request, res: Response) => {
  try {
    const count = await getLogCount();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error("Error getting log count:", error);
    res.status(500).json({ error: "Failed to get log count" });
  }
};
