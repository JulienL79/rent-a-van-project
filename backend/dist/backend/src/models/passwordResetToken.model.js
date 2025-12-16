import { db } from "../config/pool.js";
import { passwordResetTokens } from "../schemas/index.js";
import { logger } from "../utils/index.js";
import { eq, lt, or } from "drizzle-orm";
export const passwordResetTokenModel = {
  create: async (token) => {
    try {
      return await db
        .insert(passwordResetTokens)
        .values(token)
        .returning({
          id: passwordResetTokens.id,
          token: passwordResetTokens.token,
        })
        .execute();
    } catch (error) {
      logger.error("Impossible de créer le token:", error);
      throw new Error("Le token n'a pas pu être créée");
    }
  },
  delete: async (id) => {
    try {
      return await db
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible de supprimer le token: ", error);
      throw new Error("Le token ne peut pas être supprimé");
    }
  },
  update: async (id, token) => {
    try {
      return await db
        .update(passwordResetTokens)
        .set(token)
        .where(eq(passwordResetTokens.id, id))
        .execute();
    } catch (error) {
      logger.error("Impossible d'update le token: ", error);
      throw new Error("Le token ne peut pas être màj");
    }
  },
  getByToken: async (token) => {
    try {
      return await db
        .select({
          id: passwordResetTokens.id,
          token: passwordResetTokens.token,
          expiresAt: passwordResetTokens.expiresAt,
          userId: passwordResetTokens.userId,
          isUsed: passwordResetTokens.isUsed,
        })
        .from(passwordResetTokens)
        .where(eq(passwordResetTokens.token, token))
        .execute();
    } catch (error) {
      logger.error("Impossible de récupérer le token: ", error);
      throw new Error("Le token ne peut pas être récupéré");
    }
  },
  getAll: async () => {
    try {
      return await db
        .select({
          id: passwordResetTokens.id,
          token: passwordResetTokens.token,
          expiresAt: passwordResetTokens.expiresAt,
          userId: passwordResetTokens.userId,
          isUsed: passwordResetTokens.isUsed,
        })
        .from(passwordResetTokens)
        .execute();
    } catch (error) {
      logger.error(`Impossible de récupérer les passwordResetTokens: `, error);
      return [];
    }
  },
  deleteExpiredOrUsedTokens: async () => {
    try {
      return await db
        .delete(passwordResetTokens)
        .where(
          or(
            lt(passwordResetTokens.expiresAt, new Date()), // Supprime les tokens expirés
            eq(passwordResetTokens.isUsed, true), // Supprime les tokens déjà utilisés
          ),
        )
        .execute();
    } catch (error) {
      logger.error(
        "Impossible de supprimer les tokens expirés ou utilisés: ",
        error,
      );
      throw new Error("Les tokens ne peuvent pas être supprimés");
    }
  },
};
