import { Request, Response, NextFunction } from "express";
import ProxyRule from "../models/ProxyRule";
import { createLog } from "../services/logService";

export const logMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rule = await ProxyRule.findOne();

    if (rule && !rule.loggingEnabled) return next();

    const isWhitelisted = rule?.whitelist.includes(req.originalUrl);
    if (isWhitelisted) return next();

    await createLog(req.method, req.originalUrl);
  } catch (err) {
    console.error("Logging failed:", err);
  }

  next();
};
