import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../dist/backend/src/schemas/index.js"; // utilise le code source TS
import { logger } from "../dist/backend/src/utils/index.js";
import { pool } from "./utils/localPool.ts";

async function main() {
  try {
    const db = drizzle(pool, { schema });

    logger.info("🌱 Connected to DB");

    const tablesRes = await pool.query(
      `SELECT tablename FROM pg_tables WHERE schemaname='public'`,
    );
    const tables: string[] = tablesRes.rows.map((row) => row.tablename);

    if (tables.length === 0) {
      logger.info("⚠️ Aucun table trouvée");
      return;
    }

    const truncateSql = `TRUNCATE TABLE ${tables.map((t) => `"${t}"`).join(", ")} CASCADE;`;
    logger.info("🧹 Vider toutes les tables :", truncateSql);

    await db.execute(truncateSql);
    logger.info("✅ Toutes les tables ont été vidées");
  } catch (err) {
    logger.error("❌ Échec du vidage :", err);
  } finally {
    await pool.end();
    logger.info("💤 Pool fermé");
  }
}

main();
