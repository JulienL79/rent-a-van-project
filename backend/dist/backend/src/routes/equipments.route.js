import { Router } from "express";
import { equipmentsController } from "../controllers/index.js";
import { isAdminOrOwner, isAuthenticated } from "../middlewares/index.js";
import { equipments } from "../schemas/index.js";
const equipmentsRouter = Router();
equipmentsRouter.get("/", equipmentsController.getAll);
equipmentsRouter.get("/:id", equipmentsController.get);
equipmentsRouter.post(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(equipments),
  equipmentsController.create,
);
equipmentsRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(equipments),
  equipmentsController.update,
);
equipmentsRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(equipments),
  equipmentsController.delete,
);
export default equipmentsRouter;
