import { AutorController } from "../controllers/AutorController";
import { perguntar } from "../utils/readlineHelper";

const autorController = new AutorController();

export async function exibirMenuAutor(): Promise<void> {
  let continuar = true;

  while (continuar) {
    console.log("--- Menu Autores ---");
    console.log("1 - Cadastrar autor");
    console.log("2 - Listar autores");
    console.log("3 - Buscar autor por id");
    console.log("4 - Atualizar autor");
    console.log("5 - Excluir autor");
    console.log("0 - Voltar ao menu principal");

    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const nome = await perguntar("Nome: ");
        const nacionalidade = await perguntar("Nacionalidade (opcional): ");
        const dataNascimento = await perguntar(
          "Data de nascimento (AAAA-MM-DD, opcional): ",
        );
        await autorController.cadastrar(nome, nacionalidade, dataNascimento);
        break;
      }
      case "2":
        await autorController.listar();
        break;
      case "3": {
        const id = await perguntar("Id do autor: ");
        await autorController.buscarPorId(Number(id));
        break;
      }
      case "4": {
        const id = await perguntar("Id do autor a atualizar: ");
        const nome = await perguntar("Novo nome: ");
        const nacionalidade = await perguntar(
          "Nova nacionalidade (opcional): ",
        );
        const dataNascimento = await perguntar(
          "Nova data de nascimento (AAAA-MM-DD, opcional): ",
        );
        await autorController.atualizar(
          Number(id),
          nome,
          nacionalidade,
          dataNascimento,
        );
        break;
      }
      case "5": {
        const id = await perguntar("Id do autor a excluir: ");
        await autorController.excluir(Number(id));
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
