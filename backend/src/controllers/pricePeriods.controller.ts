import { Request, Response } from "express";
import { APIResponse, logger, zodFieldErrors } from "../utils/index.js";
import { pricePeriodsModel } from "../models/index.js";
import {
  pricePeriodsRegisterValidation,
  pricePeriodsUpdateValidation,
} from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";

export const pricePeriodsController = {
  get: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(`[GET] Récupérer le coefficient saisonnier avec l'id: ${id}`);

      const pricePeriod = await pricePeriodsModel.get(id);
      if (!pricePeriod) {
        logger.error("Coefficient saisonnier inexistant");
        return APIResponse(
          response,
          null,
          "Coefficient saisonnier inexistant",
          404,
        );
      }
      APIResponse(response, pricePeriod, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du coefficient saisonnier: ",
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du coefficient saisonnier",
        500,
      );
    }
  },
  create: async (request: Request, response: Response) => {
    try {
      const pricePeriodData = pricePeriodsRegisterValidation.parse(
        request.body,
      );

      logger.info("[POST] Créer une coefficient saisonnier"); // Log d'information en couleur

      const pricePeriod = await pricePeriodsModel.create(pricePeriodData);
      APIResponse(response, pricePeriod, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la création du coefficient saisonnier: ",
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
        "Erreur lors de la création du coefficient saisonnier",
        500,
      );
    }
  },
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(
        `[DELETE] Supprimer le coefficient saisonnier avec l'id: ${id}`,
      );

      const pricePeriod = await pricePeriodsModel.get(id);
      if (!pricePeriod) {
        logger.error("Coefficient saisonnier inexistant");
        return APIResponse(
          response,
          null,
          "Coefficient saisonnier inexistant",
          404,
        );
      }

      await pricePeriodsModel.delete(id);
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la suppression du coefficient saisonnier: ",
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression du coefficient saisonnier",
        500,
      );
    }
  },
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(
        `[UPDATE] Modifier le coefficient saisonnier avec l'id: ${id}`,
      );

      const pricePeriod = await pricePeriodsModel.get(id);
      if (!pricePeriod) {
        logger.error("Coefficient saisonnier inexistant");
        return APIResponse(
          response,
          null,
          "Coefficient saisonnier inexistant",
          404,
        );
      }

      const pricePeriodData = pricePeriodsUpdateValidation.parse(request.body);

      await pricePeriodsModel.update(id, pricePeriodData);
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la màj du coefficient saisonnier: ", error);
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
        "Erreur lors de la màj du coefficient saisonnier",
        500,
      );
    }
  },
  getAll: async (request: Request, response: Response) => {
    try {
      logger.info("[GET] Récupérer tous les coefficients saisonniers"); // Log d'information en couleur

      const pricePeriods = await pricePeriodsModel.getAll();
      APIResponse(response, pricePeriods, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des coefficients saisonniers: ",
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des coefficients saisonniers",
        500,
      );
    }
  },
  getByVehicleId: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      logger.info(
        `[GET] Récupérer tous les coefficients saisonniers lié au véhicule: ${id}`,
      ); // Log d'information en couleur

      const pricePeriods = await pricePeriodsModel.getByVehicleId(id);
      APIResponse(response, pricePeriods, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des coefficients saisonniers: ",
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des coefficients saisonniers",
        500,
      );
    }
  },
};
