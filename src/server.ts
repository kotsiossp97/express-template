import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@api-docs/openAPIRouter";
import errorHandler from "@common/middleware/errorHandler";
import rateLimiter from "@common/middleware/rateLimiter";
import requestLogger from "@common/middleware/requestLogger";
import { getCorsOrigin } from "@common/utils/envConfig";
import { userRouter } from "@modules/user/userRouter";

const logger = pino({ name: "server start" });
const app: Express = express();
const corsOrigin = getCorsOrigin();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(cors({ origin: corsOrigin.split(";") }));

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

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
