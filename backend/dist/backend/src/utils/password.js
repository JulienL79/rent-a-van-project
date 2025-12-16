import argon2 from "argon2";
import { logger } from "./index.js";
//Hash d'un password
export const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    logger.error("Erreur lors du hash du mot de passe: " + err.message);
    throw new Error("Erreur lors du hash du mot de passe");
  }
};
// Vérification mot de passe
export const verifyPassword = async (password, hash) => {
  try {
    const verify = await argon2.verify(hash, password);
    return verify;
  } catch (err) {
    logger.error(
      "Erreur lors de la vérification du mot de passe: " + err.message,
    );
    throw new Error("Erreur lors de la vérification du mot de passe");
  }
};
