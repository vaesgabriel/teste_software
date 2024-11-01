// Importa o framework Express, que é usado para criar o servidor e definir rotas
const express = require('express');
// Importa o modelo Usuario, que representa a tabela de usuários no banco de dados
const Usuario = require('../models/Usuario'); 
// Cria uma instância do roteador do Express
const router = express.Router();

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
  try {
    // Extrai os campos 'nome' e 'email' do corpo da requisição
    const { nome, email } = req.body;

    // Verifica se ambos os campos estão preenchidos
    if (!nome || !email) {
      // Retorna uma resposta de erro com status 400 (Requisição Inválida) se os campos não estiverem preenchidos
      return res.status(400).json({ error: "Nome e email são obrigatórios." });
    }

    // Cria um novo usuário no sistema utilizando o modelo Usuario
    const usuario = await Usuario.create({ nome, email });

    // Retorna o usuário criado com status 201 (Criado)
    return res.status(201).json(usuario);
  } catch (error) {
    // Retorna uma resposta de erro com status 400 (Requisição Inválida) caso ocorra algum erro
    return res.status(400).json({ error: error.message });
  }
});

// Rota para listar todos os usuários cadastrados
router.get('/', async (req, res) => {
  try {
    // Busca todos os usuários cadastrados no banco de dados
    const usuarios = await Usuario.findAll();

    // Retorna a lista de usuários com status 200 (Sucesso)
    return res.status(200).json(usuarios);
  } catch (error) {
    // Retorna uma resposta de erro com status 500 (Erro Interno do Servidor) caso ocorra um erro
    return res.status(500).json({ error: error.message });
  }
});

// Exporta o router para que possa ser utilizado em outras partes da aplicação
module.exports = router; 
