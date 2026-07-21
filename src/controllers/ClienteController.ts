import { ClienteService } from "../services/ClienteService";
import { AppError } from "../utils/AppError";

export class ClienteController {
  constructor(private clienteService: ClienteService = new ClienteService()) {}

  async cadastrar(
    nome: string,
    email: string,
    telefone: string,
  ): Promise<void> {
    try {
      const cliente = await this.clienteService.cadastrar({
        nome,
        email,
        telefone: telefone || undefined,
      });
      console.log(`\nCliente cadastrado com sucesso! (id: ${cliente.id})\n`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async listar(): Promise<void> {
    try {
      const clientes = await this.clienteService.listar();
      if (clientes.length === 0) {
        console.log("\nNenhum cliente cadastrado.\n");
        return;
      }
      console.log("\n--- Clientes cadastrados ---");
      clientes.forEach((c) => console.log(`[${c.id}] ${c.nome} - ${c.email}`));
      console.log("");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async buscarPorId(id: number): Promise<void> {
    try {
      const c = await this.clienteService.buscarPorId(id);
      console.log(
        `\n[${c.id}] ${c.nome} - ${c.email} - ${c.telefone ?? "N/A"}\n`,
      );
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async atualizar(
    id: number,
    nome: string,
    email: string,
    telefone: string,
  ): Promise<void> {
    try {
      await this.clienteService.atualizar(id, {
        nome,
        email,
        telefone: telefone || undefined,
      });
      console.log("\nCliente atualizado com sucesso!\n");
    } catch (error) {
      this.tratarErro(error);
    }
  }

  async excluir(id: number): Promise<void> {
    try {
      await this.clienteService.excluir(id);
      console.log("\nCliente excluído com sucesso!\n");
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
