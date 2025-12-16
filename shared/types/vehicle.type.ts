import { z } from "zod";
import {
  vehiclesRegisterValidation,
  vehiclesUpdateValidation,
} from "../validators/index.js";

export type VehicleRegisterPayload = z.infer<typeof vehiclesRegisterValidation>;

export type VehicleUpdatePayload = z.infer<typeof vehiclesUpdateValidation>;
