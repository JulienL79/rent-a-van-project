import { Request, Response } from "express";
import {
  APIResponse,
  hashPassword,
  logger,
  zodFieldErrors,
} from "../utils/index.js";
import { passwordResetTokenModel, userModel } from "../models/index.js";
import {
  emailValidation,
  resetPasswordValidation,
  uuidValidator,
} from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
import { env } from "../config/index.js";
import { IMailMessage, sendEmail } from "../services/mailer.js";

export const resetController = {
  requestResetPassword: async (request: Request, response: Response) => {
    try {
      logger.info(`[POST] Demande de réinitialisation de mot de passe`);

      const { email } = emailValidation.parse(request.body);

      const [user] = await userModel.findByCredentials(email);
      if (!user) {
        logger.error("Adresse mail non reliée à un compte");
        return APIResponse(
          response,
          null,
          "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé.",
          200,
        );
      }

      const [{ token }] = await passwordResetTokenModel.create({
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expiration après 15 minutes
        userId: user.id,
      });

      const resetMessage: IMailMessage = {
        type: "reset",
        from: env.RESET_MAIL_ADDRESS,
        fromName: "Support - RentAVan",
        to: email,
        toName: `${user.firstname} ${user.lastname}`,
        subject: "Réinitialisation de mot de passe",
        text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${env.WEBSITE_URL}/reset/${token}`,
        html: `<h1>Bonjour ${user.firstname},</h1><p>Vous avez effectué une demande de réinitialisation de mot de passe.</p><p>Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe : <a href="${env.WEBSITE_URL}/reset/${token}">Réinitialiser mon mot de passe</a></p>`,
      };

      await sendEmail(resetMessage);

      return APIResponse(
        response,
        null,
        "Si un compte est associé à cette adresse, un email de réinitialisation a été envoyé.",
        200,
      );
    } catch (error: any) {
      logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
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
        "Erreur lors de la mise à jour de l'utilisateur",
        500,
      );
    }
  },
  resetPassword: async (request: Request, response: Response) => {
    try {
      logger.info(`[UPDATE] Modification du mot de passe`);
      const { token } = request.params;
      const { password } = resetPasswordValidation.parse(request.body);
      const tokenParsed = uuidValidator.safeParse(token);

      if (!tokenParsed.success) {
        return APIResponse(response, null, "Token invalide ou expiré.", 400);
      }

      // Vérifier la validité du token
      const [tokenData] = await passwordResetTokenModel.getByToken(token);
      if (
        !tokenData ||
        tokenData.isUsed ||
        tokenData.expiresAt.getTime() < Date.now()
      ) {
        logger.error("Token invalide ou expiré.");
        return APIResponse(response, null, "Token invalide ou expiré.", 400);
      }

      // Hasher le nouveau mot de passe
      const hash = await hashPassword(password);
      const uuid = crypto.randomUUID();

      // Mettre à jour le mot de passe de l'utilisateur
      await userModel.update(tokenData.userId, {
        password: hash,
        tempTokenId: uuid,
      });

      // Invalider le token
      await passwordResetTokenModel.update(tokenData.id, {
        isUsed: true,
      });

      APIResponse(
        response,
        null,
        "Mot de passe réinitialisé avec succès.",
        200,
      );
    } catch (error: any) {
      logger.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
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
        "Erreur lors de la mise à jour de l'utilisateur",
        500,
      );
    }
  },
};
