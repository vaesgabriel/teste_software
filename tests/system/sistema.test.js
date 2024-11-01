// Importa o módulo puppeteer para realizar testes automatizados com o navegador
const puppeteer = require('puppeteer');
// Importa a aplicação Express que será testada
const app = require('../../src/app');
// Importa o modelo Usuario, que representa a tabela de usuários no banco de dados
const Usuario = require('../../src/models/Usuario');

// Mock do modelo Usuario utilizando Jest
jest.mock('../../src/models/Usuario', () => ({
  create: jest.fn()  // Mock do método create para simular a criação de usuário
}));

let server; // Variável para armazenar a instância do servidor

// Inicia o servidor antes de todos os testes
beforeAll(() => {
  server = app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});

// Fecha o servidor após todos os testes
afterAll(() => {
  server.close(); // Fecha a instância do servidor
});

// Teste para simular a criação de um usuário no navegador
test('Simulação de criação de usuário no navegador', async () => {
  // Define o retorno simulado para a criação de um usuário
  Usuario.create.mockResolvedValue({ nome: "Alice", email: "alice@example.com" });

  // Inicializa o navegador e abre uma nova página
  const navegador = await puppeteer.launch();
  const pagina = await navegador.newPage();

  // Acessa a aplicação na URL local
  await pagina.goto('http://localhost:3000');

  // Preenche os campos de nome e email no formulário
  await pagina.type('#nome', 'Alice'); // Digita 'Alice' no campo de nome
  await pagina.type('#email', 'alice@example.com'); // Digita 'alice@example.com' no campo de email

  // Clica no botão de submit para enviar o formulário
  await pagina.click('button[type="submit"]');

  // Espera que o novo usuário apareça na lista
  await pagina.waitForSelector('#usuariosLista li');

  // Obtém o texto do primeiro item da lista para verificar a criação
  const usuarioTexto = await pagina.$eval('#usuariosLista li', el => el.textContent);

  // Verifica se o texto do usuário contém os dados esperados
  expect(usuarioTexto).toContain('Alice'); // Verifica se 'Alice' está no texto
  expect(usuarioTexto).toContain('alice@example.com'); // Verifica se o email está no texto

  // Fecha o navegador ao final do teste
  await navegador.close();
});
