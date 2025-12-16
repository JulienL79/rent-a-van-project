import { pool } from "./index.js";
import { logger } from "../utils/index.js";
export async function initDatabase() {
  try {
    await pool.query("SELECT 1");
    logger.info("✅ Connexion à PostgreSQL établie avec succès.");
  } catch (error) {
    logger.error("❌ Échec de la connexion à PostgreSQL:", error.message);
    process.exit(1);
  }
}
