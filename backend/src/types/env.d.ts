export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  ORIGIN: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  RESET_MAIL_ADDRESS: string;
  WEBSITE_URL: string;
  PASSWORD_RESET_MAIL: string;
  MJ_APIKEY_PUBLIC: string;
  MJ_APIKEY_PRIVATE: string;
  TZ: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
}
