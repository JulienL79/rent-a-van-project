import { useAlertStore } from "../store/useAlertStore";

export const handleError = (err: any, fallbackMessage: string) => {
  const { setMessage, clearMessage } = useAlertStore.getState();
  clearMessage();
  const message = err?.response?.data?.message ?? fallbackMessage;
  setMessage({ type: "error", content: message });
  throw err.response?.data;
};

export const handleSuccess = (message: string) => {
  const { setMessage, clearMessage } = useAlertStore.getState();
  clearMessage();
  setMessage({ type: "success", content: message });
};

export const handleInfo = (message: string) => {
  const { setMessage, clearMessage } = useAlertStore.getState();
  clearMessage();
  setMessage({ type: "info", content: message });
};
