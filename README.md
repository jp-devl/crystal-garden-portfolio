# Crystal Garden Portfolio

Crie uma aplicação de Portfólio 3D interativa moderna e elegante. 

Para a interface visual e os elementos 3D, siga os seguintes requisitos técnicos:
1. Instale e utilize a biblioteca Three.js junto com os conectores oficiais para React: `@react-three/fiber` e `@react-three/drei`.
2. O fundo da aplicação deve ser escuro e elegante usando Tailwind CSS (`bg-[#0d1117]`).
3. Crie um Canvas 3D que ocupe a tela inteira (ou uma seção de destaque). Adicione iluminação suave, sombras e controles de órbita (`<OrbitControls />` com damping ativado) para permitir que eu rotacione e interaja com a cena usando o mouse.
4. Dentro da cena 3D, renderize dinamicamente uma coleção de objetos interativos (como esferas geométricas ou cristais do tipo `IcosahedronGeometry`). Cada objeto representará um projeto do meu GitHub.
5. Crie uma lista estática (Mock Data) com 4 projetos de exemplo para servir de base:
   - "Projeto-Python-Asimov" (Descrição: Automação criada nas aulas da Asimov Academy)
   - "Meu-Portfolio-3D" (Descrição: Este portfólio incrível rodando no Lovable com Three.js)
   - "Analise-de-Dados" (Descrição: Scripts de tratamento de dados e Machine Learning)
   - "Bot-Telegram-Automation" (Descrição: Um bot automatizado integrado com APIs externas)
6. Faça com que os cristais flutuem suavemente no espaço usando um hook `useFrame` para animar a rotação e a posição Y (seno).
7. Implemente um sistema de clique (Raycasting) nos objetos 3D. Quando o usuário clicar em um cristal, exiba uma janela modal/card flutuante elegante na parte inferior usando componentes do Tailwind com efeito de vidro fosco (`backdrop-blur-md`). Esse card deve mostrar o nome do projeto selecionado, a descrição e um botão estilizado "Ver no GitHub".

Escreva um código modularizado, limpo e em TypeScript.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://crystal-garden-portfolio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/df2f108f-3c0f-424e-811e-506348aec638).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
