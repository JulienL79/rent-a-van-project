import type { IHeaderItemData } from "./Header.props";

export const HEADER_ITEMS: IHeaderItemData[] = [
  {
    id: "camping-car",
    label: "Camping-car",
    to: "/",
    action: "SET_CAMPING_CAR",
  },
  {
    id: "van",
    label: "Van",
    to: "/",
    action: "SET_VAN",
  },
  {
    id: "admin",
    label: "Administration",
    to: "/admin/home",
    visibility: "ADMIN",
    dropdown: [
      { id: "admin-home", label: "Accueil", to: "/admin/home" },
      { id: "admin-users", label: "Utilisateurs", to: "/admin/users" },
      { id: "admin-vehicles", label: "Véhicules", to: "/admin/vehicles" },
      { id: "admin-categories", label: "Catégories", to: "/admin/categories" },
      { id: "admin-equipments", label: "Équipements", to: "/admin/equipments" },
      { id: "admin-pictures", label: "Photos", to: "/admin/pictures" },
      { id: "admin-bookings", label: "Réservations", to: "/admin/bookings" },
      { id: "admin-messages", label: "Messages", to: "/admin/messages" },
    ],
  },
  {
    id: "user-auth",
    label: "Mon espace",
    to: "/profile/home",
    visibility: "AUTH",
    dropdown: [
      { id: "profile", label: "Mon Profil", to: "/profile/home" },
      { id: "bookings", label: "Réservations", to: "/profile/bookings" },
      { id: "vehicles", label: "Véhicules", to: "/profile/vehicles" },
      { id: "mailbox", label: "Messagerie", to: "/profile/mailbox" },
      { id: "settings", label: "Paramètres", to: "/profile/settings" },
      { id: "logout", label: "Déconnexion", to: "/logout" },
    ],
  },
  {
    id: "user-guest",
    label: "Mon espace",
    to: "/login",
    visibility: "GUEST",
    dropdown: [
      { id: "login", label: "Se connecter", to: "/login" },
      { id: "register", label: "S'inscrire", to: "/register" },
    ],
  },
];
