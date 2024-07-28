import { Request, Response, NextFunction } from "express";
import { Cache } from "../models/Cache";

// @desc Get all caches
// @route GET /api/caches
// @access PUBLIC
export const getCaches = async (
  req: Request,
  res: Response<
    { success: boolean; count: number; data?: any } | { error: String }
  >,
  next: NextFunction
) => {
  try {
    const caches = await Cache.find();
    return res
      .status(200)
      .json({ success: true, count: caches.length, data: caches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Create cache
// @route POST /api/caches
// @access PUBLIC
export const addCache = async (
  req: Request,
  res: Response<{ success: boolean; data?: any } | { error: String }>,
  next: NextFunction
) => {
  const { name, desc, avatar, location } = req.body;
  try {
    if (!name || !desc) {
      return res
        .status(400)
        .json({ success: false, data: "Submit valid inputs" });
    }
    const cache = await Cache.create({
      name: name,
      desc: desc,
      avatar: avatar || "",
      location: location || null,
    });
    return res.status(201).json({ success: true, data: cache });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
