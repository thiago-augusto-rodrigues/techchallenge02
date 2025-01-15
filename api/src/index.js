const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const seedRoutes = require('./routes/seed');
const logger = require('./config/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seed', seedRoutes);

// Rota de verificação de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
