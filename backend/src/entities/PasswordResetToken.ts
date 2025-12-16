import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { passwordResetTokens } from "../schemas/index.js";

export type PasswordResetToken = InferSelectModel<typeof passwordResetTokens>;

export type NewPasswordResetToken = InferInsertModel<
  typeof passwordResetTokens
>;
