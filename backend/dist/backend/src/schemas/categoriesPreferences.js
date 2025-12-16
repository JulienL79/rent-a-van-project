"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesPreferences = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const _1 = require("./");
exports.categoriesPreferences = (0, pg_core_1.pgTable)(
  "categories_preferences",
  {
    userId: (0, pg_core_1.uuid)("user_id")
      .notNull()
      .references(() => _1.users.id, { onDelete: "cascade" }),
    categoryId: (0, pg_core_1.uuid)("category_id")
      .notNull()
      .references(() => _1.categories.id, { onDelete: "cascade" }),
  },
);
