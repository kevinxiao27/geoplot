import { Request, Response, NextFunction } from "express";
import { GeoCache } from "../models/GeoCache";

// @desc Get all caches
// @route GET /api/geocaches
// @access PUBLIC
export const getCaches = async (
  req: Request,
  res: Response<
    { success: boolean; count: number; data?: any } | { error: String }
  >,
  next: NextFunction
) => {
  try {
    const caches = await GeoCache.find();
    return res
      .status(200)
      .json({ success: true, count: caches.length, data: caches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Get caches certain distance away from point
// @route GET /api/geocaches
// @access PUBLIC
export const getCacheFromPoint = async (
  req: Request,
  res: Response<
    { success: boolean; count: number; data?: any } | { error: String }
  >,
  next: NextFunction
) => {
  const { distance, location } = req.body;
  try {
    const caches = await GeoCache.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: location.coordinates },
          distanceField: "dist.calculated",
          maxDistance: distance * 1000,
          includeLocs: "dist.location",
          spherical: true,
        },
      },
    ]);
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
    const cache = await GeoCache.create({
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

// @desc Update cache
// @route PUT /api/caches/:id
// @access PUBLIC
export const updateCache = async (
  req: Request,
  res: Response<{ success: boolean; data?: any } | { error: String }>,
  next: NextFunction
) => {
  const id = req.params.id as String;
  const { name, desc, avatar, location } = req.body;
  try {
    const cache = await GeoCache.findByIdAndUpdate(id, {
      ...(name && { name }),
      ...(desc && { desc }),
      ...(avatar && { avatar }),
      ...(location && { location }),
    });
    return res.status(201).json({ success: true, data: cache });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Internal server error, ${err}` });
  }
};

// @desc Delete cache
// @route DEL /api/caches/:id
// @access PUBLIC
export const deleteCache = async (
  req: Request,
  res: Response<{ success: boolean; data?: any } | { error: String }>,
  next: NextFunction
) => {
  const id = req.params.id as String;
  try {
    const cache = await GeoCache.findByIdAndDelete(id);
    return res.status(201).json({ success: true, data: cache });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Internal server error, ${err}` });
  }
};
