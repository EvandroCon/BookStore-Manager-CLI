
import { AutorService } from "../services/AutorService";

export class AutorController {
    constructor(
        private autorService: AutorService
    ) {}

    public async listar(): Promise<void> {
        try {
            const autores = await this.autorService.listar();

            if (autores.length === 0) {
                console.log("Nenhum autor cadastrado.");
                return;
            }

            console.log("\n===== Lista de Autores =====");

            for (const autor of autores) {
                console.log(`ID: ${autor.id} | Nome: ${autor.nome}`);
            }
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async consultarPorId(id: number): Promise<void> {
        try {
            const autor = await this.autorService.buscarPorId(id);

            console.log("\n===== Autor Encontrado =====");
            console.log(`ID: ${autor.id}`);
            console.log(`Nome: ${autor.nome}`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async cadastrar(nome: string): Promise<void> {
        try {
            const autor = await this.autorService.cadastrar(nome);

            console.log(`Autor "${autor.nome}" cadastrado com sucesso.`);
            console.log(`ID do autor: ${autor.id}`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async atualizar(id: number, nome: string): Promise<void> {
        try {
            const autor = await this.autorService.atualizar(id, nome);

            console.log(`Autor atualizado com sucesso: ${autor.nome}`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async remover(id: number): Promise<void> {
        try {
            await this.autorService.remover(id);

            console.log(`Autor com ID ${id} removido com sucesso.`);
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
