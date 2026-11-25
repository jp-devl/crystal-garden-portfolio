# João Pedro — Portfólio Profissional

Portfólio pessoal com uma experiência editorial, responsiva e interativa para apresentar trajetória, formação, conhecimentos, projetos e contato profissional. A identidade visual combina tipografia editorial, paleta quente em tons de cobre e pôr do sol, superfícies claras e elementos 3D discretos.

[Portfólio publicado](https://crystal-garden-portfolio.lovable.app) · [Repositório no GitHub](https://github.com/jp-devl/crystal-garden-portfolio)

## Apresentação

Sou João Pedro, desenvolvedor em formação, com base em informática e interesse em desenvolvimento de software, infraestrutura e Segurança da Informação. Este portfólio reúne minha trajetória, minhas formações e os projetos que representam meu caminho até aqui, em uma navegação pensada para ser clara, elegante e acessível.

## Sobre o projeto

O projeto é um portfólio pessoal desenvolvido para apresentar:

- trajetória e apresentação pessoal;
- formação técnica e acadêmica;
- conhecimentos e ferramentas utilizadas;
- projetos em destaque;
- áreas de atuação;
- contato profissional.

O conteúdo editorial fica concentrado em `src/data/profile.ts`, o que facilita atualizar textos, projetos e formações sem mexer na estrutura das seções.

## Tecnologias

Tecnologias efetivamente presentes no código e no `package.json`:

| Camada | Tecnologias |
| --- | --- |
| Aplicação | React 19, TypeScript e Vite 8 |
| Roteamento e dados | TanStack Start, TanStack Router e TanStack Query |
| Estilização | Tailwind CSS 4 e CSS autoral |
| Experiência 3D | Three.js, React Three Fiber e Drei |
| Ícones e testes | Lucide React e Vitest |

A aplicação consome também a API pública do GitHub para carregar os repositórios exibidos no Universo 3D.

## Funcionalidades e experiência visual

- Layout editorial e responsivo, com hierarquia tipográfica e espaçamento generoso.
- Hero com retrato, identidade pessoal e emblema 3D carregado sob demanda.
- Painel de apresentação com localização, indicadores derivados dos dados e frentes de atuação.
- Timeline interativa da trajetória, com navegação por etapas e desenho progressivo.
- Projetos em destaque com capas oficiais e faixa presa ao scroll no desktop.
- Seção de conhecimentos com logotipos reais das ferramentas apresentadas.
- Formação com as marcas institucionais oficiais do SENAI e da FASEC.
- Universo 3D em `/universo`, com repositórios públicos do GitHub em uma cena interativa.
- Contato com links profissionais e mapa incorporado da região de Palmas, Tocantins.
- Revelações progressivas discretas com `IntersectionObserver` e respeito a `prefers-reduced-motion`.

## Como executar localmente

Pré-requisitos: Node.js e npm.

```bash
git clone https://github.com/jp-devl/crystal-garden-portfolio.git
cd crystal-garden-portfolio
npm install
npm run dev
```

O Vite exibirá a URL local no terminal. Para gerar a versão de produção:

```bash
npm run build
```

Outros scripts disponíveis: `npm test`, `npm run lint` e `npm run format`.

## Estrutura do projeto

```text
src/
  routes/
    index.tsx              # página editorial principal
    universo.tsx           # rota do Universo 3D
    __root.tsx             # layout raiz, metadados e providers
  components/
    jp/                    # hero, painel pessoal, timeline, conhecimentos e formação
    portfolio/             # cena 3D, câmera, cristais e cards dos repositórios
    ui/                    # componentes de interface reutilizáveis
  data/
    profile.ts             # conteúdo editorial, projetos e formação
    projects.ts            # acesso aos repositórios públicos do GitHub
  styles.css               # sistema visual editorial e responsivo
public/
  images/
    joao-pedro.jpg
    institutions/          # marcas SENAI e FASEC
    logos/                 # logotipos das tecnologias
    projects/              # capas dos projetos em destaque
```

## Acesso

- Repositório: https://github.com/jp-devl/crystal-garden-portfolio
- Portfólio publicado: https://crystal-garden-portfolio.lovable.app
- Universo 3D: https://crystal-garden-portfolio.lovable.app/universo
