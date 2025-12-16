import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { vehicles, equipments } from "./index.js";

export const vehiclesToEquipments = pgTable(
  "vehicles_to_equipments",
  {
    vehicleId: uuid("id_vehicles")
      .references(() => vehicles.id, { onDelete: "cascade" })
      .notNull(),
    equipmentId: uuid("id_equipments")
      .references(() => equipments.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.vehicleId, table.equipmentId] })],
);
