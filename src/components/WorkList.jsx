import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PROJECTS, EARLIER } from "../data/projects.js";
import DemoFrame from "./DemoFrame.jsx";
import Reveal from "./Reveal.jsx";

export function OutLinks({ live, code, detail }) {
  return (
    <div className="links">
      {detail && (
        <Link className="primary" to={detail}>
          Case study →
        </Link>
      )}
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer">
          Live ↗
        </a>
      )}
      {code && (
        <a href={code} target="_blank" rel="noopener noreferrer">
          Code ↗
        </a>
      )}
    </div>
  );
}

OutLinks.propTypes = {
  live: PropTypes.string,
  code: PropTypes.string,
  detail: PropTypes.string,
};

export default function WorkList() {
  return (
    <section id="work">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>Selected work</h2>
          <p>Each card is a small working sketch of the real thing. Open a case study for the problem, the approach, and what it changed.</p>
        </Reveal>

        {PROJECTS.map((p, i) => (
          <Reveal
            as="article"
            className={`work-row ${i % 2 ? "flip" : ""}`}
            key={p.slug}
            style={{ "--demo-accent": p.accent }}
          >
            <div className="demo-col">
              <Link to={`/work/${p.slug}`} aria-label={`Open ${p.name}`}>
                <DemoFrame project={p} />
              </Link>
            </div>
            <div className="text-col">
              <span className="index mono">
                {String(i + 1).padStart(2, "0")} · {p.year}
              </span>
              <h3>
                <Link to={`/work/${p.slug}`}>{p.name}</Link>
              </h3>
              <div className="tag">{p.tag}</div>
              <p className="desc">{p.description}</p>
              <div className="tech">
                {p.tech.map((t) => (
                  <span className="pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <OutLinks live={p.live} code={p.code} detail={`/work/${p.slug}`} />
            </div>
          </Reveal>
        ))}

        <Reveal as="ul" className="earlier">
          {EARLIER.map((p) => (
            <li key={p.name}>
              <span className="mono">{p.year}</span>
              <strong>{p.name}</strong>
              {p.description}
              <OutLinks live={p.live} code={p.code} />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
