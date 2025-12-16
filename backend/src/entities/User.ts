import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users } from "../schemas/index.js";

export type User = InferSelectModel<typeof users>;

export type NewUser = InferInsertModel<typeof users>;
