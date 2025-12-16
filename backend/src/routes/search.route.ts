import { Router } from "express";
import { searchController } from "../controllers/index.js";

const searchRouter = Router();

searchRouter.post("/results", searchController.searchVehicles);

export default searchRouter;
