export interface IAsideProfilePageProps {
  page: "profile";
  active: "home" | "bookings" | "vehicles" | "settings" | "mailbox";
}

export interface IAsideAdminPageProps {
  page: "admin";
  active:
    | "home"
    | "users"
    | "vehicles"
    | "categories"
    | "equipments"
    | "pictures"
    | "bookings"
    | "messages";
}

export interface IAsideResultPageProps {
  page: "results";
}
