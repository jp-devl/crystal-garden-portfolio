import { useEffect, useRef, useState, type CSSProperties } from "react";

type Chapter = {
  number: string;
  /** Período documentado. null enquanto o usuário não confirmar a data real. */
  period: string | null;
  dateOrder: number;
  title: string;
  text: string;
};

/** Textos aprovados preservados; nenhum ano/período foi inventado. */
const CHAPTER_DATA: Chapter[] = [
  {
    number: "01",
    period: null,
    dateOrder: 1,
    title: "Formação técnica",
    text: "Técnico em Informática pelo SENAI — fundamentos de sistemas, redes e computadores.",
  },
  {
    number: "02",
    period: null,
    dateOrder: 2,
    title: "Experiência em TI",
    text: "Vivência com suporte técnico, manutenção e infraestrutura de tecnologia.",
  },
  {
    number: "03",
    period: null,
    dateOrder: 3,
    title: "Próximo capítulo",
    text: "Graduação na FASEC e desenvolvimento profissional direcionado à Segurança da Informação.",
  },
];

const CHAPTERS = [...CHAPTER_DATA].sort((a, b) => a.dateOrder - b.dateOrder);

/** viewBox normalizado: os marcadores usam exatamente estes pontos do path. */
const VARIANTS = {
  desktop: {
    id: "desktop",
    path: "M 50 0 C 50 7, 22 8, 22 16.667 C 22 27, 78 39, 78 50 C 78 61, 25 72, 25 83.333 C 25 92, 50 93, 50 100",
    markers: [{ x: 22, y: 16.667 }, { x: 78, y: 50 }, { x: 25, y: 83.333 }],
  },
  mobile: {
    id: "mobile",
    path: "M 18 0 C 18 6, 11 10, 11 16.667 C 11 27, 17 38, 15 50 C 13 62, 11 72, 12 83.333 C 13 92, 20 95, 20 100",
    markers: [{ x: 11, y: 16.667 }, { x: 15, y: 50 }, { x: 12, y: 83.333 }],
  },
} as const;

type ChapterState = "idle" | "active" | "done";

const stateOf = (index: number, active: number): ChapterState =>
  index === active ? "active" : index < active ? "done" : "idle";

const markerStyle = (index: number): CSSProperties => ({
  left: `var(--marker-${index}-x)`,
  top: `var(--marker-${index}-y)`,
});

/**
 * Descobre em qual fração do comprimento do path cada marcador está.
 * Assim a revelação acompanha o desenho real da curva, não uma estimativa.
 */
const sampleMarkerFractions = (path: SVGPathElement, markers: readonly { x: number; y: number }[]) => {
  const total = path.getTotalLength();
  if (!total) return null;
  return markers.map((marker) => {
    let best = 0;
    let distance = Number.POSITIVE_INFINITY;
    for (let sample = 0; sample <= 240; sample++) {
      const fraction = sample / 240;
      const point = path.getPointAtLength(total * fraction);
      const candidate = (point.x - marker.x) ** 2 + (point.y - marker.y) ** 2;
      if (candidate < distance) {
        distance = candidate;
        best = fraction;
      }
    }
    return best;
  });
};

