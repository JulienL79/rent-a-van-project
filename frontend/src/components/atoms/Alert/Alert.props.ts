export interface IAlert {
  message: string;
  type: "error" | "info" | "success";
  onClose: () => void;
}
