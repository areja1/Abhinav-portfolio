import PROFILE from "../data/profile.js";
import EDUCATION from "../data/education.js";
import SKILLS from "../data/skills.js";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <>
      <section className="about" id="about">
        <div className="wrap">
          <Reveal>
            <div className="sec-head" style={{ marginBottom: "2rem" }}>
              <h2>About</h2>
            </div>
            {PROFILE.intro.map((p) => (
              <p className="bio" key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
            <p className="elsewhere">{PROFILE.elsewhere}</p>
            <ul className="edu">
              {EDUCATION.map((e) => (
                <li key={e.school}>
                  <div className="degree">{e.degree}</div>
                  <div className="school">{e.school}</div>
                  <div className="meta mono">
                    {e.when} · {e.note}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="photo-wrap" delay={120}>
            <img className="photo" src={PROFILE.photo} alt={`${PROFILE.name}`} width="480" height="600" />
            <span className="photo-cap mono">{PROFILE.location}</span>
          </Reveal>
        </div>
      </section>

      <section id="skills" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="skills-grid">
            {SKILLS.map((g) => (
              <div className="skill-cell" key={g.group}>
                <span className="mono">{g.group}</span>
                <ul>
                  {g.items.map((s) => (
                    <li className="pill" key={s}>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
