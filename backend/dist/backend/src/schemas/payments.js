"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
const enums_1 = require("./enums");
exports.payments = (0, pg_core_1.pgTable)("payments", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  bookingId: (0, pg_core_1.uuid)("booking_id").references(
    () => _1.bookings.id,
    {
      onDelete: "set null",
    },
  ),
  invoiceId: (0, pg_core_1.uuid)("invoice_id").references(
    () => _1.invoices.id,
    {
      onDelete: "set null",
    },
  ),
  stripePaymentIntentId: (0, pg_core_1.varchar)("stripe_payment_intent_id", {
    length: 255,
  }),
  stripeChargeId: (0, pg_core_1.varchar)("stripe_charge_id", { length: 255 }),
  currency: (0, pg_core_1.varchar)("currency", { length: 10 })
    .notNull()
    .default("EUR"),
  amount: (0, pg_core_1.numeric)("amount").notNull(),
  status: (0, enums_1.paymentStatusEnum)("status").notNull().default("pending"),
  paymentMethod: (0, pg_core_1.varchar)("payment_method", { length: 50 }),
  paidAt: (0, pg_core_1.timestamp)("paid_at", { withTimezone: false }),
  failureReason: (0, pg_core_1.text)("failure_reason"),
  reattendait: (0, pg_core_1.timestamp)("reattendait", { withTimezone: false })
    .notNull()
    .defaultNow(),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
