import { logger } from "../src/utils/index.js";
import { pool } from "../src/config/index.js";

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
    logger.info("💤 Pool fermé");
    process.exit(0);
  }
}

main();
