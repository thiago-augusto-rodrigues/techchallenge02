const User = require('../models/User');
const logger = require('../config/logger');

const userController = {
  // Listar usuários
  async listUsers(req, res) {
    try {
      const users = await User.find().sort('name');
      logger.info(`Listados ${users.length} usuários`);
      res.json(users);
    } catch (error) {
      logger.error('Erro ao listar usuários:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Obter usuário por ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      logger.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Criar usuário
  async createUser(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      logger.info(`Novo usuário criado: ${user.name}`);
      res.status(201).json(user);
    } catch (error) {
      logger.error('Erro ao criar usuário:', error);
      res.status(400).json({ message: error.message });
    }
  },

  // Atualizar usuário
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      logger.info(`Usuário atualizado: ${user.name}`);
      res.json(user);
    } catch (error) {
      logger.error('Erro ao atualizar usuário:', error);
      res.status(400).json({ message: error.message });
    }
  },

  // Deletar usuário
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      logger.info(`Usuário deletado: ${user.name}`);
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      logger.error('Erro ao deletar usuário:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;

