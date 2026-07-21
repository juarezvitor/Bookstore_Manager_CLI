import { AutorService } from "../services/AutorService";
import { AppError } from "../utils/AppError";

export class AutorController {
  constructor(private autorService: AutorService = new AutorService()) {}

  async cadastrar(
    nome: string,
    nacionalidade: string,
    dataNascimento: string,
  ): Promise<void> {
    try {
      const autor = await this.autorService.cadastrar({
        nome,
        nacionalidade: nacionalidade || undefined,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
      });
      console.log(`\nAutor cadastrado com sucesso! (id: ${autor.id})\n`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const autores = await this.autorService.listar();

      if (autores.length === 0) {
        console.log("\nNenhum autor cadastrado.\n");
        return;
      }

      console.log("\n--- Autores cadastrados ---");
      autores.forEach((autor) => {
        console.log(
          `[${autor.id}] ${autor.nome} - ${autor.nacionalidade ?? "N/A"}`,
        );
      });
      console.log("");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const autor = await this.autorService.buscarPorId(id);
      console.log(
        `\n[${autor.id}] ${autor.nome} - ${autor.nacionalidade ?? "N/A"}\n`,
      );
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async atualizar(
    id: number,
    nome: string,
    nacionalidade: string,
    dataNascimento: string,
  ): Promise<void> {
    try {
      await this.autorService.atualizar(id, {
        nome,
        nacionalidade: nacionalidade || undefined,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
      });
      console.log("\nAutor atualizado com sucesso!\n");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      await this.autorService.excluir(id);
      console.log("\nAutor excluído com sucesso!\n");
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
