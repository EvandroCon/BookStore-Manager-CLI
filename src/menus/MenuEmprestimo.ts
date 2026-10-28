import * as readline from "node:readline/promises";
import { EmprestimoController } from "../controllers/EmprestimoController";

export class MenuEmprestimos {
    constructor(
        private rl: readline.Interface,
        private emprestimoController: EmprestimoController
    ) {}

    public async exibir(): Promise<void> {
        let opcao = "";

        while (opcao !== "0") {
            console.log("\n===== Menu de Empréstimos =====");
            console.log("1. Cadastrar empréstimo");
            console.log("2. Listar empréstimos");
            console.log("3. Consultar empréstimo por ID");
            console.log("4. Atualizar empréstimo");
            console.log("5. Registrar devolução");
            console.log("6. Remover empréstimo");
            console.log("0. Voltar ao menu principal");

            opcao = (await this.rl.question("Escolha uma opção: ")).trim();

            switch (opcao) {
                case "1":
                    await this.cadastrar();
                    break;

                case "2":
                    await this.emprestimoController.listar();
                    break;

                case "3":
                    await this.consultarPorId();
                    break;

                case "4":
                    await this.atualizar();
                    break;

                case "5":
                    await this.registrarDevolucao();
                    break;

                case "6":
                    await this.remover();
                    break;

                case "0":
                    console.log("Voltando ao menu principal...");
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    private async cadastrar(): Promise<void> {
        console.log("\n===== Cadastrar Empréstimo =====");

        const livroIdTexto = await this.rl.question("ID do livro: ");
        const clienteIdTexto = await this.rl.question("ID do cliente: ");
        const dataEmprestimo = (
            await this.rl.question("Data do empréstimo (AAAA-MM-DD): ")
        ).trim();

        const livro_id = Number(livroIdTexto);
        const cliente_id = Number(clienteIdTexto);

        if (
            !Number.isInteger(livro_id) ||
            livro_id <= 0 ||
            !Number.isInteger(cliente_id) ||
            cliente_id <= 0
        ) {
            console.log("Os IDs devem ser números inteiros positivos.");
            return;
        }

        await this.emprestimoController.cadastrar(
            livro_id,
            cliente_id,
            dataEmprestimo
        );
    }

    private async consultarPorId(): Promise<void> {
        const idTexto = await this.rl.question(
            "ID do empréstimo que deseja consultar: "
        );

        const id = Number(idTexto);

        if (!Number.isInteger(id) || id <= 0) {
            console.log("O ID deve ser um número inteiro positivo.");
            return;
        }

        await this.emprestimoController.consultarPorId(id);
    }

    private async atualizar(): Promise<void> {
        console.log("\n===== Atualizar Empréstimo =====");

        const idTexto = await this.rl.question(
            "ID do empréstimo que deseja atualizar: "
        );
        const livroIdTexto = await this.rl.question("Novo ID do livro: ");
        const clienteIdTexto = await this.rl.question("Novo ID do cliente: ");
        const dataEmprestimo = (
            await this.rl.question("Nova data do empréstimo (AAAA-MM-DD): ")
        ).trim();

        const id = Number(idTexto);
        const livro_id = Number(livroIdTexto);
        const cliente_id = Number(clienteIdTexto);

        if (
            !Number.isInteger(id) ||
            id <= 0 ||
            !Number.isInteger(livro_id) ||
            livro_id <= 0 ||
            !Number.isInteger(cliente_id) ||
            cliente_id <= 0
        ) {
            console.log("Todos os IDs devem ser números inteiros positivos.");
            return;
        }

        await this.emprestimoController.atualizar(
            id,
            livro_id,
            cliente_id,
            dataEmprestimo
        );
    }

    private async registrarDevolucao(): Promise<void> {
        console.log("\n===== Registrar Devolução =====");

        const idTexto = await this.rl.question("ID do empréstimo: ");
        const dataDevolucao = (
            await this.rl.question("Data da devolução (AAAA-MM-DD): ")
        ).trim();

        const id = Number(idTexto);

        if (!Number.isInteger(id) || id <= 0) {
            console.log("O ID deve ser um número inteiro positivo.");
            return;
        }

        await this.emprestimoController.registrarDevolucao(
            id,
            dataDevolucao
        );
    }

    private async remover(): Promise<void> {
        const idTexto = await this.rl.question(
            "ID do empréstimo que deseja remover: "
        );

        const id = Number(idTexto);

        if (!Number.isInteger(id) || id <= 0) {
            console.log("O ID deve ser um número inteiro positivo.");
            return;
        }

        const confirmacao = (
            await this.rl.question(
                `Deseja realmente remover o empréstimo ${id}? (s/n): `
            )
        ).trim().toLowerCase();

        if (confirmacao !== "s") {
            console.log("Remoção cancelada.");
            return;
        }

        await this.emprestimoController.remover(id);
    }
}
