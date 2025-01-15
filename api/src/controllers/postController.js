const Post = require("../models/Post");
const logger = require("../config/logger");

// Funções auxiliares
const formatErrorResponse = (error) => {
  return {
    message: error.message || "Erro interno do servidor",
    details: process.env.NODE_ENV === "development" ? error.stack : undefined,
  };
};

// Controller com todos os métodos relacionados a posts
const postController = {
  // Lista todos os posts com paginação opcional
  async listPosts(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
      };

      const posts = await Post.find()
        .skip((options.page - 1) * options.limit)
        .limit(options.limit)
        .sort(options.sort);

      const total = await Post.countDocuments();

      logger.info(`Listados ${posts.length} posts de ${total} total`);
      res.json({
        posts,
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalPosts: total,
      });
    } catch (error) {
      logger.error("Erro ao listar posts:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },

  // Busca post por ID
  async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        logger.warn(`Post não encontrado com ID: ${req.params.id}`);
        return res.status(404).json({ message: "Post não encontrado" });
      }
      logger.info(`Post recuperado: ${post.title}`);
      res.json(post);
    } catch (error) {
      logger.error("Erro ao buscar post por ID:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },

  // Cria novo post
  async createPost(req, res) {
    try {
      const { title, content, author } = req.body;

      // Validação dos campos obrigatórios
      if (!title || !content || !author) {
        return res.status(400).json({
          message: "Campos obrigatórios: título, conteúdo e autor",
        });
      }

      const post = new Post({ title, content, author });
      await post.save();

      logger.info(`Novo post criado: ${post.title}`);
      res.status(201).json(post);
    } catch (error) {
      logger.error("Erro ao criar post:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },

  // Atualiza post existente
  async updatePost(req, res) {
    try {
      const { title, content, author } = req.body;

      // Validação dos campos
      if (!title && !content && !author) {
        return res.status(400).json({
          message: "Forneça pelo menos um campo para atualizar",
        });
      }

      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      );

      if (!post) {
        logger.warn(
          `Tentativa de atualizar post inexistente: ${req.params.id}`
        );
        return res.status(404).json({ message: "Post não encontrado" });
      }

      logger.info(`Post atualizado: ${post.title}`);
      res.json(post);
    } catch (error) {
      logger.error("Erro ao atualizar post:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },

  // Remove post
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);

      if (!post) {
        logger.warn(`Tentativa de deletar post inexistente: ${req.params.id}`);
        return res.status(404).json({ message: "Post não encontrado" });
      }

      logger.info(`Post deletado: ${post.title}`);
      res.json({ message: "Post removido com sucesso", post });
    } catch (error) {
      logger.error("Erro ao deletar post:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },

  // Busca posts por termo
  async searchPosts(req, res) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          message: 'Forneça um termo de busca usando o parâmetro "q"',
        });
      }

      // Criando regex case-insensitive para a busca
      const searchRegex = new RegExp(q, "i");

      const posts = await Post.find({
        $or: [
          { title: searchRegex },
          { content: searchRegex },
          { author: searchRegex },
        ],
      }).sort({ createdAt: -1 });

      logger.info(`Busca por "${q}" retornou ${posts.length} resultados`);
      res.json(posts);
    } catch (error) {
      logger.error("Erro na busca de posts:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },

  // Dados iniciais para teste
  async seedPosts(req, res) {
    try {
      const initialPosts = [
        {
          title: "Introdução à Matemática Básica",
          content:
            "Nesta aula, vamos explorar os conceitos fundamentais de adição e subtração...",
          author: "Maria Silva",
        },
        {
          title: "História do Brasil Colonial",
          content:
            "Vamos estudar os principais aspectos da colonização portuguesa no Brasil...",
          author: "João Santos",
        },
        {
          title: "Introdução à Matemática Básica",
          content:
            "Nesta aula, vamos explorar os conceitos fundamentais de matemática que servirão como base para todo o ensino fundamental. Começaremos com operações básicas de adição e subtração, entendendo como esses conceitos se aplicam no dia a dia. Aprenderemos sobre números naturais, inteiros e decimais, além de trabalhar com situações-problema que ajudam a desenvolver o raciocínio lógico-matemático.",
          author: "Maria Silva",
        },
        {
          title: "História do Brasil Colonial",
          content:
            "Vamos estudar os principais aspectos da colonização portuguesa no Brasil, desde a chegada dos portugueses em 1500 até a independência em 1822. Analisaremos o sistema de capitanias hereditárias, o ciclo do pau-brasil, a economia açucareira, o ciclo do ouro e a vinda da família real portuguesa. Discutiremos também o impacto desse período na formação da sociedade brasileira atual.",
          author: "João Santos",
        },
        {
          title: "Literatura Brasileira - Modernismo",
          content:
            "Exploraremos o movimento modernista brasileiro, iniciado com a Semana de Arte Moderna de 1922. Estudaremos as principais características deste período literário, seus autores mais importantes como Mário de Andrade, Oswald de Andrade e Manuel Bandeira, e como esse movimento revolucionou a arte e a literatura no Brasil. Analisaremos obras fundamentais como 'Macunaíma' e 'Paulicéia Desvairada'.",
          author: "Ana Oliveira",
        },
        {
          title: "Química Orgânica - Hidrocarbonetos",
          content:
            "Nesta aula sobre hidrocarbonetos, estudaremos os compostos formados exclusivamente por carbono e hidrogênio. Veremos suas classificações (alcanos, alcenos, alcinos e aromáticos), nomenclatura segundo a IUPAC, e principais propriedades físico-químicas. Realizaremos exercícios práticos de nomenclatura e identificação de cadeias carbônicas.",
          author: "Carlos Mendes",
        },
        {
          title: "Geografia - Clima e Relevo Brasileiro",
          content:
            "Hoje vamos explorar a diversidade climática e de relevo do Brasil. Estudaremos os diferentes tipos de clima presentes no território nacional, desde o equatorial na Amazônia até o subtropical no Sul. Analisaremos também as principais formações de relevo, como planaltos, planícies e depressões, e sua influência no desenvolvimento das diferentes regiões do país.",
          author: "Patricia Lima",
        },
        {
          title: "Física - Leis de Newton",
          content:
            "Nesta aula, estudaremos as três leis fundamentais do movimento formuladas por Isaac Newton. Começaremos pela Lei da Inércia, passando pela Relação entre Força e Aceleração, até chegarmos à Lei da Ação e Reação. Veremos aplicações práticas dessas leis no nosso cotidiano e resolveremos exercícios para fixação do conteúdo.",
          author: "Roberto Alves",
        },
        {
          title: "Biologia - Sistema Digestório Humano",
          content:
            "Vamos conhecer o funcionamento do sistema digestório humano, desde a boca até o intestino grosso. Estudaremos os órgãos envolvidos no processo de digestão, suas funções específicas e como trabalham em conjunto para transformar os alimentos em nutrientes que nosso corpo pode absorver. Abordaremos também as principais doenças relacionadas ao sistema digestório.",
          author: "Lucia Santos",
        },
        {
          title: "Inglês - Present Perfect Tense",
          content:
            "Let's learn about the Present Perfect Tense! Vamos aprender quando e como usar este tempo verbal tão importante na língua inglesa. Estudaremos a estrutura 'have/has + particípio passado', suas aplicações em diferentes contextos, e como ele se diferencia do Simple Past. Praticaremos com exercícios de fixação e conversação.",
          author: "Fernando Costa",
        },
        {
          title: "Artes - Renascimento Italiano",
          content:
            "Hoje exploraremos o Renascimento italiano, período histórico que revolucionou a arte entre os séculos XIV e XVI. Estudaremos as principais características desse movimento artístico, como o humanismo e a perspectiva. Conheceremos obras importantes de artistas como Leonardo da Vinci, Michelangelo e Rafael, analisando suas técnicas e contribuições para a história da arte.",
          author: "Clara Martins",
        },
        {
          title: "Educação Física - Voleibol",
          content:
            "Nesta aula prática, vamos aprender os fundamentos básicos do voleibol: saque, recepção, levantamento e ataque. Estudaremos as regras oficiais do esporte, as posições dos jogadores em quadra e as principais estratégias de jogo. Realizaremos exercícios práticos para desenvolver as habilidades necessárias para a prática do esporte.",
          author: "Pedro Souza",
        },
        {
          title: "Filosofia - Introdução à Lógica",
          content:
            "Nesta introdução à lógica filosófica, estudaremos os princípios básicos do raciocínio lógico. Abordaremos conceitos fundamentais como proposições, silogismos e falácias lógicas. Veremos como a lógica se aplica ao pensamento crítico e à argumentação, com exemplos práticos do cotidiano.",
          author: "Rafael Mendes",
        },
        {
          title: "Sociologia - Movimentos Sociais",
          content:
            "Vamos analisar o papel dos movimentos sociais na transformação da sociedade. Estudaremos diferentes tipos de movimentos sociais, suas origens, objetivos e impactos. Discutiremos casos históricos importantes e movimentos contemporâneos, entendendo sua relevância para as mudanças sociais e políticas.",
          author: "Mariana Costa",
        },
      ];

      await Post.deleteMany({});
      const posts = await Post.insertMany(initialPosts);

      logger.info(`${posts.length} posts iniciais inseridos`);
      res.json(posts);
    } catch (error) {
      logger.error("Erro ao inserir posts iniciais:", error);
      res.status(500).json(formatErrorResponse(error));
    }
  },
};

module.exports = postController;
