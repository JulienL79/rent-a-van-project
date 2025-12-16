import { logger, APIResponse } from "../utils/index.js";
import rateLimit from "express-rate-limit";
export const requestLimiter = (limit) => {
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: limit, // Utilisation du paramètre `limit`
    message: "Trop de tentatives de réinitialisation. Réessayez plus tard.",
    headers: true,
  });
  return async (request, response, next) => {
    logger.info("[MIDDLEWARE] : requestLimiter");
    try {
      limiter(request, response, (err) => {
        if (err) {
          logger.error("Limite de requêtes atteinte", err);
          return APIResponse(response, null, "Trop de tentatives", 429);
        }
        next();
      });
    } catch (error) {
      logger.error("Token invalide", error);
      return APIResponse(response, null, "Token invalide", 401);
    }
  };
};
