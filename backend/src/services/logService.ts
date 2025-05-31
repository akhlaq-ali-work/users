import Log, { ILog } from "../models/Log";
import ProxyRule from "../models/ProxyRule";

export interface LogWithFlag {
  method: string;
  url: string;
  timestamp: Date;
  isWhitelisted: boolean;
  _id: string;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const createLog = async (method: string, url: string): Promise<void> => {
  try {
    await Log.create({
      method,
      url,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Failed to create log:", error);
  }
};

export async function fetchLogs(
  page = 1,
  limit = 10
): Promise<PaginatedResult<LogWithFlag>> {
  const skip = (page - 1) * limit;

  const logs = await Log.find()
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit)
    .lean<ILog>()
    .exec();

  const rule = await ProxyRule.findOne().lean().exec();
  const whitelist = rule?.whitelist ?? [];

  const total = await Log.countDocuments();

  const data: LogWithFlag[] = logs.map((log) => ({
    _id: log._id.toString(),
    method: log.method,
    url: log.url,
    timestamp: log.timestamp,
    isWhitelisted: whitelist.includes(log.url),
  }));

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export const getLogCount = async (): Promise<number> => {
  return await Log.countDocuments();
};
