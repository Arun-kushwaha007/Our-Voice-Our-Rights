import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import { NODE_ENV } from "../config/env";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(err?.stack || err);

  const statusCode = err?.statusCode ?? 500;
  const message = err?.message ?? "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(NODE_ENV === "development" && { stack: err?.stack }),
  });
};
