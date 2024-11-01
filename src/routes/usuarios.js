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
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error); // Log do erro
    return res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um usuário pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await usuario.destroy();
    return res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error); // Log do erro
    return res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um usuário pelo ID
router.put('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const { nome, email } = req.body;

      if (!nome || !email) {
          return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
      }

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      usuario.nome = nome;
      usuario.email = email;

      await usuario.save();

      return res.status(200).json(usuario);
  } catch (error) {
      console.error('Erro ao atualizar usuário:', error); // Log do erro
      return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

router.put('/teste', (req, res) => {
  res.status(200).send('PUT funcionando');
});



// Exporta o router para que possa ser utilizado em outras partes da aplicação
module.exports = router;
