import { Router } from "express";
import { usersController } from "../controllers/index.js";
import {
  isAdminOrOwner,
  isAuthenticated,
  requestLimiter,
  uploadPictures,
} from "../middlewares/index.js";
import { users } from "../schemas/index.js";
const usersRouter = Router();
usersRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(users),
  usersController.getAll,
);
usersRouter.get(
  "/details/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  usersController.getDetails,
);
usersRouter.get("/:id", usersController.get);
usersRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  usersController.update,
);
usersRouter.put(
  "/picture/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  uploadPictures(1),
  usersController.updatePicture,
);
usersRouter.put(
  "/credentials/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  requestLimiter(10),
  usersController.updateCredentials,
);
usersRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  usersController.delete,
);
export default usersRouter;
