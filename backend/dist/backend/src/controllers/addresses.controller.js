import { APIResponse, logger } from "../utils/index.js";
import { geoService } from "../services/index.js";
export const addressesController = {
  getCity: async (request, response) => {
    try {
      const { content } = request.params;
      logger.info(`[GET] Récupérer les villes avec le nom: ${content}`);
      const data = await geoService.getCommunesByNameOrZip(content);
      if (!data || data.length === 0) {
        return APIResponse(response, [], "Aucune ville trouvée", 404);
      }
      return APIResponse(response, data, "Villes récupérées avec succès");
    } catch (error) {
      logger.error("Erreur lors de la récupération des villes :", error);
      return APIResponse(response, null, "Erreur serveur", 500);
    }
  },
  getCoord: async (request, response) => {
    try {
      const { code } = request.params;
      logger.info(`[GET] Récupérer les coordonnées de la ville : ${code}`);
      const coordinates = await geoService.getCoordinatesByCode(code);
      if (!coordinates) {
        return APIResponse(response, null, "Coordonnées non trouvées", 404);
      }
      const [lat, lon] = coordinates;
      return APIResponse(
        response,
        { lat, lon },
        "Coordonnées récupérées avec succès",
      );
    } catch (error) {
      logger.error("Erreur lors de la récupération des coordonnées :", error);
      return APIResponse(response, null, "Erreur serveur", 500);
    }
  },
};
