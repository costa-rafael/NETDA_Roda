export const courses = [
  {
    id: 1,
    name: "Tecnologias Digitais e Gestão",
    color: "#ca3b33",
    challenges: [
      {
        type: "tf",
        question: "Um gestor com competências digitais consegue tomar decisões mais informadas porque usa dados e tecnologia no processo.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o conceito à área certa do curso: 'Analisar dados para apoiar decisões'",
        options: [
          { id: "A", text: "Marketing Digital" },
          { id: "B", text: "Métodos Analíticos Aplicados à Gestão" },
          { id: "C", text: "Logística" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Neste curso aprendes a integrar tecnologia para tornar as empresas mais ______ e competitivas.",
        options: [
          { id: "A", text: "Eficientes e Digitais" },
          { id: "B", text: "Burocráticas e Lentas" },
          { id: "C", text: "Manuais e Tradicionais" }
        ],
        answer: "A"
      }
    ]
  },
  {
    id: 2,
    name: "Política, Economia e Sociedade",
    color: "#d5462a",
    challenges: [
      {
        type: "tf",
        question: "Compreender fenómenos sociais complexos exige apenas conhecimento de uma área, desde que seja aprofundado.",
        answer: false,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o objetivo à área principal: 'Estudar como funcionam eleições e sistemas de governo'",
        options: [
          { id: "A", text: "Economia" },
          { id: "B", text: "Ciência Política" },
          { id: "C", text: "Sociologia" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Neste curso desenvolves competências para interpretar dados e fenómenos sociais de forma a fundamentar melhor as decisões em contexto ______.",
        options: [
          { id: "A", text: "Privado e Familiar" },
          { id: "B", text: "Político e Público" },
          { id: "C", text: "Informal e Aleatório" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: 3,
    name: "Desenvolvimento de Software e Aplicações",
    color: "#753b99",
    challenges: [
      {
        type: "tf",
        question: "Desenvolver software moderno implica apenas saber programar, sendo desnecessário compreender utilizadores ou o contexto onde a aplicação é usada.",
        answer: false,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o problema à área mais adequada: 'Garantir que uma aplicação consegue suportar muitos utilizadores ao mesmo tempo sem falhar'",
        options: [
          { id: "A", text: "Desenho Centrado no Utilizador" },
          { id: "B", text: "Sistemas e Arquiteturas (cloud/distribuídos)" },
          { id: "C", text: "Empreendedorismo" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "No desenvolvimento de software, escrever código sem considerar segurança pode levar a ______ no sistema.",
        options: [
          { id: "A", text: "Melhorias de Performance" },
          { id: "B", text: "Vulnerabilidades de Segurança" },
          { id: "C", text: "Novas Funcionalidades" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: 4,
    name: "Matemática Aplicada e Tecnologias Digitais",
    color: "#95c5db",
    challenges: [
      {
        type: "tf",
        question: "A modelação matemática permite representar sistemas reais de forma simplificada, mantendo apenas os elementos essenciais para análise e previsão.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o objetivo à abordagem mais adequada: 'Criar um modelo para prever o comportamento de um sistema complexo'",
        options: [
          { id: "A", text: "Programação básica" },
          { id: "B", text: "Modelação matemática" },
          { id: "C", text: "Design thinking" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Neste curso utilizas modelos matemáticos para representar problemas reais, sabendo que esses modelos são sempre uma ______ da realidade.",
        options: [
          { id: "A", text: "Cópia Exata" },
          { id: "B", text: "Aproximação Simplificada" },
          { id: "C", text: "Substituição Total" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: 5,
    name: "Tecnologias Digitais e Automação",
    color: "#a2a2a2",
    challenges: [
      {
        type: "tf",
        question: "Num sistema automatizado, sensores e atuadores têm funções opostas: uns recolhem informação e outros executam ações com base nela.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o problema ao componente mais crítico: 'Um sistema automático não reage corretamente às mudanças do ambiente'",
        options: [
          { id: "A", text: "Sensores" },
          { id: "B", text: "Atuadores" },
          { id: "C", text: "Interface gráfica" }
        ],
        answer: "A"
      },
      {
        type: "complete",
        question: "Num sistema de automação, a tomada de decisão em tempo real depende da correta integração entre dados, controlo e ______.",
        options: [
          { id: "A", text: "Execução Física" },
          { id: "B", text: "Manual de Instruções" },
          { id: "C", text: "Relatórios de Papel" }
        ],
        answer: "A"
      }
    ]
  },
  {
    id: 6,
    name: "Tecnologias Digitais e Inteligência Artificial",
    color: "#e0b52b",
    challenges: [
      {
        type: "tf",
        question: "Um sistema de inteligência artificial pode identificar padrões nos dados sem ter sido explicitamente programado para cada caso específico.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o tipo de tarefa ao conceito mais adequado: 'Treinar um modelo com dados já classificados (com respostas certas)'",
        options: [
          { id: "A", text: "Aprendizagem não supervisionada" },
          { id: "B", text: "Aprendizagem supervisionada" },
          { id: "C", text: "Programação tradicional" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Num sistema de inteligência artificial, a qualidade das previsões depende fortemente da qualidade dos ______ utilizados no treino.",
        options: [
          { id: "A", text: "Monitores" },
          { id: "B", text: "Dados de Treino" },
          { id: "C", text: "Cabos de Rede" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: 7,
    name: "Tecnologias Digitais e Saúde",
    color: "#b2bfa8",
    challenges: [
      {
        type: "tf",
        question: "A utilização de inteligência artificial na saúde pode apoiar decisões clínicas, mas não substitui completamente o julgamento humano.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o objetivo à tecnologia mais adequada: 'Monitorizar pacientes à distância em tempo real'",
        options: [
          { id: "A", text: "Bases de dados" },
          { id: "B", text: "Tele-saúde e dispositivos inteligentes" },
          { id: "C", text: "Telemóveis" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Em sistemas de saúde digital, algoritmos de inteligência artificial são utilizados para identificar padrões em dados clínicos e apoiar processos de ______ assistido.",
        options: [
          { id: "A", text: "Diagnóstico Médico" },
          { id: "B", text: "Secretariado" },
          { id: "C", text: "Design Gráfico" }
        ],
        answer: "A"
      }
    ]
  },
  {
    id: 8,
    name: "Tecnologias Digitais e Segurança de Informação",
    color: "#781f39",
    challenges: [
      {
        type: "tf",
        question: "Um sistema pode estar funcional e eficiente, mas ainda assim ser considerado inseguro do ponto de vista da cibersegurança.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o objetivo ao mecanismo mais adequado: 'Garantir que uma mensagem não foi alterada durante a transmissão'",
        options: [
          { id: "A", text: "Confidencialidade" },
          { id: "B", text: "Integridade" },
          { id: "C", text: "Disponibilidade" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Num sistema seguro, limitar o acesso de utilizadores apenas ao que é estritamente necessário segue o princípio do menor ______.",
        options: [
          { id: "A", text: "Esforço" },
          { id: "B", text: "Privilégio" },
          { id: "C", text: "Tempo" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: 9,
    name: "Tecnologias Digitais Educativas",
    color: "#386b47",
    challenges: [
      {
        type: "tf",
        question: "A utilização de tecnologias digitais na educação garante automaticamente uma melhor aprendizagem, independentemente da forma como são usadas.",
        answer: false,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o objetivo à abordagem mais adequada: 'Criar uma experiência de aprendizagem adaptada ao ritmo e necessidades de cada aluno'",
        options: [
          { id: "A", text: "Ensino tradicional uniforme" },
          { id: "B", text: "Aprendizagem personalizada com tecnologias digitais" },
          { id: "C", text: "Avaliação padronizada" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Num contexto de educação digital, o uso de tecnologia deve ser orientado por objetivos ______ e não apenas pela inovação tecnológica.",
        options: [
          { id: "A", text: "Financeiros" },
          { id: "B", text: "Pedagógicos" },
          { id: "C", text: "Publicitários" }
        ],
        answer: "B"
      }
    ]
  },
  {
    id: 10,
    name: "Tecnologias Digitais, Edifícios e Construção Sustentável",
    color: "#9b3c28",
    challenges: [
      {
        type: "tf",
        question: "O uso de modelos digitais como o BIM (Building Information Modelling) permite antecipar problemas na construção antes da fase física da obra.",
        answer: true,
        options: ["Verdadeiro", "Falso"]
      },
      {
        type: "association",
        question: "Associa o objetivo à tecnologia mais adequada: 'Criar um modelo digital detalhado de um edifício com informação sobre materiais, custos e manutenção'",
        options: [
          { id: "A", text: "Reality Capture" },
          { id: "B", text: "Building Information Modelling (BIM)" },
          { id: "C", text: "Programação básica" }
        ],
        answer: "B"
      },
      {
        type: "complete",
        question: "Na construção sustentável, o uso de tecnologias digitais permite otimizar recursos e reduzir o impacto ______ dos edifícios.",
        options: [
          { id: "A", text: "Sonoro" },
          { id: "B", text: "Ambiental" },
          { id: "C", text: "Fiscal" }
        ],
        answer: "B"
      }
    ]
  }
];
