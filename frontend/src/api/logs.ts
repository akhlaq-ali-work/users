import axiosInstance from "../utils/axiosInstance";

export interface ILog {
  method: string;
  url: string;
  timestamp: string;
  isWhitelisted: boolean;
}

export interface PaginatedLogs {
  data: ILog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const fetchLogs = async (
  page: number,
  limit: number
): Promise<PaginatedLogs> => {
  const response = await axiosInstance.get<PaginatedLogs>("/api/logs", {
    params: { page, limit },
  });
  return response.data;
};

export const addToWhitelist = async (url: string) => {
  const response = await axiosInstance.patch("/api/proxy-rules/whitelist/add", {
    url,
  });
  return response.data;
};

export const removeFromWhitelist = async (url: string) => {
  const response = await axiosInstance.patch(
    "/api/proxy-rules/whitelist/remove",
    {
      url,
    }
  );
  return response.data;
};

export const toggleLogging = async (enable: boolean) => {
  const response = await axiosInstance.patch(
    "/api/proxy-rules/toggle-logging",
    {
      enable,
    }
  );
  return response.data;
};

export const fetchLoggingStatus = async () => {
  const response = await axiosInstance.get("/api/proxy-rules/logging-status");
  return response.data.loggingEnabled;
};

export const fetchLogsCount = async () => {
  const response = await axiosInstance.get("/api/logs/count");
  return response.data.total;
};
