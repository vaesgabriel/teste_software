// Importa a classe Sequelize do pacote sequelize, que é utilizada para gerenciar a conexão com o banco de dados
const { Sequelize } = require('sequelize');

// Cria uma nova instância do Sequelize, configurando a conexão com o banco de dados
const sequelize = new Sequelize({
  dialect: 'postgres', // Define o dialeto do banco de dados como PostgreSQL
  host: 'localhost', // Endereço do servidor de banco de dados
  port: 5432, // Porta padrão do PostgreSQL
  database: 'meu_projeto', // Nome do banco de dados ao qual a aplicação irá se conectar
  username: 'postgres', // Nome de usuário para autenticação no banco de dados
  password: 'postgres', // Senha para autenticação no banco de dados
});

// Exporta a instância do Sequelize para que possa ser utilizada em outros arquivos da aplicação
module.exports = sequelize; 
