import { Router } from "express";
import { addressesController } from "../controllers/index.js";
const addressesRouter = Router();
addressesRouter.get("/city/:content", addressesController.getCity);
addressesRouter.get("/coord/:code", addressesController.getCoord);
export default addressesRouter;
