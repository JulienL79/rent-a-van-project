export interface IAdminMetaData {
  page:
    | "home"
    | "users"
    | "vehicles"
    | "categories"
    | "equipments"
    | "pictures"
    | "bookings"
    | "messages";
  titlePage: string;
  title: string;
  description: string;
}
