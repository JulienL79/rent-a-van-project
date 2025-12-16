import { APIResponse, logger } from "../utils/index.js";
export const pingController = {
  ping: async (request, response) => {
    try {
      logger.info(`[GET] Ping demandé`);
      APIResponse(response, null, "OK");
    } catch (error) {
      logger.error("Erreur lors de la récupération de l'image: ", error);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération de l'image",
        500,
      );
    }
  },
};
