import EXPERIENCE from "../data/experience.js";
import Reveal from "./Reveal.jsx";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>Experience</h2>
          <p>Client work, an internship, and two years of production C++ before grad school.</p>
        </Reveal>
        <div className="timeline">
          {EXPERIENCE.map((job) => (
            <Reveal as="article" className={`job ${job.end === "Present" ? "current" : ""}`} key={job.company}>
              <div className="when">
                {job.start}
                <br />
                {job.end}
              </div>
              <div className="node" aria-hidden="true" />
              <div>
                <h3>{job.role}</h3>
                <div className="company">
                  {job.company} <span>· {job.location}</span>
                </div>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b.slice(0, 32)}>{b}</li>
                  ))}
                </ul>
                <div className="tech">
                  {job.tech.map((t) => (
                    <span className="pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
