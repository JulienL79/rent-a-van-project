import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";
import type { resetPasswordPayload } from "@rent-a-van/shared/types/user.type";

export const requestResetPassword = async (email: string) => {
  try {
    return await api.post<any>("/reset", { email });
  } catch (err) {
    handleError(err, "Erreur lors de la demande de réinitialisation");
  }
};

export const resetPassword = async (
  token: string,
  payload: resetPasswordPayload,
) => {
  try {
    return await api.put<any>(`/reset/${token}`, payload);
  } catch (err) {
    handleError(err, "Erreur lors de la réinitialisation du mot de passe");
  }
};
