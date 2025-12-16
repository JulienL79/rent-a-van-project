export interface IUserProps {
  page: "admin" | "viewer";
  id: string;
  onInteract?: () => void;
}
