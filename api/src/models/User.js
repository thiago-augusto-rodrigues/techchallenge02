const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - discipline
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-gerado do usuário
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         discipline:
 *           type: string
 *           description: Disciplina lecionada pelo professor
 *         role:
 *           type: string
 *           enum: [professor, admin]
 *           description: Função do usuário no sistema
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do usuário
 *       example:
 *         name: Maria Silva
 *         email: maria@escola.edu
 *         discipline: Matemática
 *         role: professor
 */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
    minlength: [2, 'Nome deve ter no mínimo 2 caracteres'],
    maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, use um email válido']
  },
  role: {
    type: String,
    enum: ['professor', 'admin'],
    default: 'professor'
  },
  discipline: {
    type: String,
    required: [true, 'Disciplina é obrigatória'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);