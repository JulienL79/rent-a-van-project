import { Router } from "express";
import { isAuthenticated, requestLimiter } from "../middlewares/index.js";
import { resetController } from "../controllers/index.js";

const resetRouter = Router();

resetRouter.post(
  "/",
  isAuthenticated(false),
  requestLimiter(3),
  resetController.requestResetPassword,
);

resetRouter.put(
  "/:token",
  isAuthenticated(false),
  requestLimiter(50),
  resetController.resetPassword,
);

export default resetRouter;
