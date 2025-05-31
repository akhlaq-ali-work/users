import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "users",
    });

    console.log("MongoDB connected to DB:", conn.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
