// Importa o framework Express, que é utilizado para criar o servidor e gerenciar rotas
const express = require('express');
// Importa o módulo path, que ajuda a trabalhar com caminhos de arquivos
const path = require('path');
// Importa as rotas relacionadas a usuários definidas em outro arquivo
const usuarioRoutes = require('./routes/usuarios');
// Importa a conexão com o banco de dados definida em um arquivo separado
const sequelize = require('./database'); 

// Cria uma instância da aplicação Express
const app = express();

// Middleware para processar dados JSON no corpo da requisição
app.use(express.json());

// Define a rota '/usuarios' para as rotas de usuário, utilizando o router importado
app.use('/usuarios', usuarioRoutes);

// Rota principal para servir o arquivo 'index.html' como página inicial da aplicação
app.get('/', (req, res) => {
  // Envia o arquivo 'index.html' como resposta quando a rota principal é acessada
  res.sendFile(path.join(__dirname, 'index.html'));
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
