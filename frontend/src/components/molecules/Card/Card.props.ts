import type { IVehicleResult } from "../../pages/Search/Result";

export interface IVehicleCardProfile {
  id: string;
  picture: string | null;
  brand: string;
  model: string;
  category: string;
}

export interface IBookingCardOwner {
  id: string;
  vehiclePlate: string;
  renterName: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled" | "finished";
}

export interface IBookingCardRenter {
  id: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled" | "finished";
}

export interface IVehicleCardPropsResult {
  type: "result";
  data: IVehicleResult;
  onSelect: () => void;
}

export interface IVehicleCardPropsProfile {
  type: "my-vehicles";
  data: IVehicleCardProfile;
  onDelete: () => void;
  onSelect?: () => void;
}

export interface IBookingCardPropsOwner {
  type: "owner";
  data: IBookingCardOwner;
}

export interface IBookingCardPropsRenter {
  type: "renter";
  data: IBookingCardRenter;
}
