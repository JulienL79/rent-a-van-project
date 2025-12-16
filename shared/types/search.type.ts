import { z } from "zod";
import { searchValidation } from "../validators/index.js";

export type SearchPayload = z.infer<typeof searchValidation>;
