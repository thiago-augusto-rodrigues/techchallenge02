const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rotas públicas
router.get('/', postController.listPosts);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPostById);

// Rotas que futuramente terão autenticação
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Rota de seed (apenas desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  router.post('/seed', postController.seedPosts);
}

module.exports = router;

