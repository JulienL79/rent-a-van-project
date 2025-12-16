import { z } from "zod";
import {
  pricePeriodsRegisterValidation,
  pricePeriodsUpdateValidation,
} from "../validators/index.js";

export type PricePeriodRegisterPayload = z.infer<
  typeof pricePeriodsRegisterValidation
>;

export type PricePeriodUpdatePayload = z.infer<
  typeof pricePeriodsUpdateValidation
>;
