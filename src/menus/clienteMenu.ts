import { ClienteController } from "../controllers/ClienteController";
import { perguntar } from "../utils/readlineHelper";

const clienteController = new ClienteController();

export async function exibirMenuCliente(): Promise<void> {
  let continuar = true;

  while (continuar) {
    console.log("--- Menu Clientes ---");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Listar clientes");
    console.log("3 - Buscar cliente por id");
    console.log("4 - Atualizar cliente");
    console.log("5 - Excluir cliente");
    console.log("0 - Voltar ao menu principal");

    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const nome = await perguntar("Nome: ");
        const email = await perguntar("Email: ");
        const telefone = await perguntar("Telefone (opcional): ");
        await clienteController.cadastrar(nome, email, telefone);
        break;
      }
      case "2":
        await clienteController.listar();
        break;
      case "3": {
        const id = await perguntar("Id do cliente: ");
        await clienteController.buscarPorId(Number(id));
        break;
      }
      case "4": {
        const id = await perguntar("Id do cliente a atualizar: ");
        const nome = await perguntar("Novo nome: ");
        const email = await perguntar("Novo email: ");
        const telefone = await perguntar("Novo telefone (opcional): ");
        await clienteController.atualizar(Number(id), nome, email, telefone);
        break;
      }
      case "5": {
        const id = await perguntar("Id do cliente a excluir: ");
        await clienteController.excluir(Number(id));
        break;
      }
      case "0":
        continuar = false;
        break;
      default:
        console.log("\nOpção inválida.\n");
    }
  }
}
