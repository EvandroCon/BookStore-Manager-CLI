import { Autor } from "../models/Autor";

export class AutorRepository {
    private autores: Autor[] = [];
    private proximoId: number = 1;

    public async listar(): Promise<Autor[]> {
        return this.autores;
    }

    public async buscarPorId(id: number): Promise<Autor | undefined> {
        return this.autores.find(autor => autor.id === id);
    }

    public async cadastrar(nome: string): Promise<Autor> {
        const autor = new Autor(this.proximoId, nome);

        this.autores.push(autor);
        this.proximoId++;

        return autor;
    }
    
public async atualizar(id: number, nome: string): Promise<Autor | undefined> {
    const autor = this.autores.find(autor => autor.id === id);

    if (autor === undefined) {
        return undefined;
    }

    autor.nome = nome;

    return autor;
}

public async remover(id: number): Promise<boolean> {
    const indice = this.autores.findIndex(autor => autor.id === id);

    if (indice === -1) {
        return false;
    }

    this.autores.splice(indice, 1);

    return true;
}

}
