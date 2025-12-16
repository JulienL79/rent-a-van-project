"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickets = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
const enums_1 = require("./enums");
exports.tickets = (0, pg_core_1.pgTable)("tickets", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  bookingId: (0, pg_core_1.uuid)("booking_id")
    .notNull()
    .references(() => _1.bookings.id, { onDelete: "cascade" }),
  ticketTypeId: (0, pg_core_1.uuid)("ticket_type_id")
    .notNull()
    .references(() => _1.ticketTypes.id, { onDelete: "cascade" }),
  price: (0, pg_core_1.numeric)("price").notNull(),
  qrCodePath: (0, pg_core_1.varchar)("qr_code_path", { length: 255 }),
  status: (0, enums_1.ticketStatusEnum)("status").notNull().default("valid"),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
