import { Request, Response } from "express";
import { register, login } from "../services/authService";

import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(
      req.body.email,
      req.body.password,
      req.body.name
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering user: " + error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const data = await login(req.body.email, req.body.password);
    res
      .cookie("token", data.token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 24 * 60 * 60 * 1000,
      })
      .json(data);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

export const checkAuth = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ isAuthenticated: false });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    res.json({ isAuthenticated: true });
  } catch {
    res.status(401).json({ isAuthenticated: false });
  }
};
