"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoices = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
const enums_1 = require("./enums");
exports.invoices = (0, pg_core_1.pgTable)("invoices", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  bookingId: (0, pg_core_1.uuid)("booking_id").references(
    () => _1.bookings.id,
    {
      onDelete: "set null",
    },
  ),
  invoice_number: (0, pg_core_1.varchar)("invoice_number", {
    length: 255,
  }).notNull(),
  total_amount: (0, pg_core_1.numeric)("total_amount").notNull(),
  billingName: (0, pg_core_1.varchar)("billing_name", {
    length: 255,
  }).notNull(),
  billingEmail: (0, pg_core_1.varchar)("billing_email", {
    length: 255,
  }).notNull(),
  billingAddressStreet: (0, pg_core_1.varchar)("billing_address_street", {
    length: 255,
  }).notNull(),
  billingAddressCity: (0, pg_core_1.varchar)("billing_address_city", {
    length: 255,
  }).notNull(),
  billingAddressZip: (0, pg_core_1.varchar)("billing_address_zip", {
    length: 5,
  }).notNull(),
  billingAddressCountry: (0, pg_core_1.varchar)("billing_address_country", {
    length: 255,
  }).notNull(),
  event_title: (0, pg_core_1.varchar)("event_title", { length: 255 }).notNull(),
  event_start_date: (0, pg_core_1.timestamp)("event_start_date").notNull(),
  event_end_date: (0, pg_core_1.timestamp)("event_end_date").notNull(),
  organizerName: (0, pg_core_1.varchar)("organizer_name", {
    length: 255,
  }).notNull(),
  status: (0, enums_1.invoiceStatusEnum)("status").notNull().default("pending"),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
