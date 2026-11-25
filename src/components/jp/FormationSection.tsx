import { Reveal } from "@/components/jp/Reveal";
import { EDUCATION, PROFILE } from "@/data/profile";

const RECORD_LABEL = ["Registro 01", "Registro 02"];

const INSTITUTION_LOGOS = [
  { src: "/images/institutions/senai-logo.png", width: 112, height: 31 },
  { src: "/images/institutions/fasec-logo.png", width: 267, height: 92 },
];

function FormationLabel() {
  return (
    <Reveal className="chapter-head mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-sand">
      <span className="chapter-index">04</span>
      <span className="chapter-rule" aria-hidden />
      <span className="chapter-name">Formação</span>
      <span className="chapter-note">{PROFILE.brand}</span>
    </Reveal>
  );
}

export function FormationSection() {
  return (
    <section id="formacao" data-chapter="formacao" data-scroll-track className="paper-surface formation-section relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <FormationLabel />

        <div className="formation-stage relative">
          <span className="formation-ghost font-display" aria-hidden>04</span>

          <div className="formation-grid grid gap-5 md:grid-cols-2 md:gap-7">
            {EDUCATION.map((education, index) => {
              const titleId = `formation-title-${index}`;
              const logo = INSTITUTION_LOGOS[index];

              return (
                <Reveal key={education.place} delay={index * 170} className="formation-card">
                  <article className="formation-card-inner" aria-labelledby={titleId} data-formation={education.title}>
                    <div className="formation-card-top">
                      <span className="formation-card-index font-mono">{RECORD_LABEL[index]}</span>
                      <span className="formation-card-rule" aria-hidden />
                    </div>

                    <p className="formation-card-kicker font-mono">Formação</p>
                    <h3 id={titleId} className="formation-card-title font-display">{education.title}</h3>

                    <div className="formation-card-foot">
                      <div className="formation-card-brand">
                        <span className="formation-card-logo-slot">
                          <img
                            className="formation-card-logo"
                            src={logo.src}
                            alt=""
                            aria-hidden="true"
                            width={logo.width}
                            height={logo.height}
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                        <span className="formation-card-label font-mono">Instituição</span>
                      </div>
                      <p className="formation-card-place font-display">{education.place}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
