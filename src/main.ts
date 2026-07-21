/*import * as readline from "readline";
import { MenuPrincipal } from "./menus/MenuPrincipal";
import { MenuGerencialAutores } from "./menus/MenuGerencialAutores";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menuAutores = new MenuGerencialAutores(rl);
const menu = new MenuPrincipal(rl);

async function iniciar() {
  let sair = false;
  while (!sair) {
    const opcao = await menu.mostrarMenuPrincipal();
    switch (opcao) {
      case "1":
        await menuAutores.Iniciar();
        break;
      case "2":
        console.log("Gerenciando Clientes...");
        break;
      case "3":
        console.log("Gerenciando Pedidos...");
        break;
      case "4":
        sair = true;
        break;
      default:
        console.log("Opção inválida.");
    }
  }

  rl.close();
}

iniciar();*/
