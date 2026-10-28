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

    private autorRepository = new AutorRepository();
    private autorService = new AutorService(this.autorRepository);
    private autorController = new AutorController(this.autorService);
    private menuAutores = new MenuAutores(
        this.rl,
        this.autorController
    );

    private livroRepository = new LivroRepository();
    private livroService = new LivroService(
        this.livroRepository,
        this.autorRepository
    );
    private livroController = new LivroController(this.livroService);
    private menuLivro = new MenuLivro(
        this.rl,
        this.livroController
    );

    private clienteRepository = new ClienteRepository();
    private clienteService = new ClienteService(this.clienteRepository);
    private clienteController = new ClienteController(this.clienteService);
    private menuClientes = new MenuClientes(
        this.rl,
        this.clienteController
    );

    private emprestimoRepository = new EmprestimoRepository();
    private emprestimoService = new EmprestimoService(
        this.emprestimoRepository,
        this.livroRepository,
        this.clienteRepository
    );
    private emprestimoController = new EmprestimoController(
        this.emprestimoService,
        this.livroRepository,
        this.clienteRepository
    );
    private menuEmprestimos = new MenuEmprestimos(
        this.rl,
        this.emprestimoController
    );

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
