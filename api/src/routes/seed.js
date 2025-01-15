const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const logger = require("../config/logger");

// Dados iniciais para usuários
const initialUsers = [
  {
    name: "Ricardo Santos",
    email: "ricardo.santos@universidade.edu",
    discipline: "Algoritmos e Estruturas de Dados",
    role: "professor",
  },
  {
    name: "Amanda Costa",
    email: "amanda.costa@universidade.edu",
    discipline: "Redes de Computadores",
    role: "professor",
  },
  {
    name: "Carlos Eduardo",
    email: "carlos.eduardo@universidade.edu",
    discipline: "Programação Orientada a Objetos",
    role: "professor",
  },
  {
    name: "Fernando Silva",
    email: "fernando.silva@universidade.edu",
    discipline: "Banco de Dados",
    role: "professor",
  },
  {
    name: "Marina Oliveira",
    email: "marina.oliveira@universidade.edu",
    discipline: "Inteligência Artificial",
    role: "professor",
  },
  {
    name: "Lucas Mendes",
    email: "lucas.mendes@universidade.edu",
    discipline: "Desenvolvimento Web",
    role: "professor",
  },
  {
    name: "Roberto Almeida",
    email: "roberto.almeida@universidade.edu",
    discipline: "Sistemas Operacionais",
    role: "professor",
  },
  {
    name: "Beatriz Santos",
    email: "beatriz.santos@universidade.edu",
    discipline: "Estruturas de Dados Avançadas",
    role: "professor",
  },
  {
    name: "Gustavo Lima",
    email: "gustavo.lima@universidade.edu",
    discipline: "Computação Gráfica",
    role: "professor",
  },
  {
    name: "Rafael Costa",
    email: "rafael.costa@universidade.edu",
    discipline: "Segurança da Informação",
    role: "professor",
  },
  {
    name: "Marcos Paulo",
    email: "marcos.paulo@universidade.edu",
    discipline: "Desenvolvimento Backend",
    role: "professor",
  },
  {
    name: "Julia Reis",
    email: "julia.reis@universidade.edu",
    discipline: "Machine Learning",
    role: "professor",
  },
  {
    name: "André Santos",
    email: "andre.santos@universidade.edu",
    discipline: "Engenharia de Software",
    role: "professor",
  },
  {
    name: "Renata Lima",
    email: "renata.lima@universidade.edu",
    discipline: "Cloud Computing",
    role: "professor",
  },
  {
    name: "Pedro Souza",
    email: "pedro.souza@universidade.edu",
    discipline: "Internet das Coisas",
    role: "professor",
  },
  {
    name: "Thiago Costa",
    email: "thiago.costa@universidade.edu",
    discipline: "Compiladores",
    role: "professor",
  },
  {
    name: "Carolina Silva",
    email: "carolina.silva@universidade.edu",
    discipline: "Data Science",
    role: "professor",
  },
  {
    name: "Leonardo Oliveira",
    email: "leonardo.oliveira@universidade.edu",
    discipline: "Computação Distribuída",
    role: "professor",
  },
  {
    name: "Fernanda Lima",
    email: "fernanda.lima@universidade.edu",
    discipline: "Processamento de Linguagem Natural",
    role: "professor",
  },
  {
    name: "Ricardo Oliveira",
    email: "ricardo.oliveira@universidade.edu",
    discipline: "DevOps e SRE",
    role: "professor",
  },
];

