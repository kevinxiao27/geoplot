import express, { Router } from "express";
import { addCache, deleteCache, getCacheFromPoint, getCaches, updateCache } from "../controllers/geocaches";
import { validateResults } from "../middlewares/validation";
import { body, check, param } from "express-validator";
import { isValidObjectId } from "mongoose";

const cachesRouter: Router = express.Router();
const validateId = param("id")
  .exists()
  .custom((id) => {
    return isValidObjectId(id);
  })
  .withMessage("Invalid objectid");

cachesRouter.get("/", getCaches);
cachesRouter.get(
  "/point",
  [
    body("distance").exists().isNumeric().withMessage("Distance is not a number"),
    body("location.coordinates")
      .notEmpty()
      .custom((coord) => {
        if (
          !Array.isArray(coord) ||
          coord.length != 2 ||
          !(typeof coord[0] === "number" && coord[0] === coord[0]) ||
          !(typeof coord[1] === "number" && coord[1] === coord[1]) ||
          coord[0] < -180 ||
          coord[0] > 180 ||
          coord[1] < -90 ||
          coord[1] > 90
        ) {
          throw new Error("Invalid coordinates");
        }
        return true;
      }),
    validateResults,
  ],
  getCacheFromPoint
);
cachesRouter.post(
  "/",
  [
    check(["name", "desc"]).not().isEmpty().withMessage("Title and description are empty"),
    body("location.coordinates")
      .notEmpty()
      .custom((coord) => {
        if (
          !Array.isArray(coord) ||
          coord.length != 2 ||
          !(typeof coord[0] === "number" && coord[0] === coord[0]) ||
          !(typeof coord[1] === "number" && coord[1] === coord[1]) ||
          coord[0] < -180 ||
          coord[0] > 180 ||
          coord[1] < -90 ||
          coord[1] > 90
        ) {
          throw new Error("Invalid coordinates");
        }
        return true;
      }),
    validateResults,
  ],
  addCache
);
cachesRouter.put(
  "/:id",
  [check(["name", "desc"]).not().isEmpty().withMessage("Title and description are empty"), validateId, validateResults],
  updateCache
);
cachesRouter.delete("/:id", [validateId, validateResults], deleteCache);

export default cachesRouter;
