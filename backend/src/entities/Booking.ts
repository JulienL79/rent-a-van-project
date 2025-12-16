import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { bookings } from "../schemas/index.js";

export type Booking = InferSelectModel<typeof bookings>;

export type NewBooking = InferInsertModel<typeof bookings>;
