
import { ClienteRepository } from "../repositories/ClienteRepository";
import { Cliente } from "../models/Cliente";

export class ClienteService {
    constructor(private clienteRepository: ClienteRepository) {}

    public async listar(): Promise<Cliente[]> {
        return await this.clienteRepository.listar();
    }

    public async buscarPorId(id: number): Promise<Cliente | undefined> {
        return await this.clienteRepository.buscarPorId(id);
    }

    public async cadastrar(
        nome: string,
        email: string
    ): Promise<Cliente> {
        if (nome.trim() === "") {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (email.trim() === "") {
            throw new Error("O email do cliente é obrigatório.");
        }

        return await this.clienteRepository.cadastrar(
            nome.trim(),
            email.trim().toLowerCase()
        );
    }

    public async atualizar(
        id: number,
        nome: string,
        email: string
    ): Promise<Cliente | undefined> {
        if (nome.trim() === "") {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (email.trim() === "") {
            throw new Error("O email do cliente é obrigatório.");
        }

        return await this.clienteRepository.atualizar(
            id,
            nome.trim(),
            email.trim().toLowerCase()
        );
    }

    public async remover(id: number): Promise<boolean> {
        return await this.clienteRepository.remover(id);
    }
}
