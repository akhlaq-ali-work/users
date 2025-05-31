import express from "express";

import dotenv from "dotenv";
import { connectDB } from "./config/db";
import router from "./routes";
import cors from "cors";
import { corsOptions } from "./utils/corsOptions";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(router);

connectDB();
export default app;
