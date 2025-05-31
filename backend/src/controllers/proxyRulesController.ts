import { Request, Response } from "express";
import {
  addToWhitelist,
  getLoggingStatus,
  removeFromWhitelist,
  toggleLogging,
} from "../services/proxyRulesService";

export const addWhitelistUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ message: "URL is required" });
      return;
    }

    const whitelist = await addToWhitelist(url);
    res.status(200).json({ whitelist });
  } catch (error) {
    console.error("Error adding to whitelist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeWhitelistUrl = async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ message: "URL is required" });
      return;
    }

    const whitelist = await removeFromWhitelist(url);
    res.status(200).json({ whitelist });
  } catch (error) {
    console.error("Error removing from whitelist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLoggingController = async (req: Request, res: Response) => {
  try {
    const { enable } = req.body;

    if (typeof enable !== "boolean") {
      res.status(400).json({ message: "`enable` must be a boolean" });
      return;
    }

    const result = await toggleLogging(enable);
    res.status(200).json({ loggingEnabled: result });
  } catch (error) {
    console.error("Error toggling logging:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLogging = async (_req: Request, res: Response) => {
  try {
    const status = await getLoggingStatus();
    res.json({ loggingEnabled: status });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch logging status" });
  }
};
