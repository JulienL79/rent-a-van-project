import { Router } from "express";
import { contactController } from "../controllers/index.js";
import { requestLimiter } from "../middlewares/requestLimiter.js";

const contactRouter = Router();

contactRouter.post("/", requestLimiter(10), contactController.contact);

export default contactRouter;
