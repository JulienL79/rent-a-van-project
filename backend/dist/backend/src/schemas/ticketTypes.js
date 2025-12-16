"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketTypes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.ticketTypes = (0, pg_core_1.pgTable)("ticket_types", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  eventId: (0, pg_core_1.uuid)("event_id")
    .notNull()
    .references(() => _1.events.id, { onDelete: "cascade" }),
  name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
  price: (0, pg_core_1.numeric)("price").notNull(),
  quota: (0, pg_core_1.integer)("quota").notNull(),
});
