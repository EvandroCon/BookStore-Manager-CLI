import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { AutorRepository } from "../repositories/AutorRepository";

export class LivroService {
    constructor(
        private livroRepository: LivroRepository,
        private autorRepository: AutorRepository
    ) { }

    public async listar(): Promise<Livro[]> {
        return await this.livroRepository.listar();
    }

    public async buscarPorId(id: number): Promise<Livro> {
        const livro = await this.livroRepository.buscarPorId(id);

        if (livro === undefined) {
            throw new Error("Livro não encontrado.");
        }

        return livro;
    }

    public async cadastrar(
        titulo: string,
        autor_id: number,
        quantidade_estoque: number = 0
    ): Promise<Livro> {
        if (titulo.trim() === "") {
            throw new Error("O título do livro é obrigatório.");
        }

        if (titulo.trim().length > 150) {
            throw new Error("O título do livro deve ter no máximo 150 caracteres.");
        }

        if (!Number.isInteger(quantidade_estoque) || quantidade_estoque < 0) {
            throw new Error("A quantidade em estoque deve ser um número inteiro maior ou igual a zero.");
        }

        const autor = await this.autorRepository.buscarPorId(autor_id);

        if (autor === undefined) {
            throw new Error("Autor não encontrado.");
        }

        return await this.livroRepository.cadastrar(
            titulo.trim(),
            autor_id,
            quantidade_estoque
        );
    }

    public async atualizar(
        id: number,
        titulo: string,
        autor_id: number,
        quantidade_estoque: number
    ): Promise<Livro> {
        if (titulo.trim() === "") {
            throw new Error("O título do livro é obrigatório.");
        }

        if (titulo.trim().length > 150) {
            throw new Error("O título do livro deve ter no máximo 150 caracteres.");
        }

        if (!Number.isInteger(quantidade_estoque) || quantidade_estoque < 0) {
            throw new Error("A quantidade em estoque deve ser um número inteiro maior ou igual a zero.");
        }

        const autor = await this.autorRepository.buscarPorId(autor_id);

        if (autor === undefined) {
            throw new Error("Autor não encontrado.");
        }

        const livro = await this.livroRepository.atualizar(
            id,
            titulo.trim(),
            autor_id,
            quantidade_estoque
        );

        if (livro === undefined) {
            throw new Error("Livro não encontrado.");
        }

        return livro;
    }

    public async remover(id: number): Promise<void> {
        const livro = await this.livroRepository.buscarPorId(id);

        if (livro === undefined) {
            throw new Error("Livro não encontrado.");
        }

        await this.livroRepository.remover(id);
    }
}