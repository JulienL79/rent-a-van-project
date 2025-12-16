import { pgTable, uuid, varchar, boolean } from "drizzle-orm/pg-core";
import { users, vehicles } from "./index.js";

export const pictures = pgTable("pictures", {
  id: uuid("id").defaultRandom().primaryKey(),
  src: varchar("src", { length: 255 }).notNull(),
  userId: uuid("id_users")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isProfilePicture: boolean("is_profile_picture").default(false).notNull(),
  vehicleId: uuid("id_vehicles").references(() => vehicles.id, {
    onDelete: "cascade",
  }),
});
