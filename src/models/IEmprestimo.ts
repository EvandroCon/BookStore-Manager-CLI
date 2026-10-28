export interface IEmprestimo {
    id: number;
    livro_id: number;
    cliente_id: number;
    data_emprestimo: string;
    data_devolucao: string | null;
}
