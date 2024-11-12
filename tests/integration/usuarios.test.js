// Importa o módulo supertest para fazer requisições HTTP durante os testes
const request = require('supertest');

// Importa a aplicação Express que será testada
const app = require('../../src/app');

// Importa o modelo Usuario, que representa a tabela de usuários no banco de dados
const Usuario = require('../../src/models/Usuario');

// Configura mocks do modelo Usuario usando Jest, substituindo métodos reais pelos mocks
jest.mock('../../src/models/Usuario', () => ({
  create: jest.fn(),  // Mock do método create para simular a criação de usuários
  findAll: jest.fn(), // Mock do método findAll para simular a listagem de usuários
}));

// Define o conjunto de testes para a API de usuários
describe('Usuários API', () => {
  // Limpa os mocks antes de cada teste para garantir que os testes sejam independentes
  beforeEach(() => {
    Usuario.create.mockClear(); // Limpa o mock do método create
    Usuario.findAll.mockClear(); // Limpa o mock do método findAll
  });

  // Teste para verificar a criação de um novo usuário pela rota POST /usuarios
  test('Criação de usuário - POST /usuarios', async () => {
    console.log('Iniciando teste: Criação de usuário');

    // Define o valor de retorno simulado para a criação de usuário
    Usuario.create.mockResolvedValue({ nome: "Alice", email: "alice@example.com" });

    // Faz a requisição POST para criar um novo usuário com nome e email
    const resposta = await request(app)
      .post('/usuarios')
      .send({ nome: "Alice", email: "alice@example.com" });

    // Verifica se o status da resposta é 201 (Criado)
    expect(resposta.status).toBe(201);

    // Verifica se o cabeçalho da resposta indica que o conteúdo está em formato JSON
    expect(resposta.headers['content-type']).toMatch(/json/);

    // Verifica se o nome do usuário retornado na resposta é o esperado
    expect(resposta.body.nome).toBe("Alice");

    console.log('Usuário criado com sucesso.');
  });

  // Teste para verificar a listagem de usuários pela rota GET /usuarios
  test('Listagem de usuários - GET /usuarios', async () => {
    console.log('Iniciando teste: Listagem de usuários');

    // Define o valor simulado de retorno para a listagem de usuários
    Usuario.findAll.mockResolvedValue([
      { nome: "Alice", email: "alice@example.com" },
      { nome: "Bob", email: "bob@example.com" }
    ]);

    // Faz a requisição GET para listar os usuários
    const resposta = await request(app).get('/usuarios');

    // Verifica se o status da resposta é 200 (Sucesso)
    expect(resposta.status).toBe(200);

    // Verifica se o cabeçalho da resposta indica que o conteúdo está em formato JSON
    expect(resposta.headers['content-type']).toMatch(/json/);

    // Verifica se o número de usuários retornados na resposta é o esperado
    expect(resposta.body.length).toBe(2);

    // Verifica se o primeiro usuário na resposta tem o nome "Alice"
    expect(resposta.body[0].nome).toBe("Alice");

    console.log('Listagem de usuários verificada com sucesso.');
  });

  // Teste para verificar a tentativa de criação de um usuário sem dados obrigatórios
  test('Tentativa de criar usuário sem dados - POST /usuarios', async () => {
    console.log('Iniciando teste: Criação de usuário com dados faltantes');

    // Faz a requisição POST com dados vazios para simular uma criação inválida
    const resposta = await request(app)
      .post('/usuarios')
      .send({}); // Envia um corpo vazio na requisição

    // Verifica se o status da resposta é 400 (Bad Request), indicando que a criação falhou
    expect(resposta.status).toBe(400);

    console.log('Validação de dados obrigatórios confirmada.');
  });
});
