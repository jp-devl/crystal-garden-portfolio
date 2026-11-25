// Conteúdo real do portfólio. Edite aqui para atualizar textos e links.
export const PROFILE = {
  name: "João Pedro",
  fullName: "João Pedro Moreira Martins de Sousa",
  brand: "Portfólio Profissional",
  email: "joao.sousa@fasec.edu.br",
  github: "https://github.com/jp-devl",
  location: "Palmas, Tocantins — Brasil",
};

export const AREAS = [
  { n: "01", title: "Desenvolvimento de software", text: "Criação de soluções digitais que organizam processos e resolvem problemas reais do dia a dia." },
  { n: "02", title: "Tecnologia e infraestrutura", text: "Base construída com suporte técnico e manutenção, entendendo como os sistemas funcionam por dentro." },
  { n: "03", title: "Segurança da Informação", text: "Interesse em proteger dados, sistemas e pessoas — a área que guia o meu próximo passo." },
];

type FeaturedProject = {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  url: string;
  demo?: string | null;
  cover?: string | null;
  coverSmall?: string | null;
  coverAlt?: string;
  mark?: string | null;
  markAlt?: string;
};

export const FEATURED: FeaturedProject[] = [
  {
    name: "Calculator",
    tag: "Calculadora mobile",
    description: "Calculadora de estudo em Flutter e Dart, com operações básicas, números decimais e histórico de cálculos em uma tela separada.",
    stack: ["Flutter", "Dart"],
    url: "https://github.com/jp-devl/Calculator",
    demo: null,
    cover: "/images/projects/calculator-capa-1600.jpg",
    coverSmall: "/images/projects/calculator-capa-1000.jpg",
    coverAlt: "Capa oficial do projeto Calculator — calculadora mobile desenvolvida em Flutter e Dart",
    mark: null,
  },
  {
    name: "Lista de Tarefas",
    tag: "Gestão de tarefas",
    description: "Aplicativo de lista de tarefas para organizar o dia e acompanhar objetivos, com persistência local em SQLite.",
    stack: ["Flutter", "Dart", "SQLite"],
    url: "https://github.com/jp-devl/lista-de-tarefas",
    demo: null,
    cover: "/images/projects/lista-de-tarefas-capa-1600.jpg",
    coverSmall: "/images/projects/lista-de-tarefas-capa-1000.jpg",
    coverAlt: "Capa oficial do Lista de Tarefas — organize seu dia, conquiste seus objetivos",
    mark: null,
  },
  {
    name: "Limpeza CMD Win10/11",
    tag: "Limpeza de sistema",
    description: "Guia prático para limpar arquivos desnecessários e melhorar o desempenho do PC no Windows 10/11 usando o Prompt de Comando, com cleanmgr e DiskPart.",
    stack: ["Windows 10/11", "CMD", "cleanmgr", "DiskPart"],
    url: "https://github.com/jp-devl/Limpeza-Cmd-Win10-11",
    demo: null,
    cover: "/images/projects/limpeza-cmd-capa-1600.jpg",
    coverSmall: "/images/projects/limpeza-cmd-capa-1000.jpg",
    coverAlt: "Capa oficial do Limpeza CMD Win10/11 — como limpar o PC pelo CMD no Windows",
    mark: null,
  },
];

export const EDUCATION = [
  { title: "Técnico em Informática", place: "SENAI" },
  { title: "Tecnólogo em Análise e Desenvolvimento de Sistemas", place: "FASEC — Faculdade Serra do Carmo" },
];
