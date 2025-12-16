import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { messages } from "../schemas/index.js";

export type Message = InferSelectModel<typeof messages>;

export type NewMessage = InferInsertModel<typeof messages>;
