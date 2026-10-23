import EDUCATION from "../data/education.js";
import SKILLS from "../data/skills.js";

export default function Background() {
  return (
    <section id="background">
      <div className="wrap">
        <h2 className="section-label">Education and skills</h2>
        <div className="two-col">
          <ul className="edu">
            {EDUCATION.map((e) => (
              <li key={e.school}>
                <div className="degree">{e.degree}</div>
                <div className="school">{e.school}</div>
                <div className="meta">
                  {e.when} · {e.note}
                </div>
              </li>
            ))}
          </ul>
          <div className="skills">
            <dl>
              {SKILLS.map((s) => (
                <div key={s.group}>
                  <dt>{s.group}</dt>
                  <dd>{s.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
