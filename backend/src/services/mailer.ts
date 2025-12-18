import axios from "axios";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = env;

export interface IMailMessage {
  type: "reset" | "contact";
  from: string;
  fromName: string;
  to: string;
  toName: string;
  subject: string;
  text: string;
  html: string;
}

// Fonction pour envoyer un mail via l'API Mailjet
export const sendEmail = async (resetToken: string, message: IMailMessage) => {
  const payload = {
    Messages: [
      {
        From: {
          Email: message.from,
          Name: message.fromName,
        },
        To: [
          {
            Email: message.to,
            Name: message.toName,
          },
        ],
        Subject: message.subject,
        TextPart: message.text,
        HTMLPart: message.html,
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://api.mailjet.com/v3.1/send",
      payload,
      {
        auth: {
          username: MJ_APIKEY_PUBLIC,
          password: MJ_APIKEY_PRIVATE,
        },
      },
    );
    logger.info("Email envoyé !", response.data);
  } catch (error: any) {
    logger.error("Erreur d'envoi :", error.response?.data || error.message);
    throw new Error("Erreur d'envoi du mail");
  }
};
