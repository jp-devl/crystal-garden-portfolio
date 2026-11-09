import { Github, X } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCard({ project, onClose }: ProjectCardProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-4">
      <div className="glass-card pointer-events-auto w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 rounded-2xl p-6 duration-300">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="mb-2 block h-1 w-10 rounded-full" style={{ backgroundColor: project.color }} />
            <h2 className="font-mono text-xl font-semibold text-foreground">{project.name}</h2>
            <p className="mt-2 line-clamp-4 text-sm text-muted-foreground">{project.description}</p>
            {(project.language || project.stars > 0) && (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {project.language}
                {project.language && project.stars > 0 && " · "}
                {project.stars > 0 && `★ ${project.stars}`}
              </p>
            )}
          </div>
          <button onClick={onClose} aria-label="Fechar" className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105"
        >
          <Github className="h-4 w-4" /> Ver no GitHub
        </a>
      </div>
    </div>
  );
}
