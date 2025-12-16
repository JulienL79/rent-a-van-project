export interface IVehicleResult {
  id: string;
  brand: string;
  model: string;
  description: string;
  cityCode: string;
  cityName: string;
  latCoordinates: string;
  lonCoordinates: string;
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  gearType: "manual" | "automatic";
  consumption: string;
  durationDays: number;
  priceByDay: number;
  totalPrice: number;
  numberOfSeats: number;
  numberOfSleepingPlaces: number;
  isAvailable: boolean;
  pictures: { id: string; src: string }[];
}

export interface IResultProps {
  data: IVehicleResult[];
}
