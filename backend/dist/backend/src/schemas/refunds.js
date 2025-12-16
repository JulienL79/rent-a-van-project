"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refunds = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
const enums_1 = require("./enums");
exports.refunds = (0, pg_core_1.pgTable)("refunds", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  paymentId: (0, pg_core_1.uuid)("payment_id")
    .notNull()
    .references(() => _1.payments.id, { onDelete: "cascade" }),
  stripeRefundId: (0, pg_core_1.varchar)("stripe_refund_id", { length: 255 }),
  amount: (0, pg_core_1.numeric)("amount").notNull(),
  reason: (0, pg_core_1.text)("reason"),
  status: (0, enums_1.refundStatusEnum)("status").notNull().default("pending"),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
