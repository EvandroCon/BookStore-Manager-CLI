import { EmprestimoService } from "../services/EmprestimoService";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class EmprestimoController {
    constructor(
        private emprestimoService: EmprestimoService,
        private livroRepository: LivroRepository,
        private clienteRepository: ClienteRepository
    ) {}

    public async listar(): Promise<void> {
        try {
            const emprestimos = await this.emprestimoService.listar();

            console.log("\n===== Lista de Empréstimos =====");

            if (emprestimos.length === 0) {
                console.log("Nenhum empréstimo cadastrado.");
                return;
            }

            for (const emprestimo of emprestimos) {
                const livro = await this.livroRepository.buscarPorId(
                    emprestimo.livro_id
                );

                const cliente = await this.clienteRepository.buscarPorId(
                    emprestimo.cliente_id
                );

                console.log(`\nID: ${emprestimo.id}`);
                console.log(`Livro: ${livro?.titulo ?? "Livro não encontrado"}`);
                console.log(`Cliente: ${cliente?.nome ?? "Cliente não encontrado"}`);
                console.log(`Data do empréstimo: ${emprestimo.data_emprestimo}`);
                console.log(
                    `Data da devolução: ${
                        emprestimo.data_devolucao ?? "Ainda não devolvido"
                    }`
                );
            }
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async consultarPorId(id: number): Promise<void> {
        try {
            const emprestimo =
                await this.emprestimoService.buscarPorId(id);

            const livro = await this.livroRepository.buscarPorId(
                emprestimo.livro_id
            );

            const cliente = await this.clienteRepository.buscarPorId(
                emprestimo.cliente_id
            );

            console.log("\n===== Empréstimo Encontrado =====");
            console.log(`ID: ${emprestimo.id}`);
            console.log(`Livro: ${livro?.titulo ?? "Livro não encontrado"}`);
            console.log(`Cliente: ${cliente?.nome ?? "Cliente não encontrado"}`);
            console.log(`Data do empréstimo: ${emprestimo.data_emprestimo}`);
            console.log(
                `Data da devolução: ${
                    emprestimo.data_devolucao ?? "Ainda não devolvido"
                }`
            );
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async cadastrar(
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.cadastrar(
                livro_id,
                cliente_id,
                data_emprestimo
            );

            console.log("Empréstimo registrado com sucesso!");
            console.log(`ID do empréstimo: ${emprestimo.id}`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async atualizar(
        id: number,
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string
    ): Promise<void> {
        try {
            await this.emprestimoService.atualizar(
                id,
                livro_id,
                cliente_id,
                data_emprestimo
            );

            console.log("Empréstimo atualizado com sucesso!");
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async registrarDevolucao(
        id: number,
        data_devolucao: string
    ): Promise<void> {
        try {
            await this.emprestimoService.registrarDevolucao(
                id,
                data_devolucao
            );

            console.log("Devolução registrada com sucesso!");
            console.log("A quantidade em estoque do livro foi atualizada.");
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async remover(id: number): Promise<void> {
        try {
            await this.emprestimoService.remover(id);

            console.log("Empréstimo removido com sucesso!");
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    private exibirErro(erro: unknown): void {
        if (erro instanceof Error) {
            console.error(`Erro: ${erro.message}`);
        } else {
            console.error("Ocorreu um erro inesperado.");
        }
    }
}
