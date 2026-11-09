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
}

const PALETTE = ["#58a6ff", "#3fb950", "#d29922", "#f78166", "#bc8cff", "#39c5cf", "#ff7b72", "#e3b341"];

/** Distribui os cristais em um anel com alturas alternadas; o raio cresce com a quantidade. */
export function layoutRadius(count: number) {
  return Math.max(3.5, count * 0.42);
}

function positionFor(i: number, count: number): [number, number, number] {
  const r = layoutRadius(count);
  const angle = (i / Math.max(count, 1)) * Math.PI * 2;
  return [Math.sin(angle) * r, (i % 2 === 0 ? 0.5 : -0.5), Math.cos(angle) * r];
}

export function mapRepos(repos: GitHubRepo[]): Project[] {
  const visible = repos.filter((r) => !r.private && !r.fork);
  return visible.map((r, i) => ({
    id: String(r.id),
    name: r.name,
    description: r.description?.trim() || DEFAULT_DESCRIPTION,
    url: r.html_url,
    language: r.language,
    stars: r.stargazers_count,
    color: PALETTE[i % PALETTE.length],
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
