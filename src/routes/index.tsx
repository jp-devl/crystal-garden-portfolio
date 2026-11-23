import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";

import { Reveal } from "@/components/jp/Reveal";
import { AREAS, EDUCATION, FEATURED, PROFILE } from "@/data/profile";

const JPEmblem = lazy(() => import("@/components/jp/JPEmblem"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "João Pedro — JP Digital Universe" },
      { name: "description", content: "Portfólio de João Pedro: desenvolvimento de software, tecnologia, infraestrutura e Segurança da Informação. Palmas, Tocantins." },
      { property: "og:title", content: "João Pedro — JP Digital Universe" },
      { property: "og:description", content: "Desenvolvimento de software, infraestrutura e Segurança da Informação. Conheça os projetos NextTI e DocFly." },
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
    <Reveal className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-sand">
      <span className="text-sunset">{n}</span><span className="h-px w-12 bg-sand/40" />{children}
    </Reveal>
  );
}

function Home() {
  const reduced = useReducedMotion();
  return (
    <div className="relative overflow-x-clip bg-background text-foreground">
      <div className="grain pointer-events-none fixed inset-0 z-50" aria-hidden />

      <nav className="fixed inset-x-0 top-4 z-40 flex justify-center px-3">
        <ul className="nav-pill flex max-w-full items-center gap-1 overflow-x-auto rounded-full px-2 py-1.5 text-xs sm:text-sm">
          <li className="hidden px-3 font-display font-bold tracking-tight text-sunset sm:block">JP</li>
          {NAV.map(([href, label]) => (
            <li key={href}><a href={href} className="nav-link block whitespace-nowrap rounded-full px-3 py-1.5">{label}</a></li>
          ))}
        </ul>
      </nav>

      <main>
        {/* HERO */}
        <section id="inicio" className="hero-bg relative min-h-dvh overflow-hidden pt-24">
          <div className="sun-glow" aria-hidden />
          <h1 className="intro relative z-10 select-none px-4 text-center font-display font-extrabold uppercase leading-[0.82] tracking-tighter text-foreground"
            style={{ fontSize: "clamp(3.4rem, 15vw, 15rem)" }}>
            <span className="block">João</span>
            <span className="text-outline block">Pedro</span>
          </h1>

          <div className="relative z-20 mx-auto -mt-[14vw] flex w-full max-w-6xl flex-col items-center px-4 md:-mt-[11vw]">
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
        <section id="sobre" className="section-warm relative px-6 py-28 md:py-40">
          <div className="mx-auto max-w-6xl">
            <SectionLabel n="01">Sobre mim</SectionLabel>
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
              <Reveal as="h2" className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Do suporte técnico à criação de <em className="font-serif-it text-sunset">soluções digitais</em>.
              </Reveal>
              <div className="space-y-6 text-muted-foreground md:pt-4">
                <Reveal delay={100}><p>Minha trajetória na tecnologia começou na formação técnica em informática, onde aprendi os fundamentos de sistemas, redes e computadores.</p></Reveal>
                <Reveal delay={200}><p>As experiências com suporte e manutenção me ensinaram a entender problemas a partir de quem usa a tecnologia — e despertaram meu interesse em desenvolver soluções que facilitem o dia a dia das pessoas.</p></Reveal>
                <Reveal delay={300}><p className="text-foreground">Hoje sigo esse caminho na graduação, unindo desenvolvimento, infraestrutura e Segurança da Informação.</p></Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* CONHECIMENTOS */}
        <section id="conhecimentos" className="relative px-6 py-28 md:py-40">
          <div className="mx-auto max-w-6xl">
            <SectionLabel n="02">Conhecimentos</SectionLabel>
            <div className="border-t border-sand/20">
              {AREAS.map((a, i) => (
                <Reveal key={a.n} delay={i * 120} className="area-row group grid gap-4 border-b border-sand/20 py-10 md:grid-cols-[6rem_1.2fr_1fr] md:items-center">
                  <span className="font-mono text-sm text-sunset">{a.n}</span>
                  <h3 className="font-display text-3xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">{a.title}</h3>
                  <p className="text-muted-foreground">{a.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="section-warm relative px-6 py-28 md:py-40">
          <div className="mx-auto max-w-6xl">
            <SectionLabel n="03">Projetos</SectionLabel>
            <div className="space-y-10">
              {FEATURED.map((p, i) => (
                <Reveal key={p.name} delay={80}>
                  <article className="project-card group relative overflow-hidden rounded-[2rem] p-8 md:p-14">
                    <span className="pointer-events-none absolute -right-4 -top-10 font-display text-[10rem] font-extrabold leading-none text-sunset/10 md:text-[16rem]" aria-hidden>0{i + 1}</span>
                    <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr]">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sunset">{p.tag}</p>
                        <h3 className="mt-4 font-display text-5xl font-extrabold tracking-tight md:text-7xl">{p.name}</h3>
                        <p className="mt-6 max-w-lg text-muted-foreground">{p.description}</p>
                      </div>
                      <div className="flex flex-col justify-between gap-8">
                        <div>
                          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">Tecnologias</p>
                          <ul className="flex flex-wrap gap-2">
                            {p.stack.map((s) => <li key={s} className="rounded-full border border-sand/30 px-3 py-1 text-sm">{s}</li>)}
                          </ul>
                        </div>
                        <a href={p.url} target="_blank" rel="noreferrer" className="btn-sun self-start">
                          <Github className="h-4 w-4" /> Ver repositório <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-sand/20 pt-8">
              <p className="text-muted-foreground">Quer ver todos os repositórios públicos em uma cena 3D?</p>
              <Link to="/universo" className="btn-ghost">Abrir o Universo 3D <ArrowUpRight className="h-4 w-4" /></Link>
            </Reveal>
          </div>
        </section>

        {/* FORMAÇÃO */}
        <section id="formacao" className="relative px-6 py-28 md:py-40">
          <div className="mx-auto max-w-6xl">
            <SectionLabel n="04">Formação</SectionLabel>
            <div className="grid gap-px overflow-hidden rounded-[2rem] bg-sand/20 md:grid-cols-2">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.place} delay={i * 150} className="bg-background p-10 md:p-14">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-steel">{e.title}</p>
                  <p className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">{e.place}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="contact-bg relative overflow-hidden px-6 py-28 md:py-40">
          <div className="sun-glow sun-glow-low" aria-hidden />
          <div className="relative mx-auto max-w-6xl">
            <SectionLabel n="05">Contato</SectionLabel>
            <Reveal as="h2" className="font-display font-extrabold uppercase leading-[0.9] tracking-tighter" >
              <span style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}>Vamos <span className="font-serif-it normal-case text-sunset">conversar</span>?</span>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <Reveal delay={0}><a href={`mailto:${PROFILE.email}`} className="contact-link"><Mail className="h-5 w-5 text-sunset" /><span className="break-all">{PROFILE.email}</span></a></Reveal>
              <Reveal delay={120}><a href={PROFILE.github} target="_blank" rel="noreferrer" className="contact-link"><Github className="h-5 w-5 text-sunset" />github.com/jp-devl</a></Reveal>
              <Reveal delay={240}><p className="contact-link"><MapPin className="h-5 w-5 text-sunset" />{PROFILE.location}</p></Reveal>
            </div>
            <p className="mt-24 font-mono text-xs uppercase tracking-[0.3em] text-sand">© {PROFILE.brand} — {PROFILE.fullName}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

