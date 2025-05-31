import { Request, Response } from "express";
import { fetchAllUsers, fetchUserById } from "../services/userService";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await fetchUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
