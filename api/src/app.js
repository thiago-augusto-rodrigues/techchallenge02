const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger.config');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const seedRoutes = require('./routes/seed');
const logger = require('./config/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seed', seedRoutes);

// Rota de verificação de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Redirecionar rota raiz para documentação
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Redirecionar rotas não encontradas para documentação
app.use('*', (req, res) => {
  res.redirect('/api-docs');
});

module.exports = app;

