import { logger } from "../dist/backend/src/utils/index.js";
import { pool } from "./utils/localPool.ts";

async function main() {
  try {
    await pool.query(`
			DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
			DROP SCHEMA drizzle CASCADE;
			CREATE SCHEMA drizzle;
		`);
    logger.info("✅ Toutes les tables et types ont été supprimés !");
  } catch (err) {
    logger.error("❌ Erreur lors du truncate :", err);
  } finally {
    await pool.end();
  }
}

main();
