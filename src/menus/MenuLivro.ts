import * as readline from "readline/promises";
import { LivroController } from "../controllers/LivroController";

export class MenuLivro {
    constructor(
        private rl: readline.Interface,
        private livroController: LivroController
    ) { }

    public async exibir(): Promise<void> {
        let opcao: string = "";

        while (opcao !== "0") {
            console.log("\n===== Gerenciar Livros =====");
            console.log("1. Cadastrar livro");
            console.log("2. Listar livros");
            console.log("3. Consultar livro por ID");
            console.log("4. Atualizar livro");
            console.log("5. Remover livro");
            console.log("0. Voltar ao menu principal");

            opcao = await this.rl.question("Escolha uma opcao: ");

            switch (opcao) {
                case "1": {
                    const titulo = await this.rl.question("Titulo do livro: ");
                    const autorTexto = await this.rl.question("ID do autor: ");
                    const quantidadeTexto = await this.rl.question("Quantidade em estoque (0 se nao houver): ");

                    const autor_id = Number(autorTexto);
                    const quantidade = Number(quantidadeTexto);

                    if (!Number.isInteger(autor_id) || autor_id <= 0) {
                        console.log("ID do autor invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    if (
                        quantidadeTexto.trim() === "" ||
                        !Number.isInteger(quantidade) ||
                        quantidade < 0
                    ) {
                        console.log("Estoque invalido. Digite um inteiro maior ou igual a zero.");
                        break;
                    }

                    await this.livroController.cadastrar(
                        titulo,
                        autor_id,
                        quantidade
                    );
                    break;
                }

                case "2": {
                    await this.livroController.listar();
                    break;
                }

                case "3": {
                    const idTexto = await this.rl.question("ID do livro: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    await this.livroController.consultarPorId(id);
                    break;
                }

                case "4": {
                    const idTexto = await this.rl.question("ID do livro: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    const titulo = await this.rl.question("Novo titulo do livro: ");
                    const autorTexto = await this.rl.question("Novo ID do autor: ");
                    const quantidadeTexto = await this.rl.question(
                        "Nova quantidade em estoque: "
                    );

                    const autor_id = Number(autorTexto);
                    const quantidade = Number(quantidadeTexto);

                    if (!Number.isInteger(autor_id) || autor_id <= 0) {
                        console.log("ID do autor invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    if (
                        quantidadeTexto.trim() === "" ||
                        !Number.isInteger(quantidade) ||
                        quantidade < 0
                    ) {
                        console.log("Estoque invalido. Digite um inteiro maior ou igual a zero.");
                        break;
                    }

                    await this.livroController.atualizar(
                        id,
                        titulo,
                        autor_id,
                        quantidade
                    );
                    break;
                }

                case "5": {
                    const idTexto = await this.rl.question("ID do livro: ");
                    const id = Number(idTexto);

                    if (!Number.isInteger(id) || id <= 0) {
                        console.log("ID invalido. Digite um numero inteiro positivo.");
                        break;
                    }

                    await this.livroController.remover(id);
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