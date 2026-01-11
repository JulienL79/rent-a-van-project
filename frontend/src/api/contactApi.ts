import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";
import type { ContactPayload } from "@rent-a-van/shared/types/contact.type";

export const sendContactMessage = async (messageData: ContactPayload) => {
  try {
    return await api.post<any>("/contact", messageData);
  } catch (err) {
    handleError(err, "Erreur lors de la demande de contact");
  }
};
