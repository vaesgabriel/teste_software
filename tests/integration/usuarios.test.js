// Importa o módulo supertest para realizar requisições HTTP durante os testes
const request = require('supertest');
// Importa a aplicação Express que será testada
const app = require('../../src/app');
// Importa o modelo Usuario, que representa a tabela de usuários no banco de dados
const Usuario = require('../../src/models/Usuario');

// Mock do modelo Usuario utilizando Jest
jest.mock('../../src/models/Usuario', () => ({
  create: jest.fn(),  // Mock do método create para simular a criação de usuário
  findAll: jest.fn()   // Mock do método findAll para simular a listagem de usuários
}));

// Define um bloco de testes para a API de usuários
describe('Usuários API', () => {
  // Limpa os mocks antes de cada teste para garantir que os testes sejam independentes
  beforeEach(() => {
    Usuario.create.mockClear(); // Limpa o mock do método create
    Usuario.findAll.mockClear(); // Limpa o mock do método findAll
  });

  // Teste para a criação de um usuário através da rota POST /usuarios
  test('Criação de usuário - POST /usuarios', async () => {
    // Define o valor simulado de retorno para a criação de usuário
    Usuario.create.mockResolvedValue({ nome: "Alice", email: "alice@example.com" });

    // Faz a requisição POST para criar um novo usuário com nome e email
    const resposta = await request(app).post('/usuarios').send({ nome: "Alice", email: "alice@example.com" });

    // Verifica se a resposta tem status 201 (Criado)
    expect(resposta.status).toBe(201);

    // Verifica se o nome do usuário na resposta é o esperado
    expect(resposta.body.nome).toBe("Alice");
  });

  // Teste para a listagem de usuários através da rota GET /usuarios
  test('Listagem de usuários - GET /usuarios', async () => {
    // Define a resposta simulada para a listagem de usuários
    Usuario.findAll.mockResolvedValue([
      { nome: "Alice", email: "alice@example.com" },
      { nome: "Bob", email: "bob@example.com" }
    ]);

    // Faz a requisição GET para listar os usuários
    const resposta = await request(app).get('/usuarios');

    // Verifica se a resposta tem status 200 (Sucesso)
    expect(resposta.status).toBe(200);

    // Verifica se o número de usuários retornados é o esperado
    expect(resposta.body.length).toBe(2);

    // Verifica o nome do primeiro usuário retornado
    expect(resposta.body[0].nome).toBe("Alice");
  });
});
