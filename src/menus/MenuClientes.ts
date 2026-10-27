
import * as readline from "readline/promises";
import { ClienteController } from "../controllers/ClienteController";

export class MenuClientes {
    constructor(
        private rl: readline.Interface,
        private clienteController: ClienteController
    ) {}

    public async exibir(): Promise<void> {
        let opcao: string = "";

        while (opcao !== "0") {
            console.log("\n===== Gerenciar Clientes =====");
            console.log("1. Cadastrar cliente");
            console.log("2. Listar clientes");
            console.log("3. Consultar cliente por ID");
            console.log("4. Atualizar cliente");
            console.log("5. Remover cliente");
            console.log("0. Voltar ao menu principal");

            opcao = await this.rl.question("Escolha uma opcao: ");

            switch (opcao) {
                case "1": {
                    const nome = await this.rl.question("Nome do cliente: ");
                    const email = await this.rl.question("Email do cliente: ");

                    await this.clienteController.cadastrar(nome, email);
                    break;
                }

                case "2": {
                    await this.clienteController.listar();
                    break;
                }

                case "3": {
                    const idTexto = await this.rl.question("ID do cliente: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    await this.clienteController.consultarPorId(id);
                    break;
                }

                case "4": {
                    const idTexto = await this.rl.question("ID do cliente: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    const nome = await this.rl.question("Novo nome do cliente: ");
                    const email = await this.rl.question("Novo email do cliente: ");

                    await this.clienteController.atualizar(id, nome, email);
                    break;
                }

                case "5": {
                    const idTexto = await this.rl.question("ID do cliente: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    await this.clienteController.remover(id);
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
