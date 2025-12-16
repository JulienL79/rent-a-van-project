export type TAdminBookingData = {
  id: string;
  ownerId: string;
  renterId: string;
  vehicleId: string;
  createdAt: Date;
  status: string;
  amount: string;
};

export type TAdminBookingRow = {
  id: string;
  createdAt: Date;
  status: string;
  amount: string;
};
