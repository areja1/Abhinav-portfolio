import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PROJECTS, bySlug } from "../data/projects.js";
import PROFILE from "../data/profile.js";
import DemoFrame from "../components/DemoFrame.jsx";
import Reveal from "../components/Reveal.jsx";
import { OutLinks } from "../components/WorkList.jsx";

export default function ProjectPage() {
  const { slug } = useParams();
  const p = bySlug(slug);

  useEffect(() => {
    document.title = p ? `${p.name} · ${PROFILE.name}` : PROFILE.name;
    return () => {
      document.title = PROFILE.name;
    };
  }, [p]);

  if (!p) return <Navigate to="/" replace />;

  const i = PROJECTS.indexOf(p);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <main style={{ "--demo-accent": p.accent }}>
      <section className="project-hero">
        <div className="wrap">
          <Link className="back" to="/#work">
            ← All work
          </Link>
          <div className="mono" style={{ color: p.accent }}>
            {p.tag} · {p.year}
          </div>
          <h1>{p.name}</h1>
          <p className="lede">{p.description}</p>
          <div className="tech" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "1.2rem 0" }}>
            {p.tech.map((t) => (
              <span className="pill" key={t}>
                {t}
              </span>
            ))}
          </div>
          <OutLinks live={p.live} code={p.code} />
        </div>
      </section>

      <section className="project-demo" style={{ padding: "0 0 4rem" }}>
        <div className="wrap">
          <Reveal>
            <DemoFrame project={p} tall label={`${p.slug} · sketch`} />
          </Reveal>
        </div>
      </section>

      <section className="case" style={{ padding: "0 0 5rem" }}>
        <div className="wrap">
          <h2>Problem</h2>
          <div className="body">
            <p>{p.caseStudy.problem}</p>
          </div>
          <div className="divider" />
          <h2>Approach</h2>
          <div className="body">
            <ol>
              {p.caseStudy.approach.map((a) => (
                <li key={a.slice(0, 32)}>{a}</li>
              ))}
            </ol>
          </div>
          <div className="divider" />
          <h2>Result</h2>
          <div className="body">
            <div className="result">{p.caseStudy.result}</div>
          </div>
        </div>
      </section>

      <nav className="pager" aria-label="Other projects" style={{ padding: "0 0 5rem" }}>
        <div className="wrap">
          <Link to={`/work/${prev.slug}`}>
            <span className="mono">← Previous</span>
            <strong>{prev.name}</strong>
          </Link>
          <Link className="next" to={`/work/${next.slug}`}>
            <span className="mono">Next →</span>
            <strong>{next.name}</strong>
          </Link>
        </div>
      </nav>
    </main>
  );
}
