// Importa o framework Express, que é utilizado para criar o servidor e gerenciar rotas
const express = require('express');
// Importa o módulo path, que ajuda a trabalhar com caminhos de arquivos
const path = require('path');
// Importa as rotas relacionadas a usuários definidas em outro arquivo
const usuarioRoutes = require('./routes/usuarios');
// Importa a conexão com o banco de dados definida em um arquivo separado
const sequelize = require('./database'); 
const Usuario = require('./models/Usuario'); // Importa o modelo Usuario

// Cria uma instância da aplicação Express
const app = express();

// Configuração do EJS como motor de template
app.set('view engine', 'ejs'); // Define o EJS como o motor de visualização
app.set('views', path.join(__dirname, 'views')); // Define o diretório onde estão os arquivos de visualização

// Middleware para processar dados JSON no corpo da requisição
app.use(express.json());

// Define a rota '/usuarios' para as rotas de usuário, utilizando o router importado
app.use('/usuarios', usuarioRoutes);

// Rota principal para servir o arquivo 'index.html' como página inicial da aplicação
app.get('/', (req, res) => {
  // Envia o arquivo 'index.html' como resposta quando a rota principal é acessada
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para servir a página 'usuarios.html' e buscar os usuários do banco de dados
app.get('/usuarios.html', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll(); // Busca todos os usuários
    res.render('usuarios', { usuarios }); // Renderiza a página com a lista de usuários
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao carregar a página de usuários');
  }
});

// Função assíncrona para iniciar o servidor
const startServer = async () => {
  try {
    // Sincroniza os modelos definidos com o banco de dados
    await sequelize.sync(); 
    const PORT = 3000; // Define a porta que o servidor irá escutar
    app.listen(PORT, () => {
      // Exibe uma mensagem no console informando que o servidor está rodando
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    // Exibe uma mensagem de erro no console caso ocorra um problema na sincronização
    console.error('Erro ao sincronizar com o banco de dados:', error);
  }
};

// Inicia o servidor apenas se este arquivo estiver sendo executado diretamente (não em modo de teste)
if (require.main === module) {
  startServer();
}

// Exporta a aplicação para que possa ser utilizada em outros arquivos, se necessário
module.exports = app;