export function TrajectoryTimeline({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const desktopSampleRef = useRef<SVGPathElement>(null);
  const mobileSampleRef = useRef<SVGPathElement>(null);
  const fractionsRef = useRef<number[]>([1 / 3, 1 / 2, 2 / 3]);
  const styledVariantRef = useRef("");
  const sampledVariantRef = useRef("");
  const lockRef = useRef(0);
  const [fractions, setFractions] = useState<number[]>([1 / 3, 1 / 2, 2 / 3]);
  const [active, setActive] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    if (!root || !body) return;

    let frame = 0;
    let retryFrame = 0;
    let retries = 0;
    let disposed = false;
    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const measure = () => {
      frame = 0;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const variant = mobile ? VARIANTS.mobile : VARIANTS.desktop;
      // O path base não tem pathLength; é a referência geométrica real para amostrar.
      const path = mobile ? mobileSampleRef.current : desktopSampleRef.current;

      if (styledVariantRef.current !== variant.id) {
        styledVariantRef.current = variant.id;
        root.dataset.variant = variant.id;
        variant.markers.forEach((marker, index) => {
          root.style.setProperty(`--marker-${index}-x`, `${marker.x}%`);
          root.style.setProperty(`--marker-${index}-y`, `${marker.y}%`);
        });
      }

      // getTotalLength pode ainda ser zero na primeira passagem; tenta de novo
      // nos frames seguintes até a geometria estar disponível.
      if (sampledVariantRef.current !== variant.id) {
        const fractions = path ? sampleMarkerFractions(path, variant.markers) : null;
        if (fractions) {
          fractionsRef.current = fractions;
          setFractions(fractions);
          sampledVariantRef.current = variant.id;
        }
      }

      const rect = body.getBoundingClientRect();
      const marker = window.innerHeight * 0.5;
      // Progresso real da seção: da entrada da curva à saída, sem valores fixos.
      const progress = reduced
        ? 1
        : clamp01((marker - rect.top) / Math.max(1, rect.height));

      root.style.setProperty("--trajectory-progress", progress.toFixed(4));
      root.style.setProperty("--trajectory-offset", (100 - progress * 100).toFixed(2));

      // Durante a navegação por botão/teclado, mantém o destino até a rolagem terminar.
      if (performance.now() > lockRef.current) {
        const reached = fractionsRef.current.reduce(
          (count, fraction) => (progress + 0.001 >= fraction ? count + 1 : count),
          0,
        );
        setRevealedCount((current) => Math.max(current, reached));
        const next = Math.max(0, reached - 1);
        setActive((current) => (current === next ? current : next));
      }
    };

    const requestMeasure = () => {
      if (disposed || frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(requestMeasure);
    resizeObserver?.observe(body);

    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    document.fonts?.ready.then(requestMeasure).catch(() => {});
    measure();

    // A geometria do SVG pode não estar disponível no primeiro frame.
    const retrySample = () => {
      if (disposed || retries++ > 30) return;
      const id = window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
      if (sampledVariantRef.current === id) return;
      measure();
      retryFrame = window.requestAnimationFrame(retrySample);
    };
    retryFrame = window.requestAnimationFrame(retrySample);

    return () => {
      disposed = true;
      if (retryFrame) window.cancelAnimationFrame(retryFrame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frame) window.cancelAnimationFrame(frame);
      root.style.removeProperty("--trajectory-progress");
      root.style.removeProperty("--trajectory-offset");
      for (let index = 0; index < CHAPTERS.length; index++) {
        root.style.removeProperty(`--marker-${index}-x`);
        root.style.removeProperty(`--marker-${index}-y`);
      }
      delete root.dataset.variant;
      styledVariantRef.current = "";
      sampledVariantRef.current = "";
    };
  }, [reduced]);

  const goTo = (index: number) => {
    const body = bodyRef.current;
    if (!body) return;
    const fraction = fractionsRef.current[index] ?? (index + 1) / 3;
    const top = body.getBoundingClientRect().top + window.scrollY
      + body.offsetHeight * fraction - window.innerHeight * 0.5;
    lockRef.current = performance.now() + (reduced ? 120 : 1000);
    setActive(index);
    setRevealedCount((current) => Math.max(current, index + 1));
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="trajectory" ref={rootRef} data-variant="desktop">
      <div className="trajectory-controls">
        <div className="trajectory-nav" role="group" aria-label="Navegar pelos capítulos da trajetória">
          {CHAPTERS.map((chapter, index) => (
            <button
              key={chapter.number}
              type="button"
              className="trajectory-nav-button"
              data-state={stateOf(index, active)}
              aria-current={index === active ? "step" : undefined}
              aria-label={`Ir para o capítulo ${chapter.number}: ${chapter.title}`}
              onClick={() => goTo(index)}
            >
              {chapter.number}
            </button>
          ))}
        </div>
        <p className="trajectory-indicator" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true">{CHAPTERS[active].number} / 03</span>
          <span className="sr-only">Capítulo {CHAPTERS[active].number} de 03: {CHAPTERS[active].title}</span>
        </p>
      </div>

      <div className="trajectory-body" ref={bodyRef}>
        <svg className="trajectory-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path ref={desktopSampleRef} className="trajectory-path-base trajectory-path-desktop" d={VARIANTS.desktop.path} />
          <path ref={mobileSampleRef} className="trajectory-path-base trajectory-path-mobile" d={VARIANTS.mobile.path} />
          <path className="trajectory-path trajectory-path-desktop" d={VARIANTS.desktop.path} pathLength={100} />
          <path className="trajectory-path trajectory-path-mobile" d={VARIANTS.mobile.path} pathLength={100} />
        </svg>

        <ol className="trajectory-list">
          {CHAPTERS.map((chapter, index) => {
            const revealed = index < revealedCount;
            return (
              <li
                key={chapter.number}
                className="trajectory-step"
                data-trajectory-step
                data-side={index % 2 === 0 ? "right" : "left"}
                data-state={stateOf(index, active)}
                data-revealed={revealed}
                data-reveal-at={fractions[index]?.toFixed(4)}
              >
                <span className="trajectory-marker" style={markerStyle(index)} data-revealed={revealed} data-active={index === active} aria-hidden="true">
                  <span className="trajectory-marker-core" />
                </span>
                <div className="trajectory-card">
                  <span className="trajectory-number" aria-hidden="true">{chapter.number}</span>
                  {chapter.period ? <span className="trajectory-period">{chapter.period}</span> : null}
                  <h4 className="trajectory-title">{chapter.title}</h4>
                  <p className="trajectory-copy">{chapter.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
