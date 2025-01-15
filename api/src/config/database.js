const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('MongoDB conectado com sucesso');
  } catch (error) {
    logger.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
