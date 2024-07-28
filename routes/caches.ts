import express, { Router, Request, Response } from "express";
import {
  addCache,
  deleteCache,
  getCaches,
  updateCache,
} from "../controllers/caches";
import { validateResults } from "../middlewares/validation";
import { check, param } from "express-validator";
import { isValidObjectId } from "mongoose";

const cachesRouter: Router = express.Router();
const validateId = param("id")
  .exists()
  .custom((id) => {
    if (!isValidObjectId(id)) {
      throw new Error("Invalid cache id used to index");
    }
  });

cachesRouter.get("/", getCaches);
cachesRouter.post(
  "/",
  [check(["name", "desc"]).not().isEmpty(), validateResults],
  addCache
);
cachesRouter.put(
  "/:id",
  [check(["name", "desc"]).not().isEmpty(), validateId, validateResults],
  updateCache
);
cachesRouter.delete("/:id", [validateId, validateResults], deleteCache);

export default cachesRouter;
