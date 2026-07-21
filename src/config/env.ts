import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

function getEnvVariable(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Variável de ambiente ausente: ${key}`);
  }

  return value;
}

export const databaseConfig: DatabaseConfig = {
  host: getEnvVariable("DB_HOST"),
  port: Number(getEnvVariable("DB_PORT")),
  user: getEnvVariable("DB_USER"),
  password: getEnvVariable("DB_PASSWORD"),
  database: getEnvVariable("DB_NAME"),
};
