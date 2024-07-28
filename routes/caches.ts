import express, { Router, Request, Response } from "express";
import { addCache, getCaches } from "../controllers/caches";
import { validateResults } from "../middlewares/validation";
import { check } from "express-validator";

const cachesRouter: Router = express.Router();

cachesRouter.get("/", getCaches);
cachesRouter.post(
  "/",
  [check(["name", "desc"]).not().isEmpty(), validateResults],
  addCache
);

export default cachesRouter;
