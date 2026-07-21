import { EmprestimoController } from "../controllers/EmprestimoController";
import { perguntar } from "../utils/readlineHelper";

const emprestimoController = new EmprestimoController();

export async function exibirMenuEmprestimo(): Promise<void> {
  let continuar = true;

  while (continuar) {
    console.log("--- Menu Empréstimos ---");
    console.log("1 - Registrar empréstimo");
    console.log("2 - Listar empréstimos");
    console.log("3 - Buscar empréstimo por id");
    console.log("4 - Finalizar devolução");
    console.log("5 - Excluir empréstimo");
    console.log("0 - Voltar ao menu principal");

    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const livroId = await perguntar("Id do livro: ");
        const clienteId = await perguntar("Id do cliente: ");
        await emprestimoController.cadastrar(
          Number(livroId),
          Number(clienteId),
        );
        break;
      }
      case "2":
        await emprestimoController.listar();
        break;
      case "3": {
        const id = await perguntar("Id do empréstimo: ");
        await emprestimoController.buscarPorId(Number(id));
        break;
      }
      case "4": {
        const id = await perguntar("Id do empréstimo a finalizar: ");
        await emprestimoController.finalizarDevolucao(Number(id));
        break;
      }
      case "5": {
        const id = await perguntar("Id do empréstimo a excluir: ");
        await emprestimoController.excluir(Number(id));
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
