import { exibirErro } from "../utils/exibirErro";
import { ClienteService } from "../services/ClienteService";

export class ClienteController {
    constructor(private clienteService: ClienteService) { }

    public async listar(): Promise<void> {
        try {
            const clientes = await this.clienteService.listar();

            console.log("\n===== Lista de Clientes =====");

            if (clientes.length === 0) {
                console.log("Nenhum cliente cadastrado.");
                return;
            }

            for (const cliente of clientes) {
                console.log(
                    `ID: ${cliente.id} | Nome: ${cliente.nome} | Email: ${cliente.email}`
                );
            }
        } catch (erro: unknown) {
            exibirErro(erro);
        }
    }

    public async consultarPorId(id: number): Promise<void> {
        try {
            const cliente = await this.clienteService.buscarPorId(id);

            if (cliente === undefined) {
                console.log("Cliente não encontrado.");
                return;
            }

            console.log("\n===== Cliente Encontrado =====");
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`Email: ${cliente.email}`);
        } catch (erro: unknown) {
            exibirErro(erro);
        }
    }

    public async cadastrar(nome: string, email: string): Promise<void> {
        try {
            const cliente = await this.clienteService.cadastrar(
                nome,
                email
            );

            console.log(
                `Cliente "${cliente.nome}" cadastrado com sucesso!`
            );
            console.log(`ID do cliente: ${cliente.id}`);
        } catch (erro: unknown) {
            exibirErro(erro);
        }
    }

    public async atualizar(id: number, nome: string, email: string): Promise<void> {
        try {
            const cliente = await this.clienteService.atualizar(
                id,
                nome,
                email
            );

            if (cliente === undefined) {
                console.log("Cliente não encontrado.");
                return;
            }

            console.log("Cliente atualizado com sucesso!");
        } catch (erro: unknown) {
            exibirErro(erro);
        }
    }

    public async remover(id: number): Promise<void> {
        try {
            const removido = await this.clienteService.remover(id);

            if (!removido) {
                console.log("Cliente não encontrado.");
                return;
            }

            console.log("Cliente removido com sucesso!");
        } catch (erro: unknown) {
            exibirErro(erro);
        }
    }
}
