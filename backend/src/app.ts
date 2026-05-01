import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./modules/authentication/auth.router";
import { handleError } from "./shared/middlewares/error.handler.middleware";

const app = express();

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.use(handleError)

export default app;
