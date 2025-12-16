import { Router } from "express";
import { pingController } from "../controllers/index.js";
const pingRouter = Router();
pingRouter.get("/", pingController.ping);
export default pingRouter;
