import type {
  IBookingCardOwner,
  IBookingCardRenter,
} from "../../../molecules/Card";

export const bookingDatasOwner: IBookingCardOwner[] = [
  {
    id: "b1",
    vehiclePlate: "AB-123-CD",
    renterName: "Alice Dupont",
    startDate: "2025-10-01 14:00:00",
    endDate: "2025-10-05 10:00:00",
    amount: 450,
    status: "confirmed",
  },
  {
    id: "b3",
    vehiclePlate: "EF-456-GH",
    renterName: "Marc Lemoine",
    startDate: "2025-09-20 08:00:00",
    endDate: "2025-09-25 20:00:00",
    amount: 520,
    status: "finished",
  },
];

export const bookingDatasRenter: IBookingCardRenter[] = [];
