import {
  useLogs,
  useAddToWhitelist,
  useRemoveFromWhitelist,
  useToggleLogging,
  useLoggingStatus,
} from "../../hooks/useLogs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2 as Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function Logs() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useLogs();

  const addWL = useAddToWhitelist();
  const removeWL = useRemoveFromWhitelist();
  const toggleLog = useToggleLogging();

  const { data: loggingEnabled } = useLoggingStatus();

  const [localToggleStatus, setLocalToggleStatus] = useState<boolean>(false);

  useEffect(() => {
    if (loggingEnabled !== undefined) {
      setLocalToggleStatus(loggingEnabled);
    }
  }, [loggingEnabled]);

  const handleToggle = (newVal: boolean) => {
    setLocalToggleStatus(newVal);
    toggleLog.mutate(newVal);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const allLogs = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      <h1 className="my-5 font-bold text-xl">Logs</h1>
      <div className="flex items-center space-x-2">
        <div>
          <p>{localToggleStatus ? "Disable Logging" : "Enable Logging"}</p>
        </div>
        <Switch checked={localToggleStatus} onCheckedChange={handleToggle} />
      </div>

      <div className="space-y-2 mt-4">
        <Table className="w-full bg-white shadow-sm rounded-sm overflow-hidden">
          <TableHeader className="bg-gray-50">
            <TableRow>
              {["#", "Method", "URL", "Timestamp", "Whitelist Action"].map(
                (h) => (
                  <TableHead key={h} className="p-2 text-xs">
                    {h}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allLogs.map((log, i) => (
              <TableRow key={i} className="hover:bg-gray-100">
                <TableCell className="p-2 text-sm">{i + 1}</TableCell>
                <TableCell className="p-2 text-sm">{log.method}</TableCell>
                <TableCell className="p-2 text-sm truncate">
                  {log.url}
                </TableCell>
                <TableCell className="p-2 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <div>
                  {log.isWhitelisted ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className=" mt-2 mb-2"
                      onClick={() => removeWL.mutate(log.url)}
                      disabled={removeWL.isPending}
                    >
                      {removeWL.isPending ? "Removing" : "Remove"}
                    </Button>
                  ) : (
                    <Button
                      className=" mt-2 mb-2"
                      size="sm"
                      onClick={() => addWL.mutate(log.url)}
                      disabled={addWL.isPending}
                    >
                      {addWL.isPending ? "Adding..." : "Add"}
                    </Button>
                  )}
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {hasNextPage && (
        <div className="text-center mt-4">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more…" : "Load More Logs"}
          </Button>
        </div>
      )}
    </div>
  );
}
