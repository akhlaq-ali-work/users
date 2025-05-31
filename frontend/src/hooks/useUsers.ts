import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUserById } from "../api/users";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useUser = (id: string, p0: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};
