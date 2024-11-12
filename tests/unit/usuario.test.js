// Importa o modelo de dados "Usuario" da aplicação
const Usuario = require('../../src/models/Usuario');

// Usa o Jest para simular as funções do modelo Usuario
jest.mock('../../src/models/Usuario', () => ({
  create: jest.fn(),    // Simula a função de criação de usuário
  findAll: jest.fn(),    // Simula a função de busca de todos os usuários (não utilizada neste exemplo)
}));

// Limpa as simulações antes de cada teste para evitar interferências
beforeEach(() => {
  Usuario.create.mockClear();  // Limpa o histórico de chamadas da função create
});

// Teste para criação de um novo usuário com dados válidos
test('Criação de um novo usuário', async () => {
  console.log('Iniciando teste: Criação de usuário com dados válidos.');

  // Define o valor que a função mockada `create` deve retornar quando chamada
  Usuario.create.mockResolvedValue({ nome: "Alice", email: "alice@example.com" });

  // Executa a criação do usuário e armazena o resultado
  const usuario = await Usuario.create({ nome: "Alice", email: "alice@example.com" });

  // Verifica se os dados retornados são os esperados
  expect(usuario.nome).toBe("Alice");
  expect(usuario.email).toBe("alice@example.com");

  // Verifica se a função `create` foi chamada com os dados corretos
  expect(Usuario.create).toHaveBeenCalledWith({ nome: "Alice", email: "alice@example.com" });
  console.log('Usuário criado com sucesso.');
});

// Teste para criação de usuário com erro
test('Tentativa de criação de um usuário com erro', async () => {
  console.log('Iniciando teste: Criação de usuário com erro.');

  // Define o comportamento da função `create` para simular um erro
  Usuario.create.mockRejectedValue(new Error('Erro ao criar usuário'));

  // Verifica se a função `create` lança um erro ao tentar criar o usuário
  await expect(Usuario.create({ nome: "Alice", email: "alice@example.com" })).rejects.toThrow('Erro ao criar usuário');
  console.log('Erro ao criar usuário verificado com sucesso.');
});
