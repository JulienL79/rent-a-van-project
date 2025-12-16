import { Router } from "express";
import { picturesController } from "../controllers/index.js";
import { isAuthenticated, isAdminOrOwner } from "../middlewares/index.js";
import { pictures } from "../schemas/index.js";
const picturesRouter = Router();
picturesRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(pictures),
  picturesController.getAll,
);
picturesRouter.get("/vehicle/:id", picturesController.getAllByVehicle);
picturesRouter.get("/:id", picturesController.get);
picturesRouter.post("/", isAuthenticated(true), picturesController.create);
picturesRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(pictures),
  picturesController.delete,
);
export default picturesRouter;
