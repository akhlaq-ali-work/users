import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    name: name,
  });

  return {
    id: user._id,
    email: user.email,
    username: user.name,
  };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.name,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "60d" }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.name,
    },
  };
};
