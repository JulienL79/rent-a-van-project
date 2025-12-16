export type TVehicleDetails = {
  id: string;
  brand: string;
  model: string;
  mileage: string;
  description: string;
  numberOfSeats: string;
  numberOfSleepingPlaces: string;
  length: string;
  height: string;
  weight: string;
  fuelType: "diesel" | "petrol" | "electric" | "hybrid" | "other";
  gearType: "manual" | "automatic";
  consumption: string;
  registrationPlate: string;
  registrationDate: string;
  cityName: string;
  cityCode: string;
  latCoordinates: string;
  lonCoordinates: string;
  basePrice: string;
  isAvailable: boolean;
  insuranceNumber: string;
  insuranceExpirationDate: string;

  pictures: {
    id: string;
    src: string;
  }[];

  user: {
    id: string;
    firstname: string;
    lastname: string;
    pictures: {
      id: string;
      src: string;
    }[];
  };

  category: {
    id: string;
    name: string;
  };

  pricePeriods: {
    id: string;
    startDate: string;
    endDate: string;
    name: string;
    coefficient: number;
    vehicleId: string;
  }[];

  vehiclesToEquipments: {
    equipment: {
      id: string;
      name: string;
      icon: string;
    };
  }[];
};

export type TVehicleBooker = {
  id: string;
  brand: string;
  model: string;
  mileage: string;
  description: string;
  numberOfSeats: string;
  numberOfSleepingPlaces: string;
  length: string;
  height: string;
  weight: string;
  fuelType: string;
  gearType: string;
  consumption: string;
  registrationDate: string;
  cityName: string;
  cityCode: string;
  latCoordinates: string;
  lonCoordinates: string;
  priceByDay: number;
  durationDays: number;
  totalPrice: number;
  basePrice: number;
  isAvailable: boolean;

  pictures: {
    id: string;
    src: string;
  }[];

  user: {
    id: string;
    firstname: string;
    lastname: string;
    pictures: {
      id: string;
      src: string;
    }[];
  };

  category: {
    id: string;
    name: string;
  };

  vehiclesToEquipments: {
    equipment: {
      id: string;
      name: string;
      icon: string;
    };
  }[];
};

export interface IVehicleProps {
  page: "profile" | "search" | "admin";
  id: string;
  onInteract: () => void;
}
