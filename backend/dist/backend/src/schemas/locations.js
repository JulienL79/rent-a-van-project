"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locations = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.locations = (0, pg_core_1.pgTable)("locations", {
  id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
  name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
  addressStreet: (0, pg_core_1.varchar)("address_street", {
    length: 255,
  }).notNull(),
  addressCity: (0, pg_core_1.varchar)("address_city", {
    length: 255,
  }).notNull(),
  addressZip: (0, pg_core_1.varchar)("address_zip", { length: 5 }).notNull(),
  addressCountry: (0, pg_core_1.varchar)("address_country", {
    length: 255,
  }).notNull(),
  coordLat: (0, pg_core_1.varchar)("coord_lat", { length: 255 }).notNull(),
  coordLon: (0, pg_core_1.varchar)("coord_lon", { length: 255 }).notNull(),
  equipments: (0, pg_core_1.text)("equipments").notNull(),
  capacity: (0, pg_core_1.integer)("capacity").notNull(),
});
