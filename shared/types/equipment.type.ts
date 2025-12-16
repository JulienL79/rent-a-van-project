import { z } from "zod";
import { equipmentsRegisterValidation } from "../validators/index.js";

export type EquipmentPayload = z.infer<typeof equipmentsRegisterValidation>;
