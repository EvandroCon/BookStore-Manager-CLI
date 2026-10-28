import { ILivro } from "./ILivro";

export class Livro implements ILivro {
    public id: number;
    public titulo: string;
    public autor_id: number;
    public quantidade_estoque: number;

    constructor(
        id: number,
        titulo: string,
        autor_id: number,
        quantidade_estoque: number = 0
    ) {
        this.id = id;
        this.titulo = titulo;
        this.autor_id = autor_id;
        this.quantidade_estoque = quantidade_estoque;
    }
}
