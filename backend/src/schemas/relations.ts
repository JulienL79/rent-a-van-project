import { relations } from "drizzle-orm";
import {
  bookings,
  categories,
  equipments,
  messages,
  passwordResetTokens,
  pictures,
  pricePeriods,
  roles,
  users,
  vehicles,
  vehiclesToEquipments,
} from "./index.js";

export const userRelations = relations(users, ({ many, one }) => ({
  vehicles: many(vehicles),
  pictures: many(pictures),
  passwordResetTokens: many(passwordResetTokens),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  sentMessages: many(messages, {
    relationName: "sentMessages",
  }),
  receivedMessages: many(messages, {
    relationName: "receivedMessages",
  }),
  bookingsAsOwner: many(bookings, {
    relationName: "bookingsAsOwner",
  }),
  bookingsAsRenter: many(bookings, {
    relationName: "bookingsAsRenter",
  }),
}));

export const vehicleRelations = relations(vehicles, ({ many, one }) => ({
  pictures: many(pictures),
  pricePeriods: many(pricePeriods),
  vehiclesToEquipments: many(vehiclesToEquipments),
  user: one(users, {
    fields: [vehicles.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [vehicles.categoryId],
    references: [categories.id],
  }),
  bookings: many(bookings),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  vehicles: many(vehicles),
}));

export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const passwordResetTokenRelations = relations(
  passwordResetTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [passwordResetTokens.userId],
      references: [users.id],
    }),
  }),
);

export const pictureRelations = relations(pictures, ({ one }) => ({
  user: one(users, {
    fields: [pictures.userId],
    references: [users.id],
  }),
  vehicle: one(vehicles, {
    fields: [pictures.vehicleId],
    references: [vehicles.id],
  }),
}));

export const messageRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
  }),
}));

export const pricePeriodRelations = relations(pricePeriods, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [pricePeriods.vehicleId],
    references: [vehicles.id],
  }),
}));

export const equipmentsRelations = relations(equipments, ({ many }) => ({
  vehiclesToEquipments: many(vehiclesToEquipments),
}));

export const vehiclesToEquipmentsRelations = relations(
  vehiclesToEquipments,
  ({ one }) => ({
    vehicle: one(vehicles, {
      fields: [vehiclesToEquipments.vehicleId],
      references: [vehicles.id],
    }),
    equipment: one(equipments, {
      fields: [vehiclesToEquipments.equipmentId],
      references: [equipments.id],
    }),
  }),
);

export const bookingRelations = relations(bookings, ({ one }) => ({
  vehicle: one(vehicles, {
    fields: [bookings.vehicleId],
    references: [vehicles.id],
  }),
  owner: one(users, {
    fields: [bookings.ownerId],
    references: [users.id],
  }),
  renter: one(users, {
    fields: [bookings.renterId],
    references: [users.id],
  }),
}));
