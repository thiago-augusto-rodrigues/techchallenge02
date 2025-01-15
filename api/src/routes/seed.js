const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const logger = require('../config/logger');

// Dados iniciais para usuários
const initialUsers = [
  {
    name: "Maria Silva",
    email: "maria.silva@escola.edu",
    discipline: "Matemática",
    role: "professor"
  },
  {
    name: "João Santos",
    email: "joao.santos@escola.edu",
    discipline: "História",
    role: "professor"
  },
  {
    name: "Ana Oliveira",
    email: "ana.oliveira@escola.edu",
    discipline: "Língua Portuguesa",
    role: "professor"
  },
  {
    name: "Carlos Mendes",
    email: "carlos.mendes@escola.edu",
    discipline: "Ciências",
    role: "professor"
  },
  {
    name: "Patricia Lima",
    email: "patricia.lima@escola.edu",
    discipline: "Geografia",
    role: "professor"
  }
];

// Função para criar posts com base nos usuários criados
const createInitialPosts = (users) => {
  return [
    {
      title: "Equações do Segundo Grau",
      content: "Nesta aula, vamos explorar as equações do segundo grau e sua aplicação na resolução de problemas práticos. Aprenderemos a fórmula de Bhaskara e como utilizá-la para encontrar as raízes de equações quadráticas. Veremos também exemplos do cotidiano onde estas equações são aplicadas.",
      author: users[0]._id // Maria Silva - Matemática
    },
    {
      title: "Revolução Industrial",
      content: "Uma análise detalhada sobre as transformações sociais, econômicas e tecnológicas que ocorreram durante a Revolução Industrial. Vamos estudar as principais invenções, as mudanças nas relações de trabalho e o impacto na sociedade moderna.",
      author: users[1]._id // João Santos - História
    },
    {
      title: "Análise Sintática",
      content: "Vamos aprender sobre os elementos fundamentais da análise sintática: sujeito, predicado, objetos direto e indireto. Exploraremos diferentes tipos de orações e sua estrutura gramatical.",
      author: users[2]._id // Ana Oliveira - Português
    },
    {
      title: "Sistema Solar",
      content: "Estudo sobre os planetas do sistema solar, suas características principais e movimentos. Abordaremos também os fenômenos astronômicos mais comuns e sua influência em nosso cotidiano.",
      author: users[3]._id // Carlos Mendes - Ciências
    },
    {
      title: "Climatologia",
      content: "Exploração dos diferentes tipos de clima no Brasil e suas características. Análise dos fatores que influenciam o clima e como eles afetam a vida em diferentes regiões.",
      author: users[4]._id // Patricia Lima - Geografia
    },
    {
      title: "Frações e Decimais",
      content: "Aprenda a trabalhar com frações e números decimais. Vamos ver operações básicas, comparações e conversões entre diferentes representações numéricas.",
      author: users[0]._id // Maria Silva - Matemática
    },
    {
      title: "Brasil Colônia",
      content: "Estudo sobre o período colonial brasileiro, desde o descobrimento até a independência. Análise dos ciclos econômicos e da formação da sociedade brasileira.",
      author: users[1]._id // João Santos - História
    },
    {
      title: "Literatura Modernista",
      content: "Análise das principais obras e autores do modernismo brasileiro. Vamos estudar as características do movimento e sua influência na cultura nacional.",
      author: users[2]._id // Ana Oliveira - Português
    },
    {
      title: "Reações Químicas",
      content: "Introdução às reações químicas básicas e suas aplicações no dia a dia. Vamos aprender sobre os diferentes tipos de reações e como identificá-las.",
      author: users[3]._id // Carlos Mendes - Ciências
    },
    {
      title: "Geopolítica Mundial",
      content: "Estudo das relações entre países e blocos econômicos. Análise dos principais conflitos e acordos internacionais da atualidade.",
      author: users[4]._id // Patricia Lima - Geografia
    },
    {
      title: "Geometria Espacial",
      content: "Explorando formas geométricas tridimensionais, cálculo de volume e área superficial. Aplicações práticas da geometria espacial.",
      author: users[0]._id // Maria Silva - Matemática
    },
    {
      title: "Segunda Guerra Mundial",
      content: "Análise aprofundada dos eventos que levaram à Segunda Guerra Mundial, seus principais acontecimentos e consequências para o mundo contemporâneo.",
      author: users[1]._id // João Santos - História
    }
  ];
};

// Rota para seed
router.post('/', async (req, res) => {
  try {
    // Limpa os dados existentes
    await User.deleteMany({});
    await Post.deleteMany({});

    // Cria os usuários
    const users = await User.insertMany(initialUsers);
    logger.info(`${users.length} usuários inseridos`);

    // Cria os posts
    const posts = await Post.insertMany(createInitialPosts(users));
    logger.info(`${posts.length} posts inseridos`);

    res.json({
      message: 'Dados iniciais inseridos com sucesso',
      users,
      posts
    });
  } catch (error) {
    logger.error('Erro ao inserir dados iniciais:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
