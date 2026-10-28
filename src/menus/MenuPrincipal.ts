
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

import { AutorRepository } from "../repositories/AutorRepository";
import { AutorService } from "../services/AutorService";
import { AutorController } from "../controllers/AutorController";
import { MenuAutores } from "./MenuAutores";

import { LivroRepository } from "../repositories/LivroRepository";
import { LivroService } from "../services/LivroService";
import { LivroController } from "../controllers/LivroController";
import { MenuLivro } from "./MenuLivro";

import { ClienteRepository } from "../repositories/ClienteRepository";
import { ClienteService } from "../services/ClienteService";
import { ClienteController } from "../controllers/ClienteController";
import { MenuClientes } from "./MenuClientes";

export class MenuPrincipal {
    private rl = readline.createInterface({
        input: input,
        output: output
    });

    private autorRepository = new AutorRepository();
    private autorService = new AutorService(this.autorRepository);
    private autorController = new AutorController(this.autorService);
    private menuAutores = new MenuAutores(this.rl, this.autorController);

    private livroRepository = new LivroRepository();
    private livroService = new LivroService(
        this.livroRepository,
        this.autorRepository
    );
    private livroController = new LivroController(this.livroService);
    private menuLivro = new MenuLivro(this.rl, this.livroController);

    private clienteRepository = new ClienteRepository();
    private clienteService = new ClienteService(this.clienteRepository);
    private clienteController = new ClienteController(this.clienteService);
    private menuClientes = new MenuClientes(this.rl, this.clienteController);

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
                    await this.menuLivro.exibir();
                    break;

                case "3":
                    await this.menuClientes.exibir();
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
