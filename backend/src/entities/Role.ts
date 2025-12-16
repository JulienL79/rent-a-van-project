import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { roles } from "../schemas/index.js";

export type Role = InferSelectModel<typeof roles>;

export type NewRole = InferInsertModel<typeof roles>;
