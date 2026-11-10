import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PortfolioScene } from "@/components/portfolio/PortfolioScene";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { GITHUB_USERNAME, fetchGitHubProjects, type Project } from "@/data/projects";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Portfólio 3D — Projetos GitHub" },
      { name: "description", content: "Portfólio 3D interativo com cristais que representam projetos do GitHub." },
      { property: "og:title", content: "Portfólio 3D — Projetos GitHub" },
      { property: "og:description", content: "Explore projetos do GitHub em uma cena 3D interativa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selected, setSelected] = useState<Project | null>(null);
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: () => fetchGitHubProjects(GITHUB_USERNAME),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-x-0 bottom-0 top-40 md:top-44">
        {projects.length > 0 && (
          <PortfolioScene
            key={projects.length}
            projects={projects}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
            onClear={() => setSelected(null)}
          />
        )}
      </div>
      <header className="pointer-events-none absolute left-0 top-0 z-10 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">@{GITHUB_USERNAME}</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-5xl">Projetos em 3D</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {projects.length > 0
            ? `${projects.length} repositórios. Arraste para girar, clique em um cristal.`
            : "Arraste para girar a cena. Clique em um cristal para ver o projeto."}
        </p>
      </header>

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="glass-card animate-pulse rounded-full px-4 py-2 font-mono text-xs text-muted-foreground">Carregando...</p>
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="glass-card rounded-xl px-4 py-3 text-sm text-muted-foreground">Não foi possível carregar os projetos do GitHub agora.</p>
        </div>
      )}

      {selected && <ProjectCard project={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
