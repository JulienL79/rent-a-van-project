export type TAdminUserData = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  roleName: "admin" | "user";
  vehicleCount: number;
  createdAt: Date;
};

export type TAdminUserRow = {
  id: string;
  email: string;
  roleName: "admin" | "user";
  createdAt: Date;
};
