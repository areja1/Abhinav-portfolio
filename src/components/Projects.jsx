import PropTypes from "prop-types";
import { PROJECTS, EARLIER } from "../data/projects.js";

function OutLinks({ live, code, className = "out" }) {
  if (!live && !code) return null;
  return (
    <span className={className}>
      {live && (
        <a href={live} target="_blank" rel="noopener noreferrer">
          Live
        </a>
      )}
      {code && (
        <a href={code} target="_blank" rel="noopener noreferrer">
          Code
        </a>
      )}
    </span>
  );
}

OutLinks.propTypes = {
  live: PropTypes.string,
  code: PropTypes.string,
  className: PropTypes.string,
};

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <h2 className="section-label">Projects</h2>

        {PROJECTS.map((p) => (
          <article className="project" key={p.name}>
            <div className="head">
              <h3>{p.name}</h3>
              <span className="year">{p.year}</span>
            </div>
            <div className="tag">{p.tag}</div>
            <p className="desc">{p.description}</p>
            <div className="tech">{p.tech.join(" · ")}</div>
            <OutLinks live={p.live} code={p.code} />
          </article>
        ))}

        <div className="earlier">
          <h3>Earlier</h3>
          <ul>
            {EARLIER.map((p) => (
              <li key={p.name}>
                <span className="year">{p.year}</span>
                <span>
                  <strong>{p.name}.</strong> {p.description}
                  <OutLinks live={p.live} code={p.code} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
