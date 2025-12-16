export interface IBookingProps {
  page: "admin" | "profile";
  id: string;
  onInteract?: () => void;
}
