// Importe vos variables d'environnement
import { env } from "./index.js";
import { logger } from "../utils/index.js";
// Importe le client Redis (utilisant ioredis comme exemple)
import pkg from "ioredis";
const Redis = pkg.default;
// Récupère les variables d'environnement
const { REDIS_HOST, REDIS_PORT } = env;
// Assurez-vous que les variables sont définies
if (!REDIS_HOST || !REDIS_PORT) {
  throw new Error(
    "REDIS_HOST or REDIS_PORT environment variables are not set.",
  );
}
const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: Number(env.REDIS_PORT),
  retryStrategy: (times) => Math.min(times * 50, 2000), // retry 50ms, max 2s
});
redisClient.on("connect", () => logger.info("✅ Redis connected"));
redisClient.on("error", (err) => logger.warn("❌ Redis not ready yet", err));
export default redisClient;
