"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.reviews = (0, pg_core_1.pgTable)("reviews", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  eventId: (0, pg_core_1.uuid)("event_id")
    .notNull()
    .references(() => _1.events.id, { onDelete: "cascade" }),
  userId: (0, pg_core_1.uuid)("user_id").references(() => _1.users.id, {
    onDelete: "set null",
  }),
  rating: (0, pg_core_1.integer)("rating").notNull(),
  comment: (0, pg_core_1.text)("comment").notNull(),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
