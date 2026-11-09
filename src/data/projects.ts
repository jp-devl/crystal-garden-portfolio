// Configuração: troque aqui o usuário do GitHub exibido no portfólio.
export const GITHUB_USERNAME = "jp-devl";
export const DEFAULT_DESCRIPTION = "Projeto desenvolvido por João Pedro";

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  color: string;
  coverUrl: string;
  position: [number, number, number];
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  private: boolean;
  default_branch: string;
}

const PALETTE = ["#58a6ff", "#3fb950", "#d29922", "#f78166", "#bc8cff", "#39c5cf", "#ff7b72", "#e3b341"];

const SPACING = 3.2;

function columnsFor(count: number) {
  return Math.min(6, Math.max(1, Math.ceil(Math.sqrt(count * 1.6))));
}

/** Meia-largura/altura aproximada da grade, usada para posicionar a câmera. */
export function layoutRadius(count: number) {
  const cols = columnsFor(count);
  const rows = Math.ceil(count / cols);
  return Math.max(3.5, (Math.max(cols, rows * 1.6) * SPACING) / 2);
}

/** Distribui os cristais em uma grade centralizada, com leve variação de profundidade. */
function positionFor(i: number, count: number): [number, number, number] {
  const cols = columnsFor(count);
  const rows = Math.ceil(count / cols);
  const row = Math.floor(i / cols);
  const inRow = row === rows - 1 ? count - row * cols : cols;
  const col = i % cols;
  const x = (col - (inRow - 1) / 2) * SPACING;
  const y = ((rows - 1) / 2 - row) * SPACING * 0.85;
  const z = ((i * 37) % 5) * 0.25 - 0.5;
  return [x, y, z];
}

/** Capa na raiz do repo: [nome-do-repositorio]-capa.png */
export function coverUrlFor(repo: string, branch = "main", user: string = GITHUB_USERNAME) {
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch || "main"}/${repo}-capa.png`;
}

export function mapRepos(repos: GitHubRepo[]): Project[] {
  const visible = repos.filter((r) => !r.private && !r.fork);
  return visible.map((r, i) => ({
    id: String(r.id),
    name: r.name,
    description: r.description?.trim() || DEFAULT_DESCRIPTION,
    url: r.html_url,
    coverUrl: coverUrlFor(r.name, r.default_branch),
    language: r.language,
    stars: r.stargazers_count,
    color: PALETTE[i % PALETTE.length] ?? "#58a6ff",
    position: positionFor(i, visible.length),
  }));
}

export async function fetchGitHubProjects(username: string = GITHUB_USERNAME): Promise<Project[]> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(`GitHub respondeu ${res.status}`);
  return mapRepos((await res.json()) as GitHubRepo[]);
}