// Função para criar posts com base nos usuários criados
const createInitialPosts = (users) => {
  return [
    {
      title: "Algoritmos de Ordenação",
      content:
        "Neste módulo, exploraremos os principais algoritmos de ordenação e suas complexidades computacionais. O Bubble Sort, embora simples, possui complexidade O(n²) e funciona comparando elementos adjacentes, trocando-os se estiverem fora de ordem. O Merge Sort, com complexidade O(n log n), utiliza a técnica de divisão e conquista, dividindo o array em subarrays menores, ordenando-os e depois mesclando-os. Já o Quick Sort, também com complexidade média O(n log n), escolhe um pivô e particiona o array em elementos menores e maiores que o pivô, ordenando recursivamente. Discutiremos também implementações práticas, casos de uso ideais para cada algoritmo e técnicas de otimização.",
      author: users[0]._id, // Prof. Ricardo Santos - Algoritmos
    },
    {
      title: "Arquitetura TCP/IP",
      content:
        "A arquitetura TCP/IP é fundamental para o funcionamento da Internet moderna. Este estudo abrange as quatro camadas do modelo: Aplicação, Transporte, Internet e Acesso à Rede. Na camada de aplicação, protocolos como HTTP, FTP e SMTP permitem a comunicação entre aplicações. A camada de transporte, com TCP e UDP, oferece diferentes níveis de confiabilidade na entrega de dados. O TCP garante entrega ordenada e confiável através de acknowledgments e controle de fluxo, enquanto o UDP prioriza velocidade sobre confiabilidade. Na camada de Internet, o protocolo IP gerencia o endereçamento e roteamento de pacotes através de diferentes redes. Exploraremos também o funcionamento do DNS, NAT e principais vulnerabilidades de segurança em cada camada.",
      author: users[1]._id, // Profa. Amanda Costa - Redes
    },
    {
      title: "Programação Orientada a Objetos",
      content:
        "A Programação Orientada a Objetos (POO) representa um paradigma fundamental no desenvolvimento de software moderno. Estudaremos os quatro pilares principais: encapsulamento, que protege os dados e implementação interna dos objetos; herança, permitindo reuso de código e estabelecimento de hierarquias entre classes; polimorfismo, possibilitando diferentes comportamentos para uma mesma interface; e abstração, simplificando sistemas complexos. Analisaremos padrões de projeto comuns como Singleton, Factory e Observer, suas implementações e casos de uso. Discutiremos também princípios SOLID, composição versus herança, e boas práticas de design orientado a objetos. Serão apresentados exemplos práticos em Java e Python, demonstrando diferenças na implementação destes conceitos em diferentes linguagens.",
      author: users[2]._id, // Prof. Carlos Eduardo - POO
    },
    {
      title: "Banco de Dados Relacionais",
      content:
        "Estudo aprofundado sobre Sistemas Gerenciadores de Banco de Dados Relacionais (SGBDR). Abordaremos o modelo relacional, álgebra relacional e normalização de dados até a Forma Normal de Boyce-Codd. Exploraremos o SQL avançado, incluindo subconsultas correlacionadas, junções complexas, funções de janela e índices. Discutiremos também aspectos de otimização de consultas, como funcionamento do query planner, estratégias de indexação e análise de planos de execução. Serão abordados conceitos de transações ACID, níveis de isolamento, deadlocks e técnicas de concorrência. Estudaremos também recuperação de falhas, logging e backup em sistemas distribuídos.",
      author: users[3]._id, // Prof. Fernando Silva - Banco de Dados
    },
    {
      title: "Inteligência Artificial",
      content:
        "Introdução aos fundamentos da Inteligência Artificial, abrangendo aprendizado de máquina supervisionado e não supervisionado. Estudaremos algoritmos clássicos como árvores de decisão, redes neurais artificiais e máquinas de vetores de suporte (SVM). Aprofundaremos em técnicas de deep learning, incluindo redes neurais convolucionais (CNN) para processamento de imagens e redes neurais recorrentes (RNN) para processamento de sequências. Abordaremos também aspectos práticos como preparação de dados, validação cruzada, regularização e técnicas de otimização. Discutiremos aplicações práticas em visão computacional, processamento de linguagem natural e sistemas de recomendação.",
      author: users[4]._id, // Profa. Marina Oliveira - IA
    },
    {
      title: "Desenvolvimento Web Frontend",
      content:
        "Análise completa do desenvolvimento web moderno do lado cliente. Começaremos com HTML5 semântico e CSS3, incluindo flexbox, grid e animações. Estudaremos JavaScript ES6+ em profundidade, abordando promises, async/await, módulos e padrões de projeto específicos para frontend. Exploraremos o framework React, incluindo hooks, context API, e gerenciamento de estado com Redux. Discutiremos também performance web, otimização de recursos, lazy loading e técnicas de renderização do lado do servidor (SSR). Abordaremos testes automatizados com Jest e Testing Library, além de práticas de acessibilidade e responsividade.",
      author: users[5]._id, // Prof. Lucas Mendes - Web
    },
    {
      title: "Sistemas Operacionais",
      content:
        "Estudo dos componentes fundamentais dos sistemas operacionais modernos. Analisaremos gerenciamento de processos e threads, incluindo escalonamento, sincronização e comunicação entre processos. Exploraremos gerenciamento de memória, incluindo paginação, segmentação e memória virtual. Estudaremos sistemas de arquivos, dispositivos de E/S e drivers. Abordaremos também aspectos de segurança, virtualização e containers. Serão apresentados estudos de caso dos sistemas Linux, Windows e macOS, comparando suas arquiteturas e decisões de design.",
      author: users[6]._id, // Prof. Roberto Almeida - SO
    },
    {
      title: "Estruturas de Dados",
      content:
        "Análise detalhada das principais estruturas de dados e suas aplicações. Começaremos com estruturas básicas como arrays, listas ligadas e pilhas, progredindo para estruturas mais complexas como árvores balanceadas (AVL, Rubro-Negra), heaps e grafos. Estudaremos hash tables, incluindo funções de hash, resolução de colisões e rehashing. Para cada estrutura, analisaremos complexidade temporal e espacial, trade-offs de design e casos de uso ideais. Implementaremos estas estruturas em diferentes linguagens de programação, discutindo particularidades de cada implementação.",
      author: users[7]._id, // Profa. Beatriz Santos - ED
    },
    {
      title: "Computação Gráfica",
      content:
        "Fundamentos da computação gráfica moderna, incluindo pipeline de renderização, transformações geométricas e projeções. Estudaremos algoritmos de rasterização, ray tracing e técnicas de iluminação global. Abordaremos shaders, texturas e mapeamento UV. Exploraremos técnicas de animação, incluindo interpolação, cinemática e simulação física. Discutiremos também realidade virtual e aumentada, bem como bibliotecas gráficas como OpenGL e WebGL. Serão apresentados casos práticos de desenvolvimento de jogos e aplicações gráficas interativas.",
      author: users[8]._id, // Prof. Gustavo Lima - CG
    },
    {
      title: "Segurança da Informação",
      content:
        "Estudo abrangente sobre segurança computacional, incluindo criptografia simétrica e assimétrica, funções hash e certificados digitais. Analisaremos vulnerabilidades comuns como buffer overflow, SQL injection e XSS. Estudaremos técnicas de autenticação, autorização e auditoria. Abordaremos segurança de redes, incluindo firewalls, IDS/IPS e VPNs. Discutiremos também aspectos forenses, análise de malware e resposta a incidentes. Serão apresentadas boas práticas de desenvolvimento seguro e frameworks de segurança.",
      author: users[9]._id, // Prof. Rafael Costa - Segurança
    },
    {
      title: "Desenvolvimento Backend",
      content:
        "Análise das tecnologias e práticas modernas de desenvolvimento backend. Estudaremos arquitetura de microsserviços, APIs RESTful e GraphQL. Abordaremos frameworks como Spring Boot e Node.js, incluindo injeção de dependência, ORM e middleware. Exploraremos mensageria assíncrona com RabbitMQ e Kafka. Discutiremos cache distribuído, balanceamento de carga e escalabilidade horizontal. Serão apresentadas práticas de logging, monitoramento e deploy contínuo em ambientes cloud.",
      author: users[10]._id, // Prof. Marcos Paulo - Backend
    },
    {
      title: "Machine Learning",
      content:
        "Estudo aprofundado de algoritmos de aprendizado de máquina. Começaremos com regressão linear e logística, progredindo para técnicas mais avançadas como gradient boosting e redes neurais profundas. Analisaremos métodos de redução de dimensionalidade como PCA e t-SNE. Estudaremos técnicas de processamento de linguagem natural, incluindo word embeddings e transformers. Abordaremos também aspectos práticos como feature engineering, validação de modelos e deploy em produção. Discutiremos frameworks populares como scikit-learn, TensorFlow e PyTorch.",
      author: users[11]._id, // Profa. Julia Reis - ML
    },
    {
      title: "Engenharia de Software",
      content:
        "Análise dos princípios e práticas da engenharia de software moderna. Estudaremos metodologias ágeis como Scrum e Kanban, bem como práticas de XP como TDD e pair programming. Abordaremos arquitetura de software, incluindo padrões arquiteturais, design patterns e princípios SOLID. Exploraremos DevOps, incluindo CI/CD, containerização e infraestrutura como código. Discutiremos também gestão de projetos, estimativas e métricas de qualidade de software.",
      author: users[12]._id, // Prof. André Santos - Eng. Software
    },
    {
      title: "Cloud Computing",
      content:
        "Estudo abrangente sobre computação em nuvem, incluindo modelos de serviço (IaaS, PaaS, SaaS) e tipos de implantação (pública, privada, híbrida). Analisaremos serviços AWS, incluindo EC2, S3, RDS e Lambda. Estudaremos arquiteturas serverless e containers. Abordaremos aspectos de segurança, compliance e governança em cloud. Discutiremos também estratégias de migração, otimização de custos e disaster recovery. Serão apresentados casos práticos de arquiteturas cloud-native.",
      author: users[13]._id, // Profa. Renata Lima - Cloud
    },
    {
      title: "Internet das Coisas",
      content:
        "Fundamentos de IoT, incluindo arquiteturas de referência, protocolos de comunicação e sensores. Estudaremos redes de sensores sem fio, incluindo ZigBee e LoRaWAN. Abordaremos processamento de dados em edge computing e fog computing. Analisaremos aspectos de segurança específicos para IoT. Discutiremos também integração com sistemas cloud, análise de dados em tempo real e aplicações práticas em smart cities e indústria 4.0.",
      author: users[14]._id, // Prof. Pedro Souza - IoT
    },
    {
      title: "Compiladores",
      content:
        "Estudo da teoria e implementação de compiladores. Analisaremos as fases de compilação: análise léxica, sintática e semântica, geração de código intermediário e otimização. Estudaremos gramáticas formais, autômatos e expressões regulares. Abordaremos técnicas de parsing como LL e LR. Exploraremos otimizações de código como eliminação de código morto e propagação de constantes. Implementaremos um compilador simples como projeto prático.",
      author: users[15]._id, // Prof. Thiago Costa - Compiladores
    },
    {
      title: "Data Science",
      content:
        "Análise abrangente do processo de ciência de dados, desde a coleta e limpeza até visualização e interpretação. Estudaremos técnicas de análise exploratória, visualização com bibliotecas como matplotlib e seaborn, e análise estatística. Abordaremos pipeline de dados, feature engineering e seleção de modelos. Exploraremos big data com Spark e Hadoop. Discutiremos também aspectos éticos e viés em dados. Serão apresentados casos práticos em diferentes domínios.",
      author: users[16]._id, // Profa. Carolina Silva - Data Science
    },
    {
      title: "Computação Distribuída",
      content:
        "Estudo dos fundamentos de sistemas distribuídos, incluindo modelos de comunicação, sincronização e consistência. Analisaremos algoritmos distribuídos para eleição de líder, exclusão mútua e consenso. Estudaremos tolerância a falhas, replicação e particionamento de dados. Abordaremos sistemas peer-to-peer e blockchain. Discutiremos também aspectos práticos como deploy distribuído e debugging de sistemas distribuídos.",
      author: users[17]._id, // Prof. Leonardo Oliveira - Comp. Distribuída
    },
    {
      title: "Processamento de Linguagem Natural",
      content:
        "Análise das técnicas modernas de PLN, incluindo tokenização, pos-tagging e parsing. Estudaremos modelos de linguagem estatísticos e neurais, incluindo word2vec, BERT e GPT. Abordaremos tarefas como classificação de texto, análise de sentimento e tradução automática. Exploraremos também chatbots, sistemas de perguntas e respostas e sumarização de texto. Discutiremos aplicações práticas em diferentes domínios e limitações atuais da tecnologia.",
      author: users[18]._id, // Profa. Fernanda Lima - PLN
    },
    {
      title: "DevOps e SRE",
      content:
        "Estudo das práticas modernas de DevOps e Site Reliability Engineering. Analisaremos cultura DevOps, incluindo colaboração entre desenvolvimento e operações. Estudaremos ferramentas de automação como Ansible e Terraform. Abordaremos monitoring, logging e tracing distribuído. Exploraremos SLIs, SLOs e error budgets. Discutiremos também chaos engineering, post-mortems e gestão de incidentes. Serão apresentadas práticas de observabilidade e reliability em produção.",
      author: users[19]._id, // Prof. Ricardo Oliveira - DevOps
    },
  ];
};

// Rota para seed
router.post("/", async (req, res) => {
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
      message: "Dados iniciais inseridos com sucesso",
      users,
      posts,
    });
  } catch (error) {
    logger.error("Erro ao inserir dados iniciais:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
