import { db } from "../config/pool.js";
import { APIResponse } from "../utils/index.js";
import { and, eq, or } from "drizzle-orm";
import { logger } from "../utils/index.js";
import {
  messages,
  pricePeriods,
  users,
  vehicles,
  bookings,
} from "../schemas/index.js";
export const isAdminOrOwner = (schema) => {
  return async (request, response, next) => {
    try {
      logger.info("[MIDDLEWARE] : isAdminOrOwner");
      const { user } = response.locals;
      if (user.isAdmin) {
        return next();
      }
      const { id } = request.params;
      if (schema === bookings) {
        // Empecher la modification et la suppression d'une réservation par un utilisateur non admin
        if (request.method === "PUT" || request.method === "DELETE")
          throw new Error();
        const [owner] = await db
          .select({ id: schema.id })
          .from(schema)
          .where(
            and(
              or(eq(schema.ownerId, user.id), eq(schema.renterId, user.id)),
              eq(schema.id, id),
            ),
          );
        if (!owner) throw new Error();
        return next();
      }
      // Si le schéma est pricePeriods ou options nous devons vérifier si le user est propriétaire du véhicle auquel est relié le schema cherché
      if (schema === pricePeriods) {
        const [result] = await db
          .select({ id: schema.id })
          .from(schema)
          .innerJoin(vehicles, eq(schema.vehicleId, vehicles.id))
          .where(and(eq(schema.id, id), eq(vehicles.userId, user.id)));
        if (!result) throw new Error();
        return next();
      }
      const [owner] = await db
        .select({ id: schema.id })
        .from(schema)
        .where(
          and(
            eq(
              schema === users
                ? schema.id // Si le schéma est users, nous devons vérifier si le user connecté est bien le user recherché (user.id)
                : schema === messages
                  ? schema.senderId // Si le schéma est messages, nous devons vérifier si le user connecté est bien l'envoyeur dyu message (messages.senderId)
                  : schema.userId,
              user.id,
            ),
            eq(schema.id, id),
          ),
        );
      if (!owner) throw new Error();
      return next();
    } catch (error) {
      logger.error("Droits invalides", error);
      return APIResponse(response, null, "Droits invalides", 403);
    }
  };
};
