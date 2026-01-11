import { z } from "zod";
import { contactValidation } from "../validators/contact.validation.js";

export type ContactPayload = z.infer<typeof contactValidation>;
