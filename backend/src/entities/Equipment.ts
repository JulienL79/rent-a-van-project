import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { equipments } from "../schemas/index.js";

export type Equipment = InferSelectModel<typeof equipments>;

export type NewEquipment = InferInsertModel<typeof equipments>;
