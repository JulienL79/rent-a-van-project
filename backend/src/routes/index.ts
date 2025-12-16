import { Router } from "express";
import usersRouter from "./users.route.js";
import vehiclesRouter from "./vehicles.route.js";
import authRouter from "./auth.route.js";
import categoriesRouter from "./categories.route.js";
import rolesRouter from "./roles.route.js";
import picturesRouter from "./pictures.route.js";
import resetRouter from "./reset.route.js";
import messagesRouter from "./messages.route.js";
import pricePeriodsRouter from "./pricePeriods.route.js";
import equipmentsRouter from "./equipments.route.js";
import bookingsRouter from "./bookings.route.js";
import searchRouter from "./search.route.js";
import addressesRouter from "./addresses.router.js";
import pingRouter from "./ping.route.js";

const router = Router();

router.use("/users", usersRouter);

router.use("/vehicles", vehiclesRouter);

router.use("/auth", authRouter);

router.use("/categories", categoriesRouter);

router.use("/roles", rolesRouter);

router.use("/pictures", picturesRouter);

router.use("/reset", resetRouter);

router.use("/messages", messagesRouter);

router.use("/coefficients", pricePeriodsRouter);

router.use("/equipments", equipmentsRouter);

router.use("/bookings", bookingsRouter);

router.use("/search", searchRouter);

router.use("/address", addressesRouter);

router.use("/ping", pingRouter);

export default router;
