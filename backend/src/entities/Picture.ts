import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pictures } from "../schemas/index.js";

export type Picture = InferSelectModel<typeof pictures>;

export type NewPicture = InferInsertModel<typeof pictures>;
