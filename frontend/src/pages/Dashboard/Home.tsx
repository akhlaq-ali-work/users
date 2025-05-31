import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, useUsers } from "../../hooks/useUsers";
import {
  useAddToWhitelist,
  useLogs,
  useLogsCount,
  useRemoveFromWhitelist,
} from "../../hooks/useLogs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 as Loader } from "lucide-react";

export default function Home() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers();
  const {
    data: logsPages,
    isLoading: logsLoading,
    isError: logsError,
  } = useLogs();
  const { data: user, isLoading: isUserLoading } = useUser(
    selectedId?.toString() || "",
    {
      enabled: selectedId !== null,
    }
  );

  const { data: logsCount } = useLogsCount();

  const addWL = useAddToWhitelist();
  const removeWL = useRemoveFromWhitelist();

  const allLogs = logsPages?.pages.flatMap((p) => p.data) ?? [];

  if (usersLoading || logsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (usersError || logsError) {
    return <div className="text-red-600">Failed to load data.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-blue-100">
          <CardHeader>
            <CardTitle className="text-base">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{users.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-base">Total Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{logsCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Recent Users</h2>
        <Table className="w-full bg-white shadow-sm rounded-sm overflow-hidden">
          <TableHeader className="bg-gray-50">
            <TableRow>
              {["ID", "Name", "Username", "Email", "Website", "View"].map(
                (h) => (
                  <TableHead key={h} className="p-2 text-xs">
                    {h}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 5).map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.website}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setSelectedId(u.id)}>
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                          Details for user ID {user?.id}
                        </DialogDescription>
                      </DialogHeader>
                      {isUserLoading && (
                        <div className="flex h-full items-center justify-center">
                          <Loader />
                        </div>
                      )}
                      {user && (
                        <div className="space-y-3 mt-4 text-sm">
                          <p>
                            <strong>Name:</strong> {user.name}
                          </p>
                          <p>
                            <strong>Username:</strong> {user.username}
                          </p>
                          <p>
                            <strong>Email:</strong> {user.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {user.phone}
                          </p>
                          <p>
                            <strong>Website:</strong> {user.website}
                          </p>

                          <div>
                            <strong>Address:</strong>
                            <p className="ml-4">
                              {user.address.street}, {user.address.suite}
                            </p>
                            <p className="ml-4">
                              {user.address.city} — {user.address.zipcode}
                            </p>
                            <p className="ml-4 text-xs text-gray-500">
                              (Lat: {user.address.geo.lat}, Lng:{" "}
                              {user.address.geo.lng})
                            </p>
                          </div>

                          <div>
                            <strong>Company:</strong>
                            <p className="ml-4">{user.company.name}</p>
                            <p className="ml-4 text-xs">
                              <em>{user.company.catchPhrase}</em>
                            </p>
                            <p className="ml-4 text-xs text-gray-500">
                              {user.company.bs}
                            </p>
                          </div>
                        </div>
                      )}

                      <DialogClose asChild>
                        <Button variant="outline" className="mt-6 w-full">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.length > 5 && (
          <div className="text-center">
            <Link to="/users">
              <Button variant="outline" size="sm" className="mt-2">
                View All Users
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Recent Logs</h2>
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
            {allLogs.slice(0, 5).map((log, i) => (
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
        {allLogs.length > 5 && (
          <div className="text-center">
            <Link to="/logs">
              <Button variant="outline" size="sm" className="mt-2">
                View All Logs
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
