import { APIResponse, logger, zodFieldErrors } from "../utils/index.js";
import { equipmentsModel } from "../models/index.js";
import { equipmentsRegisterValidation } from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
export const equipmentsController = {
  get: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[GET] Récupérer l'equipement avec l'id: ${id}`);
      const equipment = await equipmentsModel.get(id);
      if (!equipment) {
        logger.error("Equipement inexistant");
        return APIResponse(response, null, "Equipement inexistant", 404);
      }
      APIResponse(response, equipment, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération du equipement: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du equipement",
        500,
      );
    }
  },
  create: async (request, response) => {
    try {
      const equipmentData = equipmentsRegisterValidation.parse(request.body);
      logger.info("[POST] Créer un equipement"); // Log d'information en couleur
      await equipmentsModel.create(equipmentData);
      APIResponse(response, null, "OK", 201);
    } catch (error) {
      logger.error("Erreur lors de la création du equipement: ", error);
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          error.format(),
          "Le formulaire est invalide",
          400,
        );
      }
      APIResponse(
        response,
        null,
        "Erreur lors de la création du equipement",
        500,
      );
    }
  },
  delete: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[DELETE] Supprimer l'equipement avec l'id: ${id}`);
      const equipment = await equipmentsModel.get(id);
      if (!equipment) {
        logger.error("Equipement inexistant");
        return APIResponse(response, null, "Equipement inexistant", 404);
      }
      await equipmentsModel.delete(id);
      APIResponse(response, null, "OK", 201);
    } catch (error) {
      logger.error("Erreur lors de la suppression du equipement: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression du equipement",
        500,
      );
    }
  },
  update: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[UPDATE] Modifier l'equipement avec l'id: ${id}`);
      const equipment = await equipmentsModel.get(id);
      if (!equipment) {
        logger.error("Equipement inexistant");
        return APIResponse(response, null, "Equipement inexistant", 404);
      }
      const equipementData = equipmentsRegisterValidation.parse(request.body);
      await equipmentsModel.update(id, equipementData);
      APIResponse(response, null, "OK", 201);
    } catch (error) {
      logger.error("Erreur lors de la màj du equipement: ", error);
      if (error instanceof z.ZodError) {
        return APIResponse(
          response,
          zodFieldErrors(error),
          "Le formulaire est invalide",
          400,
        );
      }
      APIResponse(response, null, "Erreur lors de la màj du equipement", 500);
    }
  },
  getAll: async (request, response) => {
    try {
      logger.info("[GET] Récupérer tous les equipements"); // Log d'information en couleur
      const equipments = await equipmentsModel.getAll();
      APIResponse(response, equipments, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération des equipements: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des equipements",
        500,
      );
    }
  },
};
