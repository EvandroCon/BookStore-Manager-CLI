//imports
import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository";
import { carregarDadosIniciais } from "./data/seed";
import { MenuPrincipal } from "./menus/MenuPrincipal";

//a função
async function main(): Promise<void> {
    //criação dos repositories
    const autorRepository = new AutorRepository();
    const livroRepository = new LivroRepository();
    const clienteRepository = new ClienteRepository();
    const emprestimoRepository = new EmprestimoRepository();

    //carga do seed
    await carregarDadosIniciais(
        autorRepository,
        livroRepository,
        clienteRepository,
        emprestimoRepository
    );

    //criação do menu
    const menu = new MenuPrincipal(
        autorRepository,
        livroRepository,
        clienteRepository,
        emprestimoRepository
    );

    //iniciar o menu
    await menu.exibir();
}

//chamada e tratamento de erro
main().catch((erro: unknown) => {
    console.error("Erro ao iniciar a aplicacao:", erro);
});