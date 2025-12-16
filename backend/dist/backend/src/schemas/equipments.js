import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
export const equipments = pgTable("equipments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  icon: varchar("icon", { length: 255 }).notNull().unique(),
});
