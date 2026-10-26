import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import { AutorRepository } from "../repositories/AutorRepository";
import { AutorService } from "../services/AutorService";
import { AutorController } from "../controllers/AutorController";
import { MenuAutores } from "./MenuAutores";

export class MenuPrincipal {
    private rl = readline.createInterface({
        input: input,
        output: output
    });

    private autorRepository = new AutorRepository();
    private autorService = new AutorService(this.autorRepository);
    private autorController = new AutorController(this.autorService);
    private menuAutores = new MenuAutores(this.rl, this.autorController);

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
                    await this.menuAutores.exibir();
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
