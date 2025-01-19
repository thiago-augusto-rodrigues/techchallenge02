const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./config/logger');

const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => {
    logger.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  });

