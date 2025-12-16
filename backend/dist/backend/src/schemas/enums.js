"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundStatusEnum =
  exports.invoiceStatusEnum =
  exports.paymentStatusEnum =
  exports.ticketStatusEnum =
  exports.bookingStatusEnum =
  exports.eventStatusEnum =
  exports.roleEnum =
    void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Enum pour le rôle des utilisateurs
exports.roleEnum = (0, pg_core_1.pgEnum)("role_enum", [
  "participant",
  "organizer",
  "admin",
]);
// Enum pour le statut des événements
exports.eventStatusEnum = (0, pg_core_1.pgEnum)("event_status_enum", [
  "draft",
  "published",
  "cancelled",
]);
// Enum pour le statut des réservations
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status_enum", [
  "pending",
  "paid",
  "cancelled",
  "refunded",
]);
// Enum pour le statut des tickets
exports.ticketStatusEnum = (0, pg_core_1.pgEnum)("ticket_status_enum", [
  "valid",
  "used",
  "cancelled",
]);
// Enum pour le statut des paiements
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status_enum", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
]);
// Enum pour le statut des factures
exports.invoiceStatusEnum = (0, pg_core_1.pgEnum)("invoice_status_enum", [
  "issued",
  "paid",
  "cancelled",
  "refunded",
  "pending",
]);
// Enum pour le statut des remboursements
exports.refundStatusEnum = (0, pg_core_1.pgEnum)("refund_status_enum", [
  "pending",
  "completed",
  "failed",
]);
