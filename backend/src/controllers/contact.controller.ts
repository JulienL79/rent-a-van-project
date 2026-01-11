import { Request, Response } from "express";
import { APIResponse, logger, zodFieldErrors } from "../utils/index.js";
import { contactValidation } from "@rent-a-van/shared/validators/contact.validation.js";
import { IMailMessage, sendEmail } from "../services/mailer.js";
import { env } from "../config/env.js";
import z from "zod";

export const contactController = {
  contact: async (request: Request, response: Response) => {
    try {
      logger.info(`[POST] Demande de contact`);

      const contactData = contactValidation.parse(request.body);

      const messageToSupport: IMailMessage = {
        type: "contact",
        from: env.RESET_MAIL_ADDRESS,
        fromName: `${contactData.firstname} ${contactData.lastname}`,
        to: env.RESET_MAIL_ADDRESS,
        toName: `Support - RentAVan`,
        subject: "Demande de contact",
        text: `
                    Nouveau message depuis le formulaire de contact :

                    Nom : ${contactData.firstname ?? "N/A"} ${contactData.lastname ?? ""}
                    Email : ${contactData.email}
                    Téléphone : ${contactData.phone}
                    Sujet : ${contactData.subject}
                    Message : ${contactData.message}
                `,
        html: `
                    <h1>Nouveau message depuis le formulaire de contact</h1>
                    <p><strong>Nom :</strong> ${contactData.firstname} ${contactData.lastname}</p>
                    <p><strong>Email :</strong> ${contactData.email}</p>
                    <p><strong>Téléphone :</strong> ${contactData.phone}</p>
                    <p><strong>Sujet :</strong> ${contactData.subject}</p>
                    <p><strong>Message :</strong><br/>${contactData.message.replace(/\n/g, "<br/>")}</p>
                `,
      };

      const messageToUser: IMailMessage = {
        type: "contact",
        from: env.RESET_MAIL_ADDRESS,
        fromName: "Support - RentAVan",
        to: contactData.email,
        toName: `${contactData.firstname} ${contactData.lastname}`,
        subject: "Demande de contact - demande reçue",
        text: `
                    Bonjour ${contactData.firstname ?? ""},

                    Nous avons bien reçu votre message via le formulaire de contact.
                    Notre équipe reviendra vers vous dans les plus brefs délais.
                `,
        html: `
                    <h1>Bonjour ${contactData.firstname},</h1>
                    <p>Nous avons bien reçu votre message via le formulaire de contact.</p>
                    <p>Notre équipe reviendra vers vous dans les plus brefs délais.</p>
                `,
      };

      // Message au support
      await sendEmail(messageToSupport);
      // Message au user
      await sendEmail(messageToUser);

      APIResponse(response, null, "Demande transmise à nos services", 200);
    } catch (error: any) {
      logger.error(
        "Erreur lors du traitement du formulaire de contact: ",
        error,
      );
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          zodFieldErrors(error),
          "Le formulaire est invalide",
          400,
        );
      }
      APIResponse(
        response,
        null,
        "Erreur lors du traitement du formulaire de contact",
        500,
      );
    }
  },
};
