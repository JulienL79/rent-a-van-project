import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.info(`[${request.method}] - ${request.path}`);
  next();
};
