import {
  APIResponse,
  deleteUploadedImage,
  logger,
  saveUploadedImages,
  zodFieldErrors,
} from "../utils/index.js";
import { picturesModel, userModel, vehiclesModel } from "../models/index.js";
import {
  picturesRegisterValidation,
  vehiclesRegisterValidation,
} from "@rent-a-van/shared/validators/index.js";
import { z } from "zod";
import { geoService } from "../services/index.js";
export const vehiclesController = {
  get: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[GET] Récupérer le véhicule avec l'id: ${id}`);
      const vehicle = await vehiclesModel.get(id);
      if (!vehicle) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 404);
      }
      APIResponse(response, vehicle, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération du véhicule: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du véhicule",
        500,
      );
    }
  },
  getDetails: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[GET] Récupérer le véhicule avec détails avec l'id: ${id}`);
      const vehicle = await vehiclesModel.getDetails(id);
      if (!vehicle) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 404);
      }
      APIResponse(response, vehicle, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération du véhicule: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du véhicule",
        500,
      );
    }
  },
  create: async (request, response) => {
    try {
      logger.info("[POST] Créer un véhicule"); // Log d'information en couleur
      const files = request.files;
      const imageUrls = saveUploadedImages(files ?? []);
      const dataToValidate = {
        ...request.body,
        pictures: imageUrls.length > 0 ? imageUrls : [],
      };
      const vehicleData = vehiclesRegisterValidation.parse(dataToValidate);
      const { user } = response.locals;
      const coordinates = await geoService.getCoordinatesByCode(
        vehicleData.cityCode,
      );
      if (!coordinates || coordinates.length !== 2) {
        throw new Error("Coordonnées invalides");
      }
      const [lat, lon] = coordinates;
      const [vehicle] = await vehiclesModel.create({
        userId: user.id,
        latCoordinates: lat,
        lonCoordinates: lon,
        ...vehicleData,
      });
      if (vehicleData.equipmentIds && vehicleData.equipmentIds.length > 0) {
        await vehiclesModel.attachEquipments(
          vehicle.id,
          vehicleData.equipmentIds,
        );
      }
      if (vehicleData.pictures && vehicleData.pictures.length > 0) {
        for (const pic of vehicleData.pictures) {
          await picturesModel.create({
            src: pic,
            userId: user.id,
            vehicleId: vehicle.id,
          });
        }
      }
      APIResponse(response, vehicle, "OK", 201);
    } catch (error) {
      logger.error("Erreur lors de la création du véhicule: ", error);
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
        "Erreur lors de la création du véhicule",
        500,
      );
    }
  },
  delete: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(`[DELETE] Supprimer le véhicule avec l'id: ${id}`);
      const vehicle = await vehiclesModel.get(id);
      if (!vehicle) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 404);
      }
      await vehiclesModel.delete(id);
      APIResponse(response, null, "OK", 201);
    } catch (error) {
      logger.error("Erreur lors de la suppression du véhicule: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression du véhicule",
        500,
      );
    }
  },
  update: async (request, response) => {
    try {
      const { id } = request.params;
      const { user } = response.locals;
      logger.info(`[UPDATE] Modifier le véhicule avec l'id: ${id}`);
      const vehicle = await vehiclesModel.get(id);
      if (!vehicle) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 404);
      }
      const vehicleData = vehiclesRegisterValidation.parse(request.body);
      const coordinates = await geoService.getCoordinatesByCode(
        vehicleData.cityCode,
      );
      if (!coordinates || coordinates.length !== 2) {
        throw new Error("Coordonnées invalides");
      }
      const [lat, lon] = coordinates;
      await vehiclesModel.update(id, {
        latCoordinates: lat,
        lonCoordinates: lon,
        ...vehicleData,
      });
      // Synchronisation des équipements
      if (Array.isArray(vehicleData.equipmentIds)) {
        const currentEquipments = await vehiclesModel.getEquipments(vehicle.id);
        const currentIds = currentEquipments.map((e) => e.id);
        const newIds = vehicleData.equipmentIds;
        const toRemove = currentIds.filter((id) => !newIds.includes(id));
        const toAdd = newIds.filter((id) => !currentIds.includes(id));
        if (toRemove.length > 0) {
          await vehiclesModel.detachEquipments(vehicle.id, toRemove);
        }
        if (toAdd.length > 0) {
          await vehiclesModel.attachEquipments(vehicle.id, toAdd);
        }
      }
      return APIResponse(response, null, "OK", 200);
    } catch (error) {
      logger.error("Erreur lors de la màj du véhicule: ", error);
      if (error instanceof z.ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        return APIResponse(
          response,
          formattedErrors,
          "Le formulaire est invalide",
          400,
        );
      }
      return APIResponse(
        response,
        null,
        "Erreur lors de la màj du véhicule",
        500,
      );
    }
  },
  updatePictures: async (request, response) => {
    try {
      const { id } = request.params;
      const { user } = response.locals;
      logger.info(`[UPDATE] Modifier les photos du véhicule : ${id}`);
      const vehicle = await vehiclesModel.get(id);
      if (!vehicle) {
        logger.error("Véhicule inexistant");
        return APIResponse(response, null, "Véhicule inexistant", 404);
      }
      const imageUrls = saveUploadedImages(request.files);
      if (imageUrls.length > 5) {
        return APIResponse(response, null, "Maximum 5 photos autorisées", 400);
      }
      // Suppression des photos dans tous les cas
      if (vehicle.pictures && vehicle.pictures.length > 0) {
        for (const pic of vehicle.pictures) {
          await picturesModel.delete(pic.id);
          try {
            deleteUploadedImage(pic.src);
          } catch (err) {
            logger.warn(
              "Erreur lors de la suppression du fichier image :",
              err,
            );
          }
        }
      }
      // Ajout des nouvelles photos en base si elles existent
      if (imageUrls && imageUrls.length > 0) {
        for (const src of imageUrls) {
          picturesRegisterValidation.parse({ src });
          await picturesModel.create({
            src,
            userId: user.id,
            vehicleId: vehicle.id,
          });
        }
      }
      return APIResponse(
        response,
        imageUrls,
        "Photos du véhicules mise à jour",
        200,
      );
    } catch (error) {
      logger.error("Erreur lors de la màj du véhicule: ", error);
      APIResponse(response, null, "Erreur lors de la màj du véhicule", 500);
    }
  },
  getAllByUser: async (request, response) => {
    try {
      const { id } = request.params;
      logger.info(
        `[GET] Récupérer tous les véhicules de l'utilisateur : ${id}`,
      ); // Log d'information en couleur
      const user = await userModel.get(id);
      if (!user) {
        logger.error("User inexistant");
        return APIResponse(response, null, "User inexistant", 404);
      }
      const vehicles = await vehiclesModel.getAllByUser(id);
      APIResponse(response, vehicles, "OK");
    } catch (error) {
      logger.error(
        `Erreur lors de la récupération des véhicules de l'utilisateur cible: `,
        error,
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des véhicules",
        500,
      );
    }
  },
  getAll: async (request, response) => {
    try {
      logger.info("[GET] Récupérer tous les véhicules"); // Log d'information en couleur
      const vehicles = await vehiclesModel.getAll();
      APIResponse(response, vehicles, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération des véhicules: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des véhicules",
        500,
      );
    }
  },
};
