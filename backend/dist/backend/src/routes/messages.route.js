import { Router } from "express";
import { isAuthenticated, isAdminOrOwner } from "../middlewares/index.js";
import { messages } from "../schemas/index.js";
import { messagesController } from "../controllers/index.js";
const messagesRouter = Router();
messagesRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(messages),
  messagesController.getAll,
);
messagesRouter.get(
  "/chat/",
  isAuthenticated(true),
  messagesController.getAllChatsByUser,
);
messagesRouter.get(
  "/chat/:id",
  isAuthenticated(true),
  messagesController.getAllFromChat,
);
messagesRouter.get(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(messages),
  messagesController.get,
);
messagesRouter.post("/", isAuthenticated(true), messagesController.create);
messagesRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(messages),
  messagesController.update,
);
messagesRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(messages),
  messagesController.delete,
);
export default messagesRouter;
