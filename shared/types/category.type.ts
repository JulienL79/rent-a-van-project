import { z } from "zod";
import { categoriesRegisterValidation } from "../validators/index.js";

export type CategoryPayload = z.infer<typeof categoriesRegisterValidation>;
