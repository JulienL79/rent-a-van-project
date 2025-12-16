import { Router } from "express";
import { rolesController } from "../controllers/index.js";
import { isAuthenticated, isAdminOrOwner } from "../middlewares/index.js";
import { roles } from "../schemas/index.js";

const rolesRouter = Router();

rolesRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(roles),
  rolesController.getAll,
);

rolesRouter.get(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(roles),
  rolesController.get,
);

rolesRouter.post(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(roles),
  rolesController.create,
);

rolesRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(roles),
  rolesController.update,
);

rolesRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(roles),
  rolesController.delete,
);

export default rolesRouter;
