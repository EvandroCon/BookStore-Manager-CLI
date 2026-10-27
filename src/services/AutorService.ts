
import { Autor } from "../models/Autor";
import { AutorRepository } from "../repositories/AutorRepository";

export class AutorService {
    constructor(
        private autorRepository: AutorRepository
    ) { }

    public async listar(): Promise<Autor[]> {
        return await this.autorRepository.listar();
    }

    public async buscarPorId(id: number): Promise<Autor> {
        const autor = await this.autorRepository.buscarPorId(id);

        if (autor === undefined) {
            throw new Error("Autor não encontrado.");
        }

        return autor;
    }

    public async cadastrar(nome: string): Promise<Autor> {
        if (nome.trim() === "") {
            throw new Error("O nome do autor é obrigatório.");
        }

        return await this.autorRepository.cadastrar(nome.trim());
    }

    public async atualizar(id: number, nome: string): Promise<Autor> {
        if (nome.trim() === "") {
            throw new Error("O nome do autor é obrigatório.");
        }

        const autor = await this.autorRepository.atualizar(id, nome.trim());

        if (autor === undefined) {
            throw new Error("Autor não encontrado.");
        }

        return autor;
    }


    public async remover(id: number): Promise<void> {
        const removido = await this.autorRepository.remover(id);

        if (!removido) {
            throw new Error("Autor não encontrado.");
        }
    }

}
