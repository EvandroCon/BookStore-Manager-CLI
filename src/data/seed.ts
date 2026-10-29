import { AutorRepository } from "../repositories/AutorRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClienteRepository } from "../repositories/ClienteRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";

export async function carregarDadosIniciais(
    autorRepository: AutorRepository,
    livroRepository: LivroRepository,
    clienteRepository: ClienteRepository,
    emprestimoRepository: EmprestimoRepository
): Promise<void> {
    // Autores (ids 1 a 4)
    await autorRepository.cadastrar("Machado de Assis");
    await autorRepository.cadastrar("J. K. Rowling");
    await autorRepository.cadastrar("George Orwell");
    await autorRepository.cadastrar("Paulo Coelho");

    // Clientes (ids 1 a 5)
    await clienteRepository.cadastrar("Evandro Conceição", "evandroc@email.com");
    await clienteRepository.cadastrar("Maria Santos", "maria@email.com");
    await clienteRepository.cadastrar("Pedro Souza", "pedro@email.com");
    await clienteRepository.cadastrar("Raul Silva", "raul@email.com");
    await clienteRepository.cadastrar("Cliente Teste", "teste@email.com");

    // Livros (ids 1 a 6): titulo, autor_id, quantidade_estoque
    await livroRepository.cadastrar("Dom Casmurro", 1, 2);
    await livroRepository.cadastrar("Harry Potter e a Pedra Filosofal", 2, 1);
    await livroRepository.cadastrar("1984", 3, 2);
    await livroRepository.cadastrar("O Alquimista", 4, 1);
    await livroRepository.cadastrar("Memórias Póstumas de Brás Cubas", 1, 1);
    await livroRepository.cadastrar("A Revolução dos Bichos", 3, 1);

    // Empréstimos: livro_id, cliente_id, data_emprestimo, data_devolucao
    await emprestimoRepository.cadastrar(1, 1, "2026-05-01", "2026-06-01");
    await emprestimoRepository.cadastrar(2, 2, "2026-10-05", null);
    await emprestimoRepository.cadastrar(3, 3, "2026-10-10", null);
    await emprestimoRepository.cadastrar(4, 1, "2026-07-08", "2026-07-08");
    await emprestimoRepository.cadastrar(6, 4, "2025-05-10", "2025-06-10");
    await emprestimoRepository.cadastrar(1, 3, "2026-10-02", null);
}