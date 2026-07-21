import { pool } from "../database/connection";
import { Autor } from "../models/Autor";

export class AutorRepository {
  async criar(autor: Autor): Promise<Autor> {
    const query = `
      INSERT INTO autores (nome, nacionalidade, data_nascimento)
      VALUES ($1, $2, $3)
      RETURNING id, nome, nacionalidade, data_nascimento
    `;
    const valores = [
      autor.nome,
      autor.nacionalidade ?? null,
      autor.dataNascimento ?? null,
    ];

    const result = await pool.query(query, valores);
    return this.mapearParaAutor(result.rows[0]);
  }

  async listarTodos(): Promise<Autor[]> {
    const query = `
      SELECT id, nome, nacionalidade, data_nascimento
      FROM autores
      ORDER BY nome
    `;
    const result = await pool.query(query);
    return result.rows.map((linha) => this.mapearParaAutor(linha));
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const query = `
      SELECT id, nome, nacionalidade, data_nascimento
      FROM autores
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapearParaAutor(result.rows[0]);
  }

  async atualizar(id: number, autor: Autor): Promise<Autor | null> {
    const query = `
      UPDATE autores
      SET nome = $1, nacionalidade = $2, data_nascimento = $3
      WHERE id = $4
      RETURNING id, nome, nacionalidade, data_nascimento
    `;
    const valores = [
      autor.nome,
      autor.nacionalidade ?? null,
      autor.dataNascimento ?? null,
      id,
    ];

    const result = await pool.query(query, valores);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapearParaAutor(result.rows[0]);
  }

  async excluir(id: number): Promise<boolean> {
    const query = `DELETE FROM autores WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  private mapearParaAutor(linha: any): Autor {
    return new Autor({
      id: linha.id,
      nome: linha.nome,
      nacionalidade: linha.nacionalidade,
      dataNascimento: linha.data_nascimento,
    });
  }
}
