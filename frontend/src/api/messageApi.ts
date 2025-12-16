import { api } from "./core";
import { handleError } from "../utils/feedbackHandler";

export const fetchAllMessages = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/messages");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des messages");
  }
};

export const fetchAllChatsByUser = async () => {
  try {
    return await api.get<{ message: string; data: any[] }>("/messages/chat");
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des conversations");
  }
};

export const fetchMessagesFromChat = async (chatId: string) => {
  try {
    return await api.get<{ message: string; data: any[] }>(
      `/messages/chat/${chatId}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération des messages du chat");
  }
};

export const fetchMessageById = async (messageId: string) => {
  try {
    return await api.get<{ message: string; data: any }>(
      `/messages/${messageId}`,
    );
  } catch (err) {
    handleError(err, "Erreur lors de la récupération du message");
  }
};

export const createMessage = async (messageData: any) => {
  try {
    return await api.post<any>("/messages", messageData);
  } catch (err) {
    handleError(err, "Erreur lors de l'envoi du message");
  }
};

export const updateMessage = async (messageId: string, messageData: any) => {
  try {
    return await api.put<any>(`/messages/${messageId}`, messageData);
  } catch (err) {
    handleError(err, "Erreur lors de la modification du message");
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    return await api.delete<any>(`/messages/${messageId}`);
  } catch (err) {
    handleError(err, "Erreur lors de la suppression du message");
  }
};
