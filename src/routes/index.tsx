import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";

import { FormationSection } from "@/components/jp/FormationSection";
import { KnowledgeSection } from "@/components/jp/KnowledgeSection";
import { PersonalPanel } from "@/components/jp/PersonalPanel";
import { Reveal } from "@/components/jp/Reveal";
import { TrajectoryTimeline } from "@/components/jp/TrajectoryTimeline";
import { useScrollExperience } from "@/components/jp/useScrollExperience";
import { FEATURED, PROFILE } from "@/data/profile";

const JPEmblem = lazy(() => import("@/components/jp/JPEmblem"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "João Pedro — Portfólio Profissional" },
      { name: "description", content: "Portfólio de João Pedro: desenvolvimento de software, tecnologia, infraestrutura e Segurança da Informação. Palmas, Tocantins." },
      { property: "og:title", content: "João Pedro — Portfólio Profissional" },
      { property: "og:description", content: "Desenvolvimento de software, infraestrutura e Segurança da Informação. Conheça os projetos Calculator e Lista de Tarefas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const NAV = [
  ["#inicio", "Início"], ["#sobre", "Sobre"], ["#conhecimentos", "Conhecimentos"],
  ["#projetos", "Projetos"], ["#formacao", "Formação"], ["#contato", "Contato"],
] as const;

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const on = () => setR(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return r;
}

function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <Reveal className="chapter-head mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-sand">
      <span className="chapter-index">{n}</span>
      <span className="chapter-rule" aria-hidden />
      <span className="chapter-name">{children}</span>
      <span className="chapter-note">{PROFILE.brand}</span>
    </Reveal>
  );
}

