import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {
    private emprestimos: Emprestimo[] = [];
    private proximoId: number = 1;

    public async listar(): Promise<Emprestimo[]> {
        return this.emprestimos;
    }

    public async buscarPorId(id: number): Promise<Emprestimo | undefined> {
        return this.emprestimos.find(
            emprestimo => emprestimo.id === id
        );
    }

    public async cadastrar(
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string,
        data_devolucao: string | null = null
    ): Promise<Emprestimo> {
        const emprestimo = new Emprestimo(
            this.proximoId,
            livro_id,
            cliente_id,
            data_emprestimo,
            data_devolucao
        );

        this.emprestimos.push(emprestimo);
        this.proximoId++;

        return emprestimo;
    }

    public async atualizar(
        id: number,
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string,
        data_devolucao: string | null
    ): Promise<Emprestimo | undefined> {
        const emprestimo = this.emprestimos.find(
            emprestimo => emprestimo.id === id
        );

        if (emprestimo === undefined) {
            return undefined;
        }

        emprestimo.livro_id = livro_id;
        emprestimo.cliente_id = cliente_id;
        emprestimo.data_emprestimo = data_emprestimo;
        emprestimo.data_devolucao = data_devolucao;

        return emprestimo;
    }

    public async remover(id: number): Promise<boolean> {
        const indice = this.emprestimos.findIndex(
            emprestimo => emprestimo.id === id
        );

        if (indice === -1) {
            return false;
        }

        this.emprestimos.splice(indice, 1);

        return true;
    }
}
