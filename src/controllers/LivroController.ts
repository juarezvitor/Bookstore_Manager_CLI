import { LivroService } from "../services/LivroService";
import { AppError } from "../utils/AppError";

export class LivroController {
  constructor(private livroService: LivroService = new LivroService()) {}

  async cadastrar(
    titulo: string,
    autorId: number,
    anoPublicacao: string,
    genero: string,
  ): Promise<void> {
    try {
      const livro = await this.livroService.cadastrar({
        titulo,
        autorId,
        anoPublicacao: anoPublicacao ? Number(anoPublicacao) : undefined,
        genero: genero || undefined,
      });
      console.log(`\nLivro cadastrado com sucesso! (id: ${livro.id})\n`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const livros = await this.livroService.listar();
      if (livros.length === 0) {
        console.log("\nNenhum livro cadastrado.\n");
        return;
      }
      console.log("\n--- Livros cadastrados ---");
      livros.forEach((livro) => {
        console.log(
          `[${livro.id}] ${livro.titulo} (autor id: ${livro.autorId}) - ${livro.disponivel ? "Disponível" : "Emprestado"}`,
        );
      });
      console.log("");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const livro = await this.livroService.buscarPorId(id);
      console.log(
        `\n[${livro.id}] ${livro.titulo} (autor id: ${livro.autorId}) - ${livro.disponivel ? "Disponível" : "Emprestado"}\n`,
      );
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async atualizar(
    id: number,
    titulo: string,
    autorId: number,
    anoPublicacao: string,
    genero: string,
  ): Promise<void> {
    try {
      await this.livroService.atualizar(id, {
        titulo,
        autorId,
        anoPublicacao: anoPublicacao ? Number(anoPublicacao) : undefined,
        genero: genero || undefined,
      });
      console.log("\nLivro atualizado com sucesso!\n");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      await this.livroService.excluir(id);
      console.log("\nLivro excluído com sucesso!\n");
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
