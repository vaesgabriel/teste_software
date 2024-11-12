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
      return res.status(400).json({ error: "Nome e email são obrigatórios." });
    }

    // Cria um novo usuário no sistema utilizando o modelo Usuario
    const usuario = await Usuario.create({ nome, email });

    // Retorna o usuário criado com status 201 (Criado)
    return res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error); // Log do erro
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Rota para listar todos os usuários cadastrados
router.get('/', async (req, res) => {
  try {
    // Busca todos os usuários na tabela
    const usuarios = await Usuario.findAll();
    // Retorna a lista de usuários com status 200 (OK)
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error); // Log do erro
    return res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um usuário pelo ID
router.delete('/:id', async (req, res) => {
  try {
    // Obtém o ID do usuário a partir dos parâmetros da requisição
    const id = req.params.id;
    // Busca o usuário pelo ID
    const usuario = await Usuario.findByPk(id);

    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Exclui o usuário do sistema
    await usuario.destroy();
    // Retorna uma mensagem de sucesso com status 200 (OK)
    return res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error); // Log do erro
    return res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um usuário pelo ID
router.put('/:id', async (req, res) => {
  try {
    // Obtém o ID do usuário a partir dos parâmetros da requisição
    const id = req.params.id;
    // Extrai os campos 'nome' e 'email' do corpo da requisição
    const { nome, email } = req.body;

    // Verifica se ambos os campos estão preenchidos
    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }

    // Busca o usuário pelo ID
    const usuario = await Usuario.findByPk(id);
    // Verifica se o usuário existe
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza os campos 'nome' e 'email' do usuário
    usuario.nome = nome;
    usuario.email = email;

    // Salva as alterações no banco de dados
    await usuario.save();

    // Retorna o usuário atualizado com status 200 (OK)
    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error); // Log do erro
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// Rota de teste para verificar se o método PUT está funcionando
router.put('/teste', (req, res) => {
  // Retorna uma mensagem de sucesso com status 200 (OK)
  res.status(200).send('PUT funcionando');
});

// Exporta o router para que possa ser utilizado em outras partes da aplicação
module.exports = router;
