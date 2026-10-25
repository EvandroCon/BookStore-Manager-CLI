
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

export class MenuPrincipal {
    private rl = readline.createInterface({
        input: input,
        output: output
    });

    public async exibir(): Promise<void> {
        let opcao: string = "";

        while (opcao !== "0") {
            console.log("\n===== BookStore Manager CLI =====");
            console.log("1. Gerenciar autores");
            console.log("2. Gerenciar livros");
            console.log("3. Gerenciar clientes");
            console.log("4. Gerenciar emprestimos");
            console.log("0. Sair");

            opcao = await this.rl.question("Escolha uma opcao: ");

            switch (opcao) {
                case "1":
                    console.log("Menu de autores sera implementado.");
                    break;
                case "2":
                    console.log("Menu de livros sera implementado.");
                    break;
                case "3":
                    console.log("Menu de clientes sera implementado.");
                    break;
                case "4":
                    console.log("Menu de emprestimos sera implementado.");
                    break;
                case "0":
                    console.log("Encerrando o sistema...");
                    break;
                default:
                    console.log("Opcao invalida. Tente novamente.");
            }
        }

        this.rl.close();
    }
}
