import { openAPIRouter } from "@api-docs/openAPIRouter";
import errorHandler from "@common/middleware/errorHandler";
import rateLimiter from "@common/middleware/rateLimiter";
import requestLogger from "@common/middleware/requestLogger";
import { userRouter } from "@modules/user/userRouter";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import path from "path";
import { pino } from "pino";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const logger = pino({ name: "server start" });
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

// Routes
app.use("/users", userRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
