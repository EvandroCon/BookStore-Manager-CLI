

-- BookStore Manager CLI


-- 1. DDL(Data Definition Language) - Criação das tabelas

CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor_id INTEGER NOT NULL REFERENCES autores(id)
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    livro_id INTEGER NOT NULL REFERENCES livros(id),
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    data_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    data_devolucao DATE,
    CHECK (
        data_devolucao IS NULL
        OR data_devolucao >= data_emprestimo
    )
);


-- 2. DML(Data Manipulation Language) - Manipulação de dados

INSERT INTO autores (nome)
VALUES
    ('Machado de Assis'),
    ('J. K. Rowling'),
    ('George Orwell'),
	('Paulo Coelho');

INSERT INTO clientes (nome, email)
VALUES
    ('Evandro Conceição', 'evandroc@email.com'),
    ('Maria Santos', 'maria@email.com'),
    ('Pedro Souza', 'pedro@email.com'),
	('Raul Silva', 'raul@email.com');

INSERT INTO livros (titulo, autor_id)
VALUES
    ('Dom Casmurro', 1),
    ('Harry Potter e a Pedra Filosofal', 2),
    ('1984', 3),
	('O Alquimista', 4),
	('Memórias Póstumas de Brás Cubas', 1),
	('A Revolução dos Bichos', 3);

--ano/mes/dia
INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo, data_devolucao)
VALUES
    (1, 1, '2026-05-01', '2026-06-01'),
    (2, 2, '2026-10-05', NULL),
    (3, 3, '2026-10-10', NULL),
	(4, 1, '2026-07-08', '2026-07-08'),
	(6, 4, '2025-05-10', '2025-06-10'),
	(1, 3, '2026-10-02', NULL);


SELECT * FROM autores;

SELECT * FROM clientes;

SELECT * FROM livros;

SELECT * FROM emprestimos;


UPDATE clientes
SET email = 'evandro.c@email.com'
WHERE id = 1;


SELECT * FROM livros
ORDER BY titulo
LIMIT 3;


--DELETE FROM clientes
--WHERE id = 3;


-- 3. Consultas - Relatórios

-- Relatorio 1: livros disponiveis
SELECT livros.id,
       livros.titulo,
       autores.nome AS autor
FROM livros
INNER JOIN autores
    ON livros.autor_id = autores.id
WHERE NOT EXISTS (
    SELECT 1
    FROM emprestimos
    WHERE emprestimos.livro_id = livros.id
      AND emprestimos.data_devolucao IS NULL
)
ORDER BY livros.titulo;


-- Relatorio 2: livros emprestados
SELECT livros.id,
       livros.titulo,
       clientes.nome AS cliente,
       emprestimos.data_emprestimo
FROM emprestimos
INNER JOIN livros
    ON emprestimos.livro_id = livros.id
INNER JOIN clientes
    ON emprestimos.cliente_id = clientes.id
WHERE emprestimos.data_devolucao IS NULL
ORDER BY livros.titulo;


-- Relatorio 3: livros cadastrados por autor
SELECT autores.nome AS autor,
    COUNT(livros.id) AS quantidade_livros
FROM autores
LEFT JOIN livros
    ON livros.autor_id = autores.id
GROUP BY autores.id, autores.nome
ORDER BY autores.nome;


-- Relatorio 4: quantidade de emprestimos por livro
SELECT livros.titulo AS livro,
    COUNT(emprestimos.id) AS quantidade_emprestimos
FROM livros
LEFT JOIN emprestimos
    ON emprestimos.livro_id = livros.id
GROUP BY livros.id, livros.titulo
ORDER BY quantidade_emprestimos DESC, livros.titulo;


-- Relatorio 5: clientes com emprestimos ativos
SELECT clientes.nome AS cliente,
   	   clientes.email,
       livros.titulo AS livro,
       emprestimos.data_emprestimo
FROM emprestimos
INNER JOIN clientes
    ON emprestimos.cliente_id = clientes.id
INNER JOIN livros
    ON emprestimos.livro_id = livros.id
WHERE emprestimos.data_devolucao IS NULL
ORDER BY clientes.nome;