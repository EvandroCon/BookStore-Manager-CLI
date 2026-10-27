
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    private clientes: Cliente[] = [];
    private proximoId: number = 1;

    public async listar(): Promise<Cliente[]> {
        return this.clientes;
    }

    public async buscarPorId(id: number): Promise<Cliente | undefined> {
        return this.clientes.find(cliente => cliente.id === id);
    }

    public async cadastrar(
        nome: string,
        email: string
    ): Promise<Cliente> {
        const emailNormalizado = email.trim().toLowerCase();

        const clienteExistente = this.clientes.find(
            cliente => cliente.email.trim().toLowerCase() === emailNormalizado
        );

        if (clienteExistente !== undefined) {
            throw new Error("Já existe um cliente cadastrado com este e-mail.");
        }

        const cliente = new Cliente(
            this.proximoId,
            nome.trim(),
            emailNormalizado
        );

        this.clientes.push(cliente);
        this.proximoId++;

        return cliente;
    }

    public async atualizar(
        id: number,
        nome: string,
        email: string
    ): Promise<Cliente | undefined> {
        const cliente = this.clientes.find(cliente => cliente.id === id);

        if (cliente === undefined) {
            return undefined;
        }

        const emailNormalizado = email.trim().toLowerCase();

        const emailDuplicado = this.clientes.find(
            outroCliente =>
                outroCliente.email.trim().toLowerCase() === emailNormalizado &&
                outroCliente.id !== id
        );

        if (emailDuplicado !== undefined) {
            throw new Error("Já existe outro cliente cadastrado com este e-mail.");
        }

        cliente.nome = nome.trim();
        cliente.email = emailNormalizado;

        return cliente;
    }

    public async remover(id: number): Promise<boolean> {
        const indice = this.clientes.findIndex(
            cliente => cliente.id === id
        );

        if (indice === -1) {
            return false;
        }

        this.clientes.splice(indice, 1);

        return true;
    }
}
