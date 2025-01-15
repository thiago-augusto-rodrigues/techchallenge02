const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
    minlength: [3, 'Título deve ter no mínimo 3 caracteres'],
    maxlength: [100, 'Título deve ter no máximo 100 caracteres']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    minlength: [10, 'Conteúdo deve ter no mínimo 10 caracteres']
  },
  author: {
    type: String,
    required: [true, 'Autor é obrigatório'],
    trim: true,
    minlength: [2, 'Nome do autor deve ter no mínimo 2 caracteres'],
    maxlength: [50, 'Nome do autor deve ter no máximo 50 caracteres']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Índices para melhorar performance das buscas
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);
