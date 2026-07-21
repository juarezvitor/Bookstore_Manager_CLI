import { EmprestimoService } from "../services/EmprestimoService";
import { AppError } from "../utils/AppError";

export class EmprestimoController {
  constructor(
    private emprestimoService: EmprestimoService = new EmprestimoService(),
  ) {}

  async cadastrar(livroId: number, clienteId: number): Promise<void> {
    try {
      const emprestimo = await this.emprestimoService.cadastrar(
        livroId,
        clienteId,
      );
      console.log(
        `\nEmpréstimo registrado com sucesso! (id: ${emprestimo.id})\n`,
      );
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const emprestimos = await this.emprestimoService.listar();
      if (emprestimos.length === 0) {
        console.log("\nNenhum empréstimo registrado.\n");
        return;
      }
      console.log("\n--- Empréstimos ---");
      emprestimos.forEach((e) => {
        const status = e.dataDevolucao
          ? `Devolvido em ${new Date(e.dataDevolucao).toLocaleDateString()}`
          : "Em aberto";
        console.log(
          `[${e.id}] "${e.livroTitulo}" - ${e.clienteNome} - Emprestado em ${new Date(e.dataEmprestimo).toLocaleDateString()} - ${status}`,
        );
      });
      console.log("");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const e = await this.emprestimoService.buscarPorId(id);
      const status = e.estaEmAberto()
        ? "Em aberto"
        : `Devolvido em ${e.dataDevolucao?.toLocaleDateString()}`;
      console.log(
        `\n[${e.id}] Livro id: ${e.livroId} - Cliente id: ${e.clienteId} - ${status}\n`,
      );
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async finalizarDevolucao(id: number): Promise<void> {
    try {
      await this.emprestimoService.finalizarDevolucao(id);
      console.log("\nDevolução registrada com sucesso!\n");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      await this.emprestimoService.excluir(id);
      console.log("\nEmpréstimo excluído com sucesso!\n");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  private tratarErro(error: unknown): void {
    if (error instanceof AppError) {
      console.log(`\nErro: ${error.message}\n`);
    } else {
      console.error("\nOcorreu um erro inesperado. Tente novamente.\n");
      console.error(error);
    }
  }
}
