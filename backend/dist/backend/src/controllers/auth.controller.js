import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import {
  APIResponse,
  hashPassword,
  logger,
  verifyPassword,
} from "../utils/index.js";
import { userModel } from "../models/index.js";
import { zodFieldErrors } from "../utils/index.js";
import { userRegisterValidation } from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
import { db } from "../config/pool.js";
import { roles } from "../schemas/index.js";
import { eq } from "drizzle-orm";
const { JWT_SECRET, NODE_ENV } = env;
export const authController = {
  login: async (request, response) => {
    try {
      logger.info("[AUTH] Login");
      const { email, password } = request.body;
      const [user] = await userModel.findByCredentials(email);
      if (!user) {
        return APIResponse(
          response,
          null,
          "Les identifiants saisis sont incorrects",
          400,
        );
      }
      // vérification mot de passe hashé
      const validPassword = await verifyPassword(password, user.password);
      if (!validPassword) {
        return APIResponse(
          response,
          null,
          "Les identifiants saisis sont incorrects",
          400,
        );
      }
      // generation du jwt
      const accessToken = jwt.sign(
        {
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          tempTokenId: user.tempTokenId,
        },
        JWT_SECRET,
        { expiresIn: "1h" },
      );
      response.cookie("accessToken", accessToken, {
        httpOnly: true, // true - cookie réservé uniquement pour communication HTTP - pas accessible en js
        sameSite: "none", // protection CSRF
        secure: NODE_ENV === "production", // le cookie ne sera envoyé que sur du HTTPS uniquement en prod
      });
      APIResponse(response, null, "Vous êtes bien connecté", 200);
    } catch (error) {
      logger.error("Erreur lors de la connexion de l'utilisateur:", error);
      APIResponse(response, null, "Erreur serveur", 500);
    }
  },
  register: async (request, response) => {
    try {
      logger.info("[AUTH] Register");
      const {
        firstname,
        lastname,
        birthdate,
        email,
        phoneNumber,
        password,
        createdAt,
        drivingLicense,
        addressStreet,
        addressCity,
        addressZip,
        addressCountry,
      } = userRegisterValidation.parse(request.body);
      // on vérifie qu'un user n'a pas déjà cet adresse email
      const [emailAlreadyExists] = await userModel.findByCredentials(email);
      if (emailAlreadyExists) {
        logger.error("Cette adresse email est déjà utilisée");
        return APIResponse(
          response,
          null,
          "Cette adresse email est déjà utilisée",
          400,
        );
      }
      logger.info("OK email non utilisé");
      // on vérifie qu'un user n'a pas déjà ce numéro de téléphone
      const [phoneNumberAlreadyExists] =
        await userModel.findByPhoneNumber(phoneNumber);
      if (phoneNumberAlreadyExists) {
        logger.error("Ce numéro de téléphone est déjà utilisé");
        return APIResponse(
          response,
          null,
          "Ce numéro de téléphone est déjà utilisé",
          400,
        );
      }
      logger.info("OK tel non utilisé");
      // On hash le mot de passe en clair du formulaire
      const hash = await hashPassword(password);
      if (!hash) {
        logger.error("Un problème est survenu lors du hash");
        return APIResponse(
          response,
          null,
          "Un problème est survenu lors du hash",
          500,
        );
      }
      const [role] = await db
        .select({ id: roles.id })
        .from(roles)
        .where(eq(roles.name, "user"));
      // On ajoute le new user dans la db avec le mdp hashé
      const [newUser] = await userModel.create({
        roleId: role.id,
        firstname,
        lastname,
        birthdate,
        email,
        phoneNumber,
        password: hash,
        createdAt,
        drivingLicense,
        addressStreet,
        addressCity,
        addressZip,
        addressCountry,
      });
      if (!newUser) {
        logger.error("Un problème est survenu lors de la création");
        return APIResponse(
          response,
          null,
          "Un problème est survenu lors de la création",
          500,
        );
      }
      APIResponse(response, newUser.id, "Vous êtes inscrit", 200);
    } catch (error) {
      logger.error("Erreur lors de l'inscription de l'utilisateur:", error);
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          zodFieldErrors(error),
          "Le formulaire est invalide",
          400,
        );
      }
      APIResponse(response, null, "Erreur serveur", 500);
    }
  },
  logout: async (request, response) => {
    logger.info("[AUTH] Logout");
    response.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "none",
      secure: NODE_ENV === "production",
    });
    APIResponse(response, null, "Vous êtes déconnecté", 200);
  },
  checkConnexion: async (request, response) => {
    logger.info("[AUTH] Me");
    const { user } = response.locals;
    const userData = await userModel.get(user.id);
    if (!userData) {
      return APIResponse(response, null, "Utilisateur non trouvé", 404);
    }
    const [role] = await userModel.getRoleByUser(user.id);
    APIResponse(
      response,
      {
        id: user.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        role: role.role?.name ?? "user",
      },
      "Vous êtes bien connectée",
      200,
    );
  },
};
