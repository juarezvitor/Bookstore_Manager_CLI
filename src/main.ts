import { testConnection } from "./database/connection";
import { exibirMenuAutor } from "./menus/autorMenu";
import { exibirMenuLivro } from "./menus/livroMenu";
import { perguntar, fecharReadline } from "./utils/readlineHelper";

async function menuPrincipal(): Promise<void> {
  let continuar = true;

  while (continuar) {
    console.log("=== BookStore Manager CLI ===");
    console.log("1 - Autores");
    console.log("2 - Livros");
    console.log("0 - Sair");

    const opcao = await perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await exibirMenuAutor();
        break;
      case "2":
        await exibirMenuLivro();
        break;
      case "0":
        continuar = false;
        break;
      default:
        console.log("\nOpção inválida.\n");
    }
  }
}

async function main(): Promise<void> {
  await testConnection();
  await menuPrincipal();
  fecharReadline();
  process.exit(0);
}

main();
