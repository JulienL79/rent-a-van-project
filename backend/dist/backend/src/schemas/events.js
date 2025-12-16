"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
const enums_1 = require("./enums");
exports.events = (0, pg_core_1.pgTable)("events", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  organizerId: (0, pg_core_1.uuid)("organizer_id")
    .notNull()
    .references(() => _1.users.id, { onDelete: "cascade" }),
  locationId: (0, pg_core_1.uuid)("location_id").references(
    () => _1.locations.id,
    {
      onDelete: "set null",
    },
  ),
  categoryId: (0, pg_core_1.uuid)("category_id").references(
    () => _1.categories.id,
    {
      onDelete: "set null",
    },
  ),
  title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
  description: (0, pg_core_1.text)("description").notNull(),
  dateStart: (0, pg_core_1.timestamp)("date_start").notNull(),
  dateEnd: (0, pg_core_1.timestamp)("date_end").notNull(),
  capacity: (0, pg_core_1.integer)("capacity").notNull(),
  priceMin: (0, pg_core_1.numeric)("price_min").notNull(),
  status: (0, enums_1.eventStatusEnum)("status").notNull().default("published"),
  createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
  updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
