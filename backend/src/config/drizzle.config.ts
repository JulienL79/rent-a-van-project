import { defineConfig } from "drizzle-kit";

const db_user = process.env.POSTGRES_USER!;
const db_password = process.env.POSTGRES_PASSWORD!;
const db_name = process.env.POSTGRES_DB!;
const db_host = process.env.POSTGRES_HOST!;
const db_port = process.env.POSTGRES_PORT!;

export default defineConfig({
  dialect: "postgresql",
  out: "src/migrations",
  schema: "dist/backend/src/schemas/index.js",
  dbCredentials: {
    url: `postgres://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`,
  },
  verbose: true,
  strict: true,
});
