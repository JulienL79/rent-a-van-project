import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./index.js";
import { logger } from "../utils/index.js";
const { DATABASE_URL } = env;
async function main() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    logger.info("🌐 Connecting to database...");
    const db = drizzle(pool);
    logger.info("📦 Running migrations...");
    await migrate(db, { migrationsFolder: "src/migrations" });
    logger.info("✅ Database migrated successfully!");
  } catch (err) {
    logger.error("❌ Migration failed:", err);
  } finally {
    // Toujours fermer le pool pour éviter les connexions pendantes
    await pool.end();
    logger.info("🔌 Database connection closed.");
  }
}
main();
