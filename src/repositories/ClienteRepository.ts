import { pool } from "../database/connection";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const query = `
      INSERT INTO clientes (nome, email, telefone)
      VALUES ($1, $2, $3)
      RETURNING id, nome, email, telefone
    `;
    const result = await pool.query(query, [
      cliente.nome,
      cliente.email,
      cliente.telefone ?? null,
    ]);
    return this.mapearParaCliente(result.rows[0]);
  }

  async listarTodos(): Promise<Cliente[]> {
    const result = await pool.query(
      "SELECT id, nome, email, telefone FROM clientes ORDER BY nome",
    );
    return result.rows.map((linha) => this.mapearParaCliente(linha));
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const result = await pool.query(
      "SELECT id, nome, email, telefone FROM clientes WHERE id = $1",
      [id],
    );
    return result.rows.length === 0
      ? null
      : this.mapearParaCliente(result.rows[0]);
  }

  async buscarPorEmail(email: string): Promise<Cliente | null> {
    const result = await pool.query(
      "SELECT id, nome, email, telefone FROM clientes WHERE email = $1",
      [email],
    );
    return result.rows.length === 0
      ? null
      : this.mapearParaCliente(result.rows[0]);
  }

  async atualizar(id: number, cliente: Cliente): Promise<Cliente | null> {
    const query = `
      UPDATE clientes
      SET nome = $1, email = $2, telefone = $3
      WHERE id = $4
      RETURNING id, nome, email, telefone
    `;
    const result = await pool.query(query, [
      cliente.nome,
      cliente.email,
      cliente.telefone ?? null,
      id,
    ]);
    return result.rows.length === 0
      ? null
      : this.mapearParaCliente(result.rows[0]);
  }

  async excluir(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }

  private mapearParaCliente(linha: any): Cliente {
    return new Cliente({
      id: linha.id,
      nome: linha.nome,
      email: linha.email,
      telefone: linha.telefone,
    });
  }
}
