import { Router } from "express";
import { vehiclesController } from "../controllers/index.js";
import {
  isAdminOrOwner,
  isAuthenticated,
  uploadPictures,
} from "../middlewares/index.js";
import { vehicles } from "../schemas/index.js";
const vehiclesRouter = Router();
vehiclesRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  vehiclesController.getAll,
);
vehiclesRouter.get(
  "/details/:id",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  vehiclesController.getDetails,
);
vehiclesRouter.get("/user/:id", vehiclesController.getAllByUser);
vehiclesRouter.get("/:id", vehiclesController.get);
vehiclesRouter.post(
  "/",
  isAuthenticated(true),
  uploadPictures(5),
  vehiclesController.create,
);
vehiclesRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  vehiclesController.update,
);
vehiclesRouter.put(
  "/pictures/:id",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  uploadPictures(5),
  vehiclesController.updatePictures,
);
vehiclesRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  vehiclesController.delete,
);
export default vehiclesRouter;
