import { create } from "zustand";

type TMessagePayload = {
  content: string;
  type: "error" | "info" | "success";
};
interface IAlertState {
  type: "error" | "info" | "success" | null;
  message: string | null;
  setMessage: (message: TMessagePayload) => void;
  clearMessage: () => void;
}

export const useAlertStore = create<IAlertState>((set) => ({
  message: null,
  type: null,
  setMessage: (msg: TMessagePayload) =>
    set({ message: msg.content, type: msg.type }),
  clearMessage: () => set({ message: null, type: null }),
}));
