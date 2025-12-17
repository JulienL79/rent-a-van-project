import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../src/config/index.js";
import { logger } from "../src/utils/index.js";

async function main() {
  try {
    logger.info("🌐 Connecting to database...");
    const db: NodePgDatabase = drizzle(pool);

    logger.info("📦 Running migrations...");
    await migrate(db, { migrationsFolder: "src/migrations" });

    logger.info("✅ Database migrated successfully!");
  } catch (err) {
    logger.error("❌ Migration failed:", err);
  } finally {
    // Toujours fermer le pool pour éviter les connexions pendantes
    await pool.end();
    logger.info("🔌 Database connection closed.");
    process.exit(0);
  }
}

main();
