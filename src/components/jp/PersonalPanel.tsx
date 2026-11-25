import { Reveal } from "@/components/jp/Reveal";
import { AREAS, EDUCATION } from "@/data/profile";

const FOCUS_AREAS = ["Tecnologia", "Infraestrutura", "Segurança da Informação"];

export function PersonalPanel() {
  return (
    <div className="grid items-start gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
      <Reveal className="story-media personal-media">
        <div className="story-frame personal-portrait">
          <div className="personal-portrait-window">
            <img
              src="/images/joao-pedro.jpg"
              alt="Retrato de João Pedro"
              className="personal-portrait-image"
            />
          </div>

          <div className="personal-portrait-plate">
            <span className="personal-plate-label">LOCALIZAÇÃO</span>
            <span className="personal-plate-value">Palmas — TO</span>
          </div>
        </div>

        <span className="personal-signature">JP · DIGITAL UNIVERSE</span>
      </Reveal>

      <div className="space-y-8">
        <Reveal delay={100}>
          <span className="font-mono text-xs tracking-[0.3em] text-sunset">QUEM SOU EU</span>
          <h2 className="story-title mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <span className="line"><span>Tecnologia,</span></span>
            <span className="line"><span>curiosidade e</span></span>
            <span className="line"><span>vontade de <em className="font-serif-it font-normal text-sunset">evoluir.</em></span></span>
          </h2>
        </Reveal>

        <div className="max-w-xl space-y-5 text-muted-foreground">
          <Reveal delay={200}>
            <p>
              Minha trajetória na tecnologia começou na formação técnica em informática, onde desenvolvi uma base em sistemas, redes e computadores.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p>
              A experiência com suporte e manutenção ampliou minha visão sobre tecnologia e me ensinou a compreender problemas a partir das necessidades de quem utiliza os sistemas.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-foreground">
              Atualmente, sigo minha formação na FASEC, explorando desenvolvimento, infraestrutura e Segurança da Informação, área na qual desejo construir minha carreira.
            </p>
          </Reveal>
        </div>

        <Reveal delay={450} className="personal-metrics">
          <div className="personal-metric">
            <strong className="personal-metric-value">{String(AREAS.length).padStart(2, "0")}</strong>
            <span className="personal-metric-label">frentes de atuação</span>
          </div>
          <div className="personal-metric">
            <strong className="personal-metric-value">{String(EDUCATION.length).padStart(2, "0")}</strong>
            <span className="personal-metric-label">formações</span>
          </div>
          <div className="personal-metric">
            <strong className="personal-metric-value">01</strong>
            <span className="personal-metric-label">foco atual</span>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="personal-areas" role="list" aria-label="Áreas de atuação">
            {FOCUS_AREAS.map((area) => (
              <div className="personal-area" role="listitem" key={area}>
                <span className="personal-area-mark" aria-hidden="true" />
                <span className="personal-area-name">{area}</span>
                <span className="personal-area-rule" aria-hidden="true" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
