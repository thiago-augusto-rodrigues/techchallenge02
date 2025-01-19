// src/config/swagger.config.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog dos Professores API',
      version: '1.0.0',
      description: 'API para gerenciamento de conteúdo educacional',
      contact: {
        name: 'Suporte',
        email: 'joandeitos@outlook.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID do post'
            },
            title: {
              type: 'string',
              description: 'Título do post'
            },
            content: {
              type: 'string',
              description: 'Conteúdo do post'
            },
            author: {
              type: 'string',
              description: 'ID do autor'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização'
            }
          }
        },
        PostResponse: {
          type: 'object',
          properties: {
            posts: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Post'
              }
            },
            currentPage: {
              type: 'integer'
            },
            totalPages: {
              type: 'integer'
            },
            totalPosts: {
              type: 'integer'
            }
          }
        }
      }
      // securitySchemes: {
      //   bearerAuth: {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT'
      //   }
      // }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsDoc(options);