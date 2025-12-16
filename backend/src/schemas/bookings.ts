import {
  pgTable,
  uuid,
  varchar,
  numeric,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { users, vehicles } from "./index.js";

const statusEnum = pgEnum("status", [
  "pending",
  "confirmed",
  "cancelled",
  "finished",
]);

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: uuid("id_owner").references(() => users.id, {
    onDelete: "set null",
  }),
  renterId: uuid("id_renter").references(() => users.id, {
    onDelete: "set null",
  }),
  vehicleId: uuid("id_vehicle").references(() => vehicles.id, {
    onDelete: "set null",
  }),
  vehiclePlate: varchar("vehicle_plate", { length: 7 }).notNull(),
  renterName: varchar("renter_name", { length: 255 }).notNull(),
  ownerName: varchar("owner_name", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: statusEnum().default("pending").notNull(),
  ownerAddressStreet: varchar("owner_address_street", {
    length: 255,
  }).notNull(),
  ownerAddressCity: varchar("owner_address_city", { length: 255 }).notNull(),
  ownerAddressZip: varchar("owner_address_zip", { length: 5 }).notNull(),
  ownerAddressCountry: varchar("owner_address_country", {
    length: 255,
  }).notNull(),
  renterAddressStreet: varchar("renter_address_street", {
    length: 255,
  }).notNull(),
  renterAddressCity: varchar("renter_address_city", { length: 255 }).notNull(),
  renterAddressZip: varchar("renter_address_zip", { length: 5 }).notNull(),
  renterAddressCountry: varchar("renter_address_country", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  amount: numeric("amount", { precision: 7, scale: 2 }).notNull(),
  insuranceContract: varchar("insurance_contract", { length: 255 }),
});
