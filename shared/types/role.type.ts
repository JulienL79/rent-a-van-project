import { z } from "zod";
import { rolesRegisterValidation } from "../validators/index.js";

export type RolePayload = z.infer<typeof rolesRegisterValidation>;
