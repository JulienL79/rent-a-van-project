import { z } from "zod";
import {
  userRegisterValidation,
  userUpdateValidation,
  emailValidation,
  updateCredentialsValidation,
  resetPasswordValidation,
} from "../validators/index.js";

export type UserRegisterPayload = z.infer<typeof userRegisterValidation>;

export type UserUpdatePayload = z.infer<typeof userUpdateValidation>;

export type EmailPayload = z.infer<typeof emailValidation>;

export type UpdateCredentialsPayload = z.infer<
  typeof updateCredentialsValidation
>;

export type resetPasswordPayload = z.infer<typeof resetPasswordValidation>;
