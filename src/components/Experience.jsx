import EXPERIENCE from "../data/experience.js";

export default function Experience() {
  return (
    <section id="work">
      <div className="wrap">
        <h2 className="section-label">Work</h2>
        {EXPERIENCE.map((job) => (
          <article className="job" key={`${job.company}-${job.start}`}>
            <div className="when">
              {job.start} to {job.end}
              <span className="place">{job.location}</span>
            </div>
            <div>
              <h3>{job.role}</h3>
              <div className="company">{job.company}</div>
              {job.summary && <p className="summary">{job.summary}</p>}
              <ul>
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 32)}>{b}</li>
                ))}
              </ul>
              <div className="tech">{job.tech.join(" · ")}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
