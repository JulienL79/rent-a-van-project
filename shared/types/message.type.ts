import { z } from "zod";
import {
  messagesRegisterValidation,
  messagesUpdateValidation,
} from "../validators/index.js";

export type MessageRegisterPayload = z.infer<typeof messagesRegisterValidation>;

export type MessageUpdatePayload = z.infer<typeof messagesUpdateValidation>;