function Home() {
  const reduced = useReducedMotion();
  useScrollExperience(reduced);

  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <div className="grain pointer-events-none fixed inset-0 z-50" aria-hidden />
      <div className="pointer-aura" aria-hidden />
      <div className="scroll-progress" aria-hidden><span /></div>

      <div className="chapter-rail" aria-hidden>
        {NAV.map(([href, label], i) => (
          <span key={href} className="rail-step" data-rail={href.slice(1)}>
            <span className="rail-dot" />
            <span className="rail-label">{String(i + 1).padStart(2, "0")} {label}</span>
          </span>
        ))}
      </div>

      <header className="site-header">
        <a href="#inicio" className="site-logo" aria-label="João Pedro — Portfólio Profissional — início">
          <span className="site-logo-mark">JP</span>
          <span className="site-logo-text"><span>{PROFILE.name}</span><small>{PROFILE.brand}</small></span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          <ul className="site-nav-list">
            {NAV.map(([href, label]) => (
              <li key={href}><a href={href} className="site-nav-link" data-nav>{label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" data-chapter="inicio" data-scroll-track className="hero-bg relative min-h-dvh overflow-hidden pt-24">
          <div className="sun-glow" aria-hidden />
          <h1
            className="hero-name intro relative z-30 select-none px-4 text-center"
            style={{ fontSize: "clamp(3.4rem, 15vw, 15rem)" }}
          >
            <span className="hero-name-main block">João</span>
            <span className="hero-name-script block">Pedro</span>
          </h1>

          <div className="relative z-20 mx-auto mt-4 flex w-full max-w-6xl flex-col items-center px-4 md:mt-6">
            <div className="intro intro-2 photo-arch relative w-[68vw] max-w-[360px] overflow-hidden">
              <img src="/images/joao-pedro.jpg" alt="Fotografia de João Pedro ao pôr do sol" className="h-full w-full object-cover" />
            </div>
            <div className="intro intro-3 pointer-events-auto absolute -right-4 bottom-[-5rem] h-[220px] w-[220px] sm:right-0 md:bottom-auto md:-right-4 md:top-[-6rem] md:h-[440px] md:w-[440px] lg:right-4">
              <ClientOnly fallback={null}>
                <Suspense fallback={null}><JPEmblem reduced={reduced} /></Suspense>
              </ClientOnly>
            </div>
          </div>

          <div className="relative z-20 mx-auto mt-8 grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <p className="intro intro-3 max-w-xs text-sm text-muted-foreground md:text-base">
              Desenvolvedor em formação, movido por tecnologia, infraestrutura e <span className="text-sunset">Segurança da Informação</span>.
            </p>
            <div className="intro intro-4 flex flex-wrap justify-center gap-3">
              <a href="#projetos" className="btn-sun">Explorar projetos <ArrowUpRight className="h-4 w-4" /></a>
              <a href="#sobre" className="btn-ghost">Minha trajetória</a>
            </div>
            <div className="intro intro-4 font-mono text-[11px] uppercase tracking-[0.25em] text-sand md:text-right">
              <p>{PROFILE.brand}</p><p className="mt-1 text-steel">10.18°S · 48.33°W — Palmas</p>
            </div>
          </div>
          <span className="float-tag left-[6%] top-[42%] hidden lg:block">&lt;dev /&gt;</span>
          <span className="float-tag float-delay right-[8%] top-[30%] hidden lg:block">infra · suporte</span>
          <span className="float-tag left-[12%] bottom-[22%] hidden lg:block">sec_ops</span>
        </section>
        {/* SOBRE */}
        <section id="sobre" data-chapter="sobre" data-scroll-track className="section-warm relative overflow-clip px-6 py-28 md:py-36">
          <div className="pointer-events-none absolute -left-40 top-40 h-[28rem] w-[28rem] rounded-full bg-sunset/10 blur-[130px]" aria-hidden />

          <div className="relative mx-auto max-w-6xl">
            <SectionLabel n="01">Sobre mim</SectionLabel>

            <PersonalPanel />

            <div className="timeline-block mt-28">
              <Reveal>
                <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs tracking-[0.3em] text-sunset">MINHA TRAJETÓRIA</span>
                    <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Aprendizado em movimento.</h3>
                  </div>
                </div>
              </Reveal>

              <TrajectoryTimeline reduced={reduced} />
            </div>
          </div>
        </section>

        {/* CONHECIMENTOS */}
        <KnowledgeSection />

        {/* PROJETOS */}
        <section id="projetos" data-chapter="projetos" data-scroll-track data-horizontal className="projects-section section-warm relative overflow-clip">
          <div className="projects-pin">
            <div className="projects-head mx-auto w-full max-w-6xl px-6">
              <SectionLabel n="03">Projetos</SectionLabel>
              <p className="projects-intro max-w-xl font-serif-it text-xl text-sand md:text-2xl">
                Cada projeto é uma janela para um problema que virou sistema.
              </p>
            </div>

            <div className="projects-viewport" data-horizontal-viewport>
              <div className="projects-track" data-horizontal-track>
                {FEATURED.map((p, i) => {
                  const coverSrc = p.cover;
                  const demoHref = p.demo;
                  return (
                    <Reveal key={p.name} delay={70 + i * 90} className="project-slot">
                      <article className={`project-panel group relative overflow-hidden rounded-[2rem] p-8 md:p-12${coverSrc ? " project-panel-cover" : ""}`} data-project-panel data-title={p.name}>
                        {coverSrc && (
                          <div className="project-cover-frame">
                            <img
                              src={coverSrc}
                              srcSet={p.coverSmall ? `${p.coverSmall} 1000w, ${coverSrc} 1600w` : undefined}
                              sizes="(max-width: 1023px) 100vw, 74vw"
                              alt={p.coverAlt ?? `Capa do projeto ${p.name}`}
                              width={1600}
                              height={640}
                              loading={i === 0 ? "eager" : "lazy"}
                              decoding="async"
                              className="project-cover-image"
                            />
                            <span className="project-cover-shade" aria-hidden="true" />
                          </div>
                        )}
                        <span className="project-ghost pointer-events-none absolute -right-6 -top-12 font-display text-[10rem] font-extrabold leading-none text-sunset/10 md:text-[15rem]" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                        <div className="project-panel-inner relative z-10 flex h-full flex-col justify-between gap-10">
                          <div>
                            <div className="project-panel-kicker flex flex-wrap items-center gap-3">
                              <p className="font-mono text-xs uppercase tracking-[0.3em] text-sunset">{p.tag}</p>
                              {coverSrc && <span className="project-cover-badge">Capa oficial do README</span>}
                            </div>
                            <h3 className="project-panel-title mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">{p.name}</h3>
                            <p className="project-panel-copy mt-6 max-w-lg text-muted-foreground">{p.description}</p>
                          </div>
                          <div className="space-y-6">
                            <div className="project-panel-stack">
                              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">Tecnologias</p>
                              <ul className="flex flex-wrap gap-2">
                                {p.stack.map((s) => <li key={s} className="rounded-full border border-sand/30 px-3 py-1 text-sm">{s}</li>)}
                              </ul>
                            </div>
                            <div className="project-panel-actions flex flex-wrap items-center gap-3">
                              <a href={p.url} target="_blank" rel="noreferrer" className="btn-sun self-start">
                                <Github className="h-4 w-4" /> Ver repositório <ArrowUpRight className="h-4 w-4" />
                              </a>
                              {demoHref && (
                                <a href={demoHref} target="_blank" rel="noreferrer" className="btn-ghost self-start">
                                  Ver demonstração <ArrowUpRight className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        {!coverSrc && p.mark && (
                          <div className="project-mark-frame">
                            <img
                              src={p.mark}
                              alt={p.markAlt ?? `Marca do projeto ${p.name}`}
                              width={900}
                              height={301}
                              loading="lazy"
                              decoding="async"
                              className="project-mark-image"
                            />
                          </div>
                        )}
                      </article>
                    </Reveal>
                  );
                })}

                <Reveal delay={70 + FEATURED.length * 90} className="project-slot">
                  <article className="project-panel project-panel-end group relative overflow-hidden rounded-[2rem] p-8 md:p-12" data-project-panel data-title="Universo 3D">
                    <span className="project-ghost pointer-events-none absolute -right-4 -top-12 font-display text-[10rem] font-extrabold leading-none text-sunset/10 md:text-[15rem]" aria-hidden>↗</span>
                    <div className="project-panel-inner relative flex h-full flex-col justify-between gap-10">
                      <div>
                        <p className="project-panel-kicker font-mono text-xs uppercase tracking-[0.3em] text-sunset">Além dos destaques</p>
                        <h3 className="project-panel-title mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">Universo 3D</h3>
                        <p className="project-panel-copy mt-6 max-w-lg text-muted-foreground">Quer ver todos os repositórios públicos em uma cena interativa?</p>
                      </div>
                      <div className="project-panel-actions">
                        <Link to="/universo" className="btn-ghost self-start">Abrir o Universo 3D <ArrowUpRight className="h-4 w-4" /></Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </div>
            </div>

            <div className="projects-footer mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pb-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sand">Faixa de projetos · {String(FEATURED.length).padStart(2, "0")} destaques</p>
              <p className="projects-caption font-display text-lg font-semibold" data-project-caption aria-live="polite">{FEATURED[0]?.name}</p>
            </div>
          </div>
        </section>

        {/* FORMAÇÃO */}
        <FormationSection />

        {/* CONTATO */}
        <section id="contato" data-chapter="contato" data-scroll-track className="contact-bg relative overflow-hidden px-6 py-28 md:py-40">
          <div className="sun-glow sun-glow-low" aria-hidden />
          <div className="contact-orbit" aria-hidden><span /><span /><span /></div>
          <div className="relative mx-auto max-w-6xl">
            <SectionLabel n="05">Contato</SectionLabel>
            <Reveal as="h2" className="contact-title font-display font-extrabold uppercase leading-[0.9] tracking-tighter">
              <span className="line contact-title-line">
                <span>Vamos <span className="font-serif-it normal-case text-sunset">conversar</span>?</span>
              </span>
            </Reveal>
            <div className="contact-layout mt-14 grid gap-12 md:grid-cols-2 md:gap-14">
              <div className="min-w-0">
                <div className="grid gap-6">
                  <Reveal delay={0}><a href={`mailto:${PROFILE.email}`} className="contact-link"><Mail className="h-5 w-5 text-sunset" /><span className="break-all">{PROFILE.email}</span></a></Reveal>
                  <Reveal delay={120}><a href={PROFILE.github} target="_blank" rel="noreferrer" className="contact-link"><Github className="h-5 w-5 text-sunset" />github.com/jp-devl</a></Reveal>
                  <Reveal delay={240}><p className="contact-link"><MapPin className="h-5 w-5 text-sunset" />{PROFILE.location}</p></Reveal>
                </div>
              </div>
              <Reveal delay={300} className="min-w-0">
                <div className="contact-map-frame">
                  <iframe
                    className="contact-map-iframe"
                    title="Mapa da região de Palmas, Tocantins — Brasil"
                    src="https://www.google.com/maps?q=Palmas%2C%20Tocantins%2C%20Brasil&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <span className="contact-map-badge" aria-hidden="true">JP · TO</span>
                </div>
                <div className="contact-map-caption">
                  <span>{PROFILE.location}</span>
                  <a href="https://www.google.com/maps/search/?api=1&query=Palmas%2C%20Tocantins%2C%20Brasil" target="_blank" rel="noreferrer" aria-label="Abrir Palmas, Tocantins — Brasil no Google Maps">
                    Abrir no Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </div>
            <p className="mt-24 font-mono text-xs uppercase tracking-[0.3em] text-sand">© {PROFILE.brand} — {PROFILE.fullName}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

