import { MenuPrincipal } from "./menus/MenuPrincipal";

async function main(): Promise<void> {
    const menu = new MenuPrincipal();
    await menu.exibir();
}

main().catch((erro: unknown) => {
    console.error("Erro ao iniciar a aplicacao:", erro);
});
