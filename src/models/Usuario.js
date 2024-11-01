// Importa DataTypes do Sequelize, que permite definir tipos de dados para as colunas do modelo
const { DataTypes } = require('sequelize'); 

// Importa a conexão com o banco de dados definida em um arquivo separado
const sequelize = require('../database'); 

// Define o modelo 'Usuario' utilizando o Sequelize
const Usuario = sequelize.define('Usuario', {
  // Definição da coluna 'nome'
  nome: {
    type: DataTypes.STRING, // Define o tipo da coluna 'nome' como STRING (texto)
    allowNull: false, // Especifica que esta coluna não pode ter valores nulos (obrigatório)
  },
  // Definição da coluna 'email'
  email: {
    type: DataTypes.STRING, // Define o tipo da coluna 'email' como STRING (texto)
    allowNull: false, // Especifica que esta coluna não pode ter valores nulos (obrigatório)
    unique: true, // Garante que cada valor de email na tabela seja único, evitando duplicatas
  },
});

// Exporta o modelo 'Usuario' para que possa ser utilizado em outras partes da aplicação
module.exports = Usuario;
