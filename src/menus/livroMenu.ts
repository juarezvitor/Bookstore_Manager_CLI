import { LivroController } from "../controllers/LivroController";
import { perguntar } from "../utils/readlineHelper";

const livroController = new LivroController();

export async function exibirMenuLivro(): Promise<void> {
  let continuar = true;

  while (continuar) {
    console.log("--- Menu Livros ---");
    console.log("1 - Cadastrar livro");
    console.log("2 - Listar livros");
    console.log("3 - Buscar livro por id");
    console.log("4 - Atualizar livro");
    console.log("5 - Excluir livro");
    console.log("0 - Voltar ao menu principal");

    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1": {
        const titulo = await perguntar("Título: ");
        const autorId = await perguntar("Id do autor: ");
        const anoPublicacao = await perguntar("Ano de publicação (opcional): ");
        const genero = await perguntar("Gênero (opcional): ");
        await livroController.cadastrar(
          titulo,
          Number(autorId),
          anoPublicacao,
          genero,
        );
        break;
      }
      case "2":
        await livroController.listar();
        break;
      case "3": {
        const id = await perguntar("Id do livro: ");
        await livroController.buscarPorId(Number(id));
        break;
      }
      case "4": {
        const id = await perguntar("Id do livro a atualizar: ");
        const titulo = await perguntar("Novo título: ");
        const autorId = await perguntar("Novo id do autor: ");
        const anoPublicacao = await perguntar(
          "Novo ano de publicação (opcional): ",
        );
        const genero = await perguntar("Novo gênero (opcional): ");
        await livroController.atualizar(
          Number(id),
          titulo,
          Number(autorId),
          anoPublicacao,
          genero,
        );
        break;
      }
      case "5": {
        const id = await perguntar("Id do livro a excluir: ");
        await livroController.excluir(Number(id));
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
