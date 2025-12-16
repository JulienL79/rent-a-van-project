import {
  APIResponse,
  deleteUploadedImage,
  hashPassword,
  logger,
  saveUploadedImages,
  verifyPassword,
  zodFieldErrors,
} from "../utils/index.js";
import { picturesModel, userModel } from "../models/index.js";
import {
  picturesRegisterValidation,
  updateCredentialsValidation,
  userUpdateValidation,
} from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
export const usersController = {
  getAll: async (request, response) => {
    try {
      logger.info("[GET] Récupérer tous les users");
      const users = await userModel.getAll();
      APIResponse(response, users, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération des users: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des users",
        500,
      );
    }
  },
  get: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[GET] Récupérer l'user avec l'id: ${id}`);
      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      APIResponse(response, user, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'user: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de l'user",
        500,
      );
    }
  },
  getDetails: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[GET] Récupérer l'user avec détails avec l'id: ${id}`);
      const user = await userModel.getDetails(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      APIResponse(response, user, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'user: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de l'user",
        500,
      );
    }
  },
  update: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[UPDATE] Modifier l'user avec l'id: ${id}`);
      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      const updateData = userUpdateValidation.parse(request.body);
      const filteredUpdateData = updateData;
      await userModel.update(id, filteredUpdateData);
      APIResponse(response, null, "Utilisateur mis à jour", 200);
    } catch (error) {
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
  updatePicture: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[UPDATE] Modifier la photo de profil du user : ${id}`);
      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      const imageUrls = saveUploadedImages(request.files);
      const src = imageUrls.length > 0 ? imageUrls[0] : null;
      // Suppression de la photo dans tous les cas, si l'utilsateur veut juste supprimer sa photo
      if (user.pictures && user.pictures.length > 0) {
        await picturesModel.delete(user.pictures[0].id);
        try {
          deleteUploadedImage(user.pictures[0].src);
        } catch (err) {
          logger.warn("Erreur lors de la suppression du fichier image :", err);
        }
      }
      // Ajout de la nouvelle photo en base si elle existe
      if (src) {
        picturesRegisterValidation.parse({ src });
        await picturesModel.create({
          src,
          userId: id,
          isProfilePicture: true,
        });
      }
      return APIResponse(response, null, "Photo de profil mise à jour", 200);
    } catch (error) {
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
  updateCredentials: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[UPDATE] Modifier password/email du user: ${id}`);
      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      const { oldPassword, password, email, confirmPassword } =
        updateCredentialsValidation.parse(request.body);
      if (!oldPassword) {
        logger.error(
          "Veuillez saisir votre mot de passe actuel pour modifier vos informations",
        );
        return APIResponse(response, null, "Action interdite", 403);
      }
      // Vérification que l'ancien mot de passe est correct
      const [oldPasswordInDB] = await userModel.getCredentials(id);
      const validPassword = await verifyPassword(
        oldPassword,
        oldPasswordInDB.password,
      );
      if (!validPassword) {
        logger.error("L'ancien mot de passe est erroné");
        return APIResponse(
          response,
          null,
          "L'ancien mot de passe est erroné",
          400,
        );
      }
      // on vérifie qu'un autre user n'a pas déjà cet adresse email
      const [emailAlreadyExists] = await userModel.findByCredentials(email);
      if (emailAlreadyExists && emailAlreadyExists.id !== id) {
        logger.error("Cette adresse email est déjà utilisée");
        return APIResponse(
          response,
          null,
          "Cette adresse email est déjà utilisée",
          400,
        );
      }
      // Hash du nouveau mot de passe s'il est fourni et conforme avec la confirmation (doublon de validation de zod)
      let newPassword;
      if (password && password === confirmPassword) {
        const hash = await hashPassword(password);
        newPassword = hash;
      } else if (password && password !== confirmPassword) {
        logger.error("Le mot de passe et sa confirmation ne correspondent pas");
        return APIResponse(
          response,
          null,
          "Le mot de passe et sa confirmation ne correspondent pas",
          400,
        );
      }
      const filteredUpdateData = {
        email,
      };
      // On change seulement le mdp s'il a été fourni
      if (newPassword) {
        filteredUpdateData.password = newPassword;
      }
      await userModel.update(id, filteredUpdateData);
      APIResponse(response, null, "Utilisateur mis à jour", 200);
    } catch (error) {
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
  delete: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[DELETE] Supprimer l'user avec l'id: ${id}`);
      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      await userModel.delete(id);
      // Si l'utilisateur supprime son propre compte, il doit être déconnecté
      if (response.locals.user.id === id) {
        response.clearCookie("accessToken");
        return APIResponse(
          response,
          null,
          "Utilisateur supprimé et déconnecté",
          200,
        );
      }
      return APIResponse(response, null, "Utilisateur supprimé", 200);
    } catch (error) {
      logger.error("Erreur lors de la suppression de l'utilisateur: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression de l'utilisateur",
        500,
      );
    }
  },
};
