/*import * as readline from "readline";

export class MenuGerencialAutores {
  constructor(private rl: readline.Interface) {}

  public async Iniciar() {
    let sair = false;

    while (!sair) {
      const opcao = await this.MostrarAutores();

      console.log("Recebido:", opcao);

      switch (opcao) {
        case "1":
          console.log("Gerenciando Livros...");
          break;
        case "2":
          console.log("Gerenciando Livros...");
          break;
        case "3":
          console.log("Gerenciando Clientes...");
          break;
        case "4":
          console.log("Gerenciando Pedidos...");
          break;
        case "5":
          console.log("Gerenciando Relatórios...");
          break;
        case "6":
          sair = true;
          break;
      }
    }
  }

  private MostrarAutores(): Promise<string> {
    //console.clear();

    console.log("===== BOOKSTORE MANAGER =====");
    console.log("1. Cadastrar Autor");
    console.log("2. Listar Autores");
    console.log("3. Consultar Autor");
    console.log("4. Atualizar Autores");
    console.log("5. Remover Autor");
    console.log("6. Encerrar...");

    return new Promise((resolve) => {
      this.rl.question("\Escolha uma opção: ", (opcao) => {
        resolve(opcao);
      });
    });
  }
} */
