import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateResults(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationErrors = validationResult(req);
  const errorMessages: String[] = [];

  for (const e of validationErrors.array()) {
    errorMessages.push(e.msg);
  }

  if (!validationErrors.isEmpty()) {
    return res.status(403).json({ errors: errorMessages });
  }
  next();
}
