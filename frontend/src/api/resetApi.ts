import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const requestResetPassword = async (email: string) => {
  try {
    return await api.post<any>("/reset", { email });
  } catch (err) {
    handleError(err, "Erreur lors de la demande de réinitialisation");
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    return await api.put<any>(`/reset/${token}`, { password: newPassword });
  } catch (err) {
    handleError(err, "Erreur lors de la réinitialisation du mot de passe");
  }
};
