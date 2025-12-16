import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "./../.env.dev" });

// Recréation de la Pool avec les données l'url local

const db_user = process.env.POSTGRES_USER;
const db_password = process.env.POSTGRES_PASSWORD;
const db_name = process.env.POSTGRES_DB;
const DATABASE_URL = `postgres://${db_user}:${db_password}@localhost:5433/${db_name}`;

export const pool = new Pool({
  connectionString: DATABASE_URL,
});
