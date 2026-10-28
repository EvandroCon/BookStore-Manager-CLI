import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";

export class EmprestimoService {
    constructor(
        private emprestimoRepository: EmprestimoRepository,
        private livroRepository: LivroRepository,
        private clienteRepository: ClienteRepository
    ) {}

    public async listar(): Promise<Emprestimo[]> {
        return await this.emprestimoRepository.listar();
    }

    public async buscarPorId(id: number): Promise<Emprestimo> {
        const emprestimo =
            await this.emprestimoRepository.buscarPorId(id);

        if (emprestimo === undefined) {
            throw new Error("Empréstimo não encontrado.");
        }

        return emprestimo;
    }

    public async cadastrar(
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string
    ): Promise<Emprestimo> {
        const livro = await this.livroRepository.buscarPorId(livro_id);

        if (livro === undefined) {
            throw new Error("Livro não encontrado.");
        }

        const cliente =
            await this.clienteRepository.buscarPorId(cliente_id);

        if (cliente === undefined) {
            throw new Error("Cliente não encontrado.");
        }

        if (livro.quantidade_estoque <= 0) {
            throw new Error("Não há unidades disponíveis deste livro.");
        }

        if (!this.dataValida(data_emprestimo)) {
            throw new Error("Data do empréstimo inválida.");
        }

        const emprestimo =
            await this.emprestimoRepository.cadastrar(
                livro_id,
                cliente_id,
                data_emprestimo
            );

        livro.quantidade_estoque--;

        return emprestimo;
    }

    public async registrarDevolucao(
        id: number,
        data_devolucao: string
    ): Promise<Emprestimo> {
        const emprestimo = await this.buscarPorId(id);

        if (emprestimo.data_devolucao !== null) {
            throw new Error("Este empréstimo já foi devolvido.");
        }

        if (!this.dataValida(data_devolucao)) {
            throw new Error("Data de devolução inválida.");
        }

        if (data_devolucao < emprestimo.data_emprestimo) {
            throw new Error(
                "A data de devolução não pode ser anterior à data do empréstimo."
            );
        }

        const livro = await this.livroRepository.buscarPorId(
            emprestimo.livro_id
        );

        if (livro === undefined) {
            throw new Error("Livro associado ao empréstimo não encontrado.");
        }

        const atualizado =
            await this.emprestimoRepository.atualizar(
                emprestimo.id,
                emprestimo.livro_id,
                emprestimo.cliente_id,
                emprestimo.data_emprestimo,
                data_devolucao
            );

        if (atualizado === undefined) {
            throw new Error("Não foi possível registrar a devolução.");
        }

        livro.quantidade_estoque++;

        return atualizado;
    }

    public async atualizar(
        id: number,
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string
    ): Promise<Emprestimo> {
        const emprestimo = await this.buscarPorId(id);

        if (emprestimo.data_devolucao !== null) {
            throw new Error(
                "Não é possível atualizar um empréstimo já devolvido."
            );
        }

        const livroAntigo = await this.livroRepository.buscarPorId(
            emprestimo.livro_id
        );

        if (livroAntigo === undefined) {
            throw new Error("Livro original não encontrado.");
        }

        const livroNovo = await this.livroRepository.buscarPorId(livro_id);

        if (livroNovo === undefined) {
            throw new Error("Novo livro não encontrado.");
        }

        const cliente = await this.clienteRepository.buscarPorId(
            cliente_id
        );

        if (cliente === undefined) {
            throw new Error("Cliente não encontrado.");
        }

        if (!this.dataValida(data_emprestimo)) {
            throw new Error("Data do empréstimo inválida.");
        }

        if (data_emprestimo > this.dataAtual()) {
            throw new Error(
                "A data do empréstimo não pode estar no futuro."
            );
        }

        if (livroNovo.id !== livroAntigo.id &&
            livroNovo.quantidade_estoque <= 0) {
            throw new Error("Não há unidades disponíveis do novo livro.");
        }

        const atualizado = await this.emprestimoRepository.atualizar(
            id,
            livro_id,
            cliente_id,
            data_emprestimo,
            null
        );

        if (atualizado === undefined) {
            throw new Error("Não foi possível atualizar o empréstimo.");
        }

        if (livroNovo.id !== livroAntigo.id) {
            livroAntigo.quantidade_estoque++;
            livroNovo.quantidade_estoque--;
        }

        return atualizado;
    }

    public async remover(id: number): Promise<void> {
        const emprestimo = await this.buscarPorId(id);

        if (emprestimo.data_devolucao === null) {
            const livro = await this.livroRepository.buscarPorId(
                emprestimo.livro_id
            );

            if (livro === undefined) {
                throw new Error("Livro associado ao empréstimo não encontrado.");
            }

            livro.quantidade_estoque++;
        }

        const removido = await this.emprestimoRepository.remover(id);

        if (!removido) {
            throw new Error("Não foi possível remover o empréstimo.");
        }
    }

    private dataValida(data: string): boolean {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
            return false;
        }

        const [ano, mes, dia] = data.split("-").map(Number);

        if (ano < 100 || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
            return false;
        }

        const dataObjeto = new Date(ano, mes - 1, dia);

        return (
            dataObjeto.getFullYear() === ano &&
            dataObjeto.getMonth() === mes - 1 &&
            dataObjeto.getDate() === dia
        );
    }

    private dataAtual(): string {
        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, "0");
        const dia = String(agora.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }
}
