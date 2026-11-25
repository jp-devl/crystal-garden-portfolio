import type { CSSProperties } from "react";

import { Reveal } from "@/components/jp/Reveal";
import { AREAS, PROFILE } from "@/data/profile";

type Tech = {
  name: string;
  file: string;
};

/** Apenas tecnologias documentadas nos projetos ou no próprio portfólio. */
const TECH_BY_AREA: Record<string, Tech[]> = {
  "01": [
    { name: "Flutter", file: "flutter.svg" },
    { name: "Dart", file: "dart.svg" },
    { name: "SQLite", file: "sqlite.svg" },
    { name: "React", file: "react.svg" },
    { name: "TypeScript", file: "typescript.svg" },
    { name: "HTML5", file: "html5.svg" },
    { name: "CSS3", file: "css3.svg" },
  ],
  "02": [
    { name: "Windows", file: "windows.svg" },
    { name: "GitHub", file: "github.svg" },
    { name: "Three.js", file: "threedotjs.svg" },
    { name: "Tailwind CSS", file: "tailwindcss.svg" },
  ],
  "03": [],
};

const APPLICATION_BY_AREA: Record<string, string> = {
  "01": "Em Calculator · Lista de Tarefas · portfólio",
  "02": "Em Limpeza CMD Win10/11 · Universo 3D · interface",
  "03": "Direcionamento profissional",
};

function KnowledgeLabel() {
  return (
    <Reveal className="chapter-head mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-sand">
      <span className="chapter-index">02</span>
      <span className="chapter-rule" aria-hidden />
      <span className="chapter-name">Conhecimentos</span>
      <span className="chapter-note">{PROFILE.brand}</span>
    </Reveal>
  );
}

/**
 * O logotipo é decorativo: o nome ao lado já dá o nome acessível.
 * Assim o leitor de tela não repete a mesma informação duas vezes.
 */
function TechChip({ tech, index }: { tech: Tech; index: number }) {
  return (
    <li
      className="knowledge-tech"
      data-tech={tech.name}
      style={{ "--tech-i": index } as CSSProperties}
    >
      <img src={`/images/logos/${tech.file}`} alt="" aria-hidden="true" width={28} height={28} decoding="async" />
      <span>{tech.name}</span>
    </li>
  );
}

export function KnowledgeSection() {
  return (
    <section id="conhecimentos" data-chapter="conhecimentos" data-scroll-track className="paper-surface knowledge-section relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <KnowledgeLabel />

        <Reveal className="knowledge-intro max-w-2xl font-serif-it text-lg text-muted-foreground md:text-xl">
          Logotipos que aparecem nos projetos e na base técnica deste portfólio.
        </Reveal>

        <div className="knowledge-list border-t border-sand/20">
          {AREAS.map((area, rowIndex) => {
            const techs = TECH_BY_AREA[area.n] ?? [];

            return (
              <Reveal key={area.n} delay={rowIndex * 120} className="knowledge-row group border-b border-sand/20 py-10 md:py-12">
                <div className="knowledge-number font-mono" aria-hidden="true">{area.n}</div>

                <div className="knowledge-copy">
                  <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{area.title}</h3>
                  <p className="text-muted-foreground">{area.text}</p>
                  <p className="knowledge-application font-mono">{APPLICATION_BY_AREA[area.n]}</p>
                </div>

                {techs.length > 0 ? (
                  <ul className="knowledge-techs" aria-label={`Tecnologias de ${area.title}`}>
                    {techs.map((tech, techIndex) => (
                      <TechChip key={tech.name} tech={tech} index={techIndex} />
                    ))}
                  </ul>
                ) : (
                  <div className="knowledge-direction" aria-label="Direcionamento profissional em Segurança da Informação">
                    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                      <path d="M24 3.5 40 9.5v13.2c0 9.7-6.4 16.6-16 21.1-9.6-4.5-16-11.4-16-21.1V9.5L24 3.5Z" />
                      <path d="m17.5 24 4.5 4.5 9-9" />
                    </svg>
                    <span>Direcionamento profissional</span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
