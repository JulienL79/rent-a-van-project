import { Router } from "express";
import { authController } from "../controllers/index.js";
import { isAuthenticated, requestLimiter } from "../middlewares/index.js";
const authRouter = Router();
authRouter.post(
  "/login",
  isAuthenticated(false),
  requestLimiter(100),
  authController.login,
);
authRouter.post("/register", isAuthenticated(false), authController.register);
authRouter.get("/logout", isAuthenticated(true), authController.logout);
authRouter.get("/me", isAuthenticated(true), authController.checkConnexion);
export default authRouter;
