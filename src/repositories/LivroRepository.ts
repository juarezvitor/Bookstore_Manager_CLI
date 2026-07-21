import { pool } from "../database/connection";
import { Livro } from "../models/Livro";

export class LivroRepository {
  async criar(livro: Livro): Promise<Livro> {
    const query = `
      INSERT INTO livros (titulo, autor_id, ano_publicacao, genero, disponivel)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, titulo, autor_id, ano_publicacao, genero, disponivel
    `;
    const valores = [
      livro.titulo,
      livro.autorId,
      livro.anoPublicacao ?? null,
      livro.genero ?? null,
      livro.disponivel,
    ];

    const result = await pool.query(query, valores);
    return this.mapearParaLivro(result.rows[0]);
  }

  async listarTodos(): Promise<Livro[]> {
    const query = `
      SELECT id, titulo, autor_id, ano_publicacao, genero, disponivel
      FROM livros
      ORDER BY titulo
    `;
    const result = await pool.query(query);
    return result.rows.map((linha) => this.mapearParaLivro(linha));
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const query = `
      SELECT id, titulo, autor_id, ano_publicacao, genero, disponivel
      FROM livros
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows.length === 0
      ? null
      : this.mapearParaLivro(result.rows[0]);
  }

  async atualizar(id: number, livro: Livro): Promise<Livro | null> {
    const query = `
      UPDATE livros
      SET titulo = $1, autor_id = $2, ano_publicacao = $3, genero = $4, disponivel = $5
      WHERE id = $6
      RETURNING id, titulo, autor_id, ano_publicacao, genero, disponivel
    `;
    const valores = [
      livro.titulo,
      livro.autorId,
      livro.anoPublicacao ?? null,
      livro.genero ?? null,
      livro.disponivel,
      id,
    ];

    const result = await pool.query(query, valores);
    return result.rows.length === 0
      ? null
      : this.mapearParaLivro(result.rows[0]);
  }

  async atualizarDisponibilidade(
    id: number,
    disponivel: boolean,
  ): Promise<void> {
    const query = `UPDATE livros SET disponivel = $1 WHERE id = $2`;
    await pool.query(query, [disponivel, id]);
  }

  async excluir(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM livros WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  }

  private mapearParaLivro(linha: any): Livro {
    return new Livro({
      id: linha.id,
      titulo: linha.titulo,
      autorId: linha.autor_id,
      anoPublicacao: linha.ano_publicacao,
      genero: linha.genero,
      disponivel: linha.disponivel,
    });
  }
}
