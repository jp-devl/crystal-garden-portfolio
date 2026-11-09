export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  color: string;
  position: [number, number, number];
}

export const projects: Project[] = [
  {
    id: "asimov",
    name: "Projeto-Python-Asimov",
    description: "Automação criada nas aulas da Asimov Academy",
    url: "https://github.com/",
    color: "#58a6ff",
    position: [-3.6, 0, 0],
  },
  {
    id: "portfolio",
    name: "Meu-Portfolio-3D",
    description: "Este portfólio incrível rodando no Lovable com Three.js",
    url: "https://github.com/",
    color: "#3fb950",
    position: [-1.2, 0.4, -1],
  },
  {
    id: "dados",
    name: "Analise-de-Dados",
    description: "Scripts de tratamento de dados e Machine Learning",
    url: "https://github.com/",
    color: "#d29922",
    position: [1.2, -0.3, -1],
  },
  {
    id: "bot",
    name: "Bot-Telegram-Automation",
    description: "Um bot automatizado integrado com APIs externas",
    url: "https://github.com/",
    color: "#f78166",
    position: [3.6, 0.2, 0],
  },
];
