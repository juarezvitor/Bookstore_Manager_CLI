import { pool } from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";

export interface IEmprestimoDetalhado {
  id: number;
  livroTitulo: string;
  clienteNome: string;
  dataEmprestimo: Date;
  dataDevolucao: Date | null;
}

export class EmprestimoRepository {
  async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
    const query = `
      INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo)
      VALUES ($1, $2, $3)
      RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao
    `;
    const result = await pool.query(query, [
      emprestimo.livroId,
      emprestimo.clienteId,
      emprestimo.dataEmprestimo,
    ]);
    return this.mapearParaEmprestimo(result.rows[0]);
  }

  async buscarPorId(id: number): Promise<Emprestimo | null> {
    const result = await pool.query(
      "SELECT id, livro_id, cliente_id, data_emprestimo, data_devolucao FROM emprestimos WHERE id = $1",
      [id],
    );
    return result.rows.length === 0
      ? null
      : this.mapearParaEmprestimo(result.rows[0]);
  }

  async listarComDetalhes(): Promise<IEmprestimoDetalhado[]> {
    const query = `
      SELECT
        e.id,
        l.titulo AS livro_titulo,
        c.nome AS cliente_nome,
        e.data_emprestimo,
        e.data_devolucao
      FROM emprestimos e
      INNER JOIN livros l ON l.id = e.livro_id
      INNER JOIN clientes c ON c.id = e.cliente_id
      ORDER BY e.data_emprestimo DESC
    `;
    const result = await pool.query(query);
    return result.rows.map((linha) => ({
      id: linha.id,
      livroTitulo: linha.livro_titulo,
      clienteNome: linha.cliente_nome,
      dataEmprestimo: linha.data_emprestimo,
      dataDevolucao: linha.data_devolucao,
    }));
  }

  async registrarDevolucao(id: number, dataDevolucao: Date): Promise<void> {
    await pool.query(
      "UPDATE emprestimos SET data_devolucao = $1 WHERE id = $2",
      [dataDevolucao, id],
    );
  }

  async excluir(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM emprestimos WHERE id = $1", [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  }

  private mapearParaEmprestimo(linha: any): Emprestimo {
    return new Emprestimo({
      id: linha.id,
      livroId: linha.livro_id,
      clienteId: linha.cliente_id,
      dataEmprestimo: linha.data_emprestimo,
      dataDevolucao: linha.data_devolucao,
    });
  }
}
