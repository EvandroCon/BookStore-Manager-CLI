import { Livro } from "../models/Livro";

export class LivroRepository {
    private livros: Livro[] = [];
    private proximoId: number = 1;

    public async listar(): Promise<Livro[]> {
        return this.livros;
    }

    public async buscarPorId(id: number): Promise<Livro | undefined> {
        return this.livros.find(livro => livro.id === id);
    }

    public async cadastrar(
        titulo: string,
        autor_id: number,
        quantidade_estoque: number = 0
    ): Promise<Livro> {
        const livro = new Livro(
            this.proximoId,
            titulo,
            autor_id,
            quantidade_estoque
        );

        this.livros.push(livro);
        this.proximoId++;

        return livro;
    }

    public async atualizar(
        id: number,
        titulo: string,
        autor_id: number,
        quantidade_estoque: number
    ): Promise<Livro | undefined> {
        const livro = this.livros.find(livro => livro.id === id);

        if (livro === undefined) {
            return undefined;
        }

        livro.titulo = titulo;
        livro.autor_id = autor_id;
        livro.quantidade_estoque = quantidade_estoque;

        return livro;
    }

    public async remover(id: number): Promise<boolean> {
        const indice = this.livros.findIndex(livro => livro.id === id);

        if (indice === -1) {
            return false;
        }

        this.livros.splice(indice, 1);

        return true;
    }
}