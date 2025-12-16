import { z } from "zod";
import {
  bookingsRegisterValidation,
  bookingsUpdateValidation,
} from "../validators/index.js";

export type BookingRegisterPayload = z.infer<typeof bookingsRegisterValidation>;

export type BookingUpdatePayload = z.infer<typeof bookingsUpdateValidation>;
