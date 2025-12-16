import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  smallint,
} from "drizzle-orm/pg-core";
import { roles } from "./index.js";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  roleId: uuid("id_role")
    .references(() => roles.id)
    .notNull(),
  firstname: varchar("firstname", { length: 255 }).notNull(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  birthdate: timestamp("birthdate").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  drivingLicense: varchar("driving_license", { length: 255 }),
  addressStreet: varchar("address_street", { length: 255 }).notNull(),
  addressCity: varchar("address_city", { length: 255 }).notNull(),
  addressZip: varchar("address_zip", { length: 5 }).notNull(),
  addressCountry: varchar("address_country", { length: 255 }).notNull(),
  tempTokenId: uuid("temp_token_id").defaultRandom().notNull(),
});
