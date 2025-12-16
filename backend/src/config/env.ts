import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { EnvConfig } from "../types/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const db_user = process.env.POSTGRES_USER!;
const db_password = process.env.POSTGRES_PASSWORD!;
const db_name = process.env.POSTGRES_DB!;
const db_host = process.env.POSTGRES_HOST!;
const db_port = process.env.POSTGRES_PORT!;

console.log("NODE_ENV: ", process.env.NODE_ENV);

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || "3000"),
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  ORIGIN: process.env.ORIGIN || "http://localhost:5174",
  DATABASE_URL: `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`,
  JWT_SECRET:
    process.env.JWT_SECRET || "SecretTresBienGardeNePasDivulgerPubliquement",
  RESET_MAIL_ADDRESS: process.env.RESET_MAIL_ADDRESS || "reset@gmail.com",
  WEBSITE_URL: process.env.WEBSITE_URL || "A_MODIFIER",
  PASSWORD_RESET_MAIL: process.env.PASSWORD_RESET_MAIL || "reset",
  TZ: process.env.TZ || "Europe/Paris",
  REDIS_HOST: process.env.REDIS_HOST || "redis",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
};
