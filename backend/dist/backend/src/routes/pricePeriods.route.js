import { Router } from "express";
import { pricePeriodsController } from "../controllers/index.js";
import { isAdminOrOwner, isAuthenticated } from "../middlewares/index.js";
import { pricePeriods, vehicles } from "../schemas/index.js";
const pricePeriodsRouter = Router();
pricePeriodsRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(pricePeriods),
  pricePeriodsController.getAll,
);
pricePeriodsRouter.get(
  "/vehicles/:id",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  pricePeriodsController.getByVehicleId,
);
pricePeriodsRouter.get("/:id", pricePeriodsController.get);
pricePeriodsRouter.post(
  "/",
  isAuthenticated(true),
  pricePeriodsController.create,
);
pricePeriodsRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(pricePeriods),
  pricePeriodsController.update,
);
pricePeriodsRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(pricePeriods),
  pricePeriodsController.delete,
);
export default pricePeriodsRouter;
