import { LivroService } from "../services/LivroService";

export class LivroController {
    constructor(private livroService: LivroService) { }

    public async listar(): Promise<void> {
        try {
            const livros = await this.livroService.listar();

            console.log("\n===== Lista de Livros =====");

            if (livros.length === 0) {
                console.log("Nenhum livro cadastrado.");
                return;
            }

            for (const livro of livros) {
                console.log(
                    `ID: ${livro.id} | Título: ${livro.titulo} | Autor ID: ${livro.autor_id} | Estoque: ${livro.quantidade_estoque}`
                );
            }
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async consultarPorId(id: number): Promise<void> {
        try {
            const livro = await this.livroService.buscarPorId(id);

            console.log("\n===== Livro Encontrado =====");
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Autor ID: ${livro.autor_id}`);
            console.log(`Estoque: ${livro.quantidade_estoque}`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async cadastrar(
        titulo: string,
        autor_id: number,
        quantidade_estoque: number
    ): Promise<void> {
        try {
            const livro = await this.livroService.cadastrar(
                titulo,
                autor_id,
                quantidade_estoque
            );

            console.log(`Livro "${livro.titulo}" cadastrado com sucesso!`);
            console.log(`ID do livro: ${livro.id}`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async atualizar(
        id: number,
        titulo: string,
        autor_id: number,
        quantidade_estoque: number
    ): Promise<void> {
        try {
            const livro = await this.livroService.atualizar(
                id,
                titulo,
                autor_id,
                quantidade_estoque
            );

            console.log(`Livro "${livro.titulo}" atualizado com sucesso!`);
        } catch (erro: unknown) {
            this.exibirErro(erro);
        }
    }

    public async remover(id: number): Promise<void> {
        try {
            await this.livroService.remover(id);

            console.log("Livro removido com sucesso!");
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