import { Pool } from "pg";
import { databaseConfig } from "../config/env";

export const pool = new Pool({
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
});

export async function testConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log("Conexão com o PostgreSQL estabelecida com sucesso.");
    client.release();
  } catch (error) {
    console.error("Falha ao conectar ao PostgreSQL:", error);
    throw error;
  }
}
