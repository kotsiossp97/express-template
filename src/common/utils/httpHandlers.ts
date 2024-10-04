import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ZodError, ZodSchema } from "zod";

import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { getEnvVar } from "@common/utils/envConfig";
import { logger } from "@src/server";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateHeaderJWT = () => (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("No authorization token provided");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No authorization token provided");
    }
    const jwtSecretKey: string = getEnvVar("JWT_SECRET_KEY", "string");
    const decodedToken: any = jwt.verify(token, jwtSecretKey);
    if (!decodedToken || !decodedToken.userId) {
      throw new Error("Invalid JWT token");
    }
    next();
  } catch (err) {
    logger.error(`Error validating JWT token: ${(err as Error).message}`);
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send(new ServiceResponse(ResponseStatus.Failed, "Invalid JWT token", null, StatusCodes.UNAUTHORIZED));
  }
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors.map((e) => e.message).join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    res.status(statusCode).send(new ServiceResponse<null>(ResponseStatus.Failed, errorMessage, null, statusCode));
  }
};
