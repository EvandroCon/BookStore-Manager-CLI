export function exibirErro(erro: unknown): void {
    if (erro instanceof Error) {
        console.error(`Erro: ${erro.message}`);
    } else {
        console.error("Ocorreu um erro inesperado.");
    }
}