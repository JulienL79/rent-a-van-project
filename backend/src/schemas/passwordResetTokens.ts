import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./index.js";

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  token: uuid("token").defaultRandom().notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  userId: uuid("id_users")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isUsed: boolean("is_used").default(false).notNull(),
});
