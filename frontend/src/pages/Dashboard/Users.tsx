// src/pages/Dashboard/Users.tsx
import React, { useState } from "react";
import { useUsers, useUser } from "../../hooks/useUsers";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 as Loader } from "lucide-react";

export default function Users() {
  const { data: users = [], isLoading } = useUsers();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: user, isLoading: isUserLoading } = useUser(
    selectedId?.toString() || "",
    {
      enabled: selectedId !== null,
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h1 className="my-5 font-bold text-xl">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {["ID", "Name", "Username", "Email", "Website", "View"].map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
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
    </div>
  );
}
