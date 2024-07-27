import { Request, Response, NextFunction } from "express";

// @desc Get all caches
// @route GET /api/caches
// @access PUBLIC
export const getCaches = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Success" });
};
