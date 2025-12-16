import { Router } from "express";
import { bookingsController } from "../controllers/index.js";
import { isAdminOrOwner, isAuthenticated } from "../middlewares/index.js";
import { bookings, users, vehicles } from "../schemas/index.js";

const bookingsRouter = Router();

bookingsRouter.get(
  "/",
  isAuthenticated(true),
  isAdminOrOwner(bookings),
  bookingsController.getAll,
);

bookingsRouter.get(
  "/owner/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  bookingsController.getAllByOwner,
);

bookingsRouter.get(
  "/renter/:id",
  isAuthenticated(true),
  isAdminOrOwner(users),
  bookingsController.getAllByRenter,
);

bookingsRouter.get(
  "/vehicle/:id",
  isAuthenticated(true),
  isAdminOrOwner(vehicles),
  bookingsController.getAllByVehicle,
);

bookingsRouter.get(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(bookings),
  bookingsController.get,
);

bookingsRouter.post("/", isAuthenticated(true), bookingsController.create);

bookingsRouter.put(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(bookings),
  bookingsController.update,
);

bookingsRouter.delete(
  "/:id",
  isAuthenticated(true),
  isAdminOrOwner(bookings),
  bookingsController.delete,
);

export default bookingsRouter;
