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

import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { EmprestimoService } from "../services/EmprestimoService";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { MenuEmprestimos } from "./MenuEmprestimo";

export class MenuPrincipal {
    private rl = readline.createInterface({
        input: input,
        output: output
    });

    private menuAutores: MenuAutores;
    private menuLivro: MenuLivro;
    private menuClientes: MenuClientes;
    private menuEmprestimos: MenuEmprestimos;

    constructor(
        autorRepository: AutorRepository,
        livroRepository: LivroRepository,
        clienteRepository: ClienteRepository,
        emprestimoRepository: EmprestimoRepository
    ) {
        const autorService = new AutorService(autorRepository);
        const autorController = new AutorController(autorService);
        this.menuAutores = new MenuAutores(this.rl, autorController);

        const livroService = new LivroService(
            livroRepository,
            autorRepository
        );
        const livroController = new LivroController(livroService);
        this.menuLivro = new MenuLivro(this.rl, livroController);

        const clienteService = new ClienteService(clienteRepository);
        const clienteController = new ClienteController(clienteService);
        this.menuClientes = new MenuClientes(this.rl, clienteController);

        const emprestimoService = new EmprestimoService(
            emprestimoRepository,
            livroRepository,
            clienteRepository
        );
        const emprestimoController = new EmprestimoController(
            emprestimoService,
            livroRepository,
            clienteRepository
        );
        this.menuEmprestimos = new MenuEmprestimos(
            this.rl,
            emprestimoController
        );
    }

    public async exibir(): Promise<void> {
        let opcao: string = "";

        while (opcao !== "0") {
            console.log("\n===== BookStore Manager CLI =====");
            console.log("1. Gerenciar autores");
            console.log("2. Gerenciar livros");
            console.log("3. Gerenciar clientes");
            console.log("4. Gerenciar empréstimos");
            console.log("0. Sair");

            opcao = (
                await this.rl.question("Escolha uma opção: ")
            ).trim();

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
                    await this.menuEmprestimos.exibir();
                    break;

                case "0":
                    console.log("Encerrando o sistema...");
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }

        this.rl.close();
    }
}