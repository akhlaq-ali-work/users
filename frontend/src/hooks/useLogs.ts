import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchLogs,
  addToWhitelist,
  removeFromWhitelist,
  toggleLogging,
  PaginatedLogs,
  fetchLoggingStatus,
  fetchLogsCount,
} from "../api/logs";

export const useLogs = () =>
  useInfiniteQuery<PaginatedLogs>({
    queryKey: ["logs"],
    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) => fetchLogs(pageParam, 10),

    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

export const useAddToWhitelist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWhitelist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
};

export const useRemoveFromWhitelist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromWhitelist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
};

export const useToggleLogging = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleLogging,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
};

export const useLoggingStatus = () =>
  useQuery({
    queryKey: ["loggingEnabled"],
    queryFn: fetchLoggingStatus,
  });

export const useLogsCount = () =>
  useQuery({
    queryKey: ["logCount"],
    queryFn: fetchLogsCount,
  });
