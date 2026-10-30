import { AutorRepository } from "./repositories/AutorRepository";
import { LivroRepository } from "./repositories/LivroRepository";
import { ClienteRepository } from "./repositories/ClienteRepository";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository";
import { carregarDadosIniciais } from "./data/seed";
import { MenuPrincipal } from "./menus/MenuPrincipal";

async function main(): Promise<void> {
    const autorRepository = new AutorRepository();
    const livroRepository = new LivroRepository();
    const clienteRepository = new ClienteRepository();
    const emprestimoRepository = new EmprestimoRepository();

    await carregarDadosIniciais(
        autorRepository,
        livroRepository,
        clienteRepository,
        emprestimoRepository
    );

    const menu = new MenuPrincipal(
        autorRepository,
        livroRepository,
        clienteRepository,
        emprestimoRepository
    );

    await menu.exibir();
}

main().catch((erro: unknown) => {
    console.error("Erro ao iniciar a aplicacao:", erro);
});