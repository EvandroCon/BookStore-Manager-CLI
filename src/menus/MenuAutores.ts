import * as readline from "readline/promises";
import { AutorController } from "../controllers/AutorController";

export class MenuAutores {
    constructor(
        private rl: readline.Interface,
        private autorController: AutorController
    ) {}

    public async exibir(): Promise<void> {
        let opcao: string = "";

        while (opcao !== "0") {
            console.log("\n===== Gerenciar Autores =====");
            console.log("1. Cadastrar autor");
            console.log("2. Listar autores");
            console.log("3. Consultar autor por ID");
            console.log("4. Atualizar autor");
            console.log("5. Remover autor");
            console.log("0. Voltar ao menu principal");

            opcao = await this.rl.question("Escolha uma opcao: ");

            switch (opcao) {
                case "1": {
                    const nome = await this.rl.question("Nome do autor: ");
                    await this.autorController.cadastrar(nome);
                    break;
                }

                case "2": {
                    await this.autorController.listar();
                    break;
                }

                case "3": {
                    const idTexto = await this.rl.question("ID do autor: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    await this.autorController.consultarPorId(id);
                    break;
                }

                case "4": {
                    const idTexto = await this.rl.question("ID do autor: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    const nome = await this.rl.question("Novo nome do autor: ");
                    await this.autorController.atualizar(id, nome);
                    break;
                }

                case "5": {
                    const idTexto = await this.rl.question("ID do autor: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    await this.autorController.remover(id);
                    break;
                }

                case "0":
                    console.log("Voltando ao menu principal...");
                    break;

                default:
                    console.log("Opcao invalida. Tente novamente.");
            }
        }

    }
}