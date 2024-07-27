import express, { Router, Request, Response } from "express";
import { getCaches } from "../controllers/caches";

const cachesRouter: Router = express.Router();

cachesRouter.get("/", getCaches);

export default cachesRouter;
