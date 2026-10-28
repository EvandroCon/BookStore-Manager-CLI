import { IEmprestimo } from "./IEmprestimo";

export class Emprestimo implements IEmprestimo {
    public id: number;
    public livro_id: number;
    public cliente_id: number;
    public data_emprestimo: string;
    public data_devolucao: string | null;

    constructor(
        id: number,
        livro_id: number,
        cliente_id: number,
        data_emprestimo: string,
        data_devolucao: string | null = null
    ) {
        this.id = id;
        this.livro_id = livro_id;
        this.cliente_id = cliente_id;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
    }
}
