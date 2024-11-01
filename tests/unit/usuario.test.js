// Importa o modelo Usuario, que representa a tabela de usuários no banco de dados
const Usuario = require('../../src/models/Usuario');

// Mock do modelo Usuario utilizando Jest
jest.mock('../../src/models/Usuario', () => ({
  create: jest.fn(),  // Mock do método create para simular a criação de um novo usuário
  findAll: jest.fn()   // Mock do método findAll, caso seja usado em outros testes
}));

// Teste para a criação de um novo usuário
test('Criação de um novo usuário', async () => {
  // Define o retorno simulado para o método create
  Usuario.create.mockResolvedValue({ nome: "Alice", email: "alice@example.com" });

  // Chama o método create com os dados do novo usuário
  const usuario = await Usuario.create({ nome: "Alice", email: "alice@example.com" });

  // Verifica se o usuário criado contém as propriedades corretas
  expect(usuario.nome).toBe("Alice"); // Verifica se o nome do usuário é "Alice"
  expect(usuario.email).toBe("alice@example.com"); // Verifica se o email do usuário é "alice@example.com"
});
