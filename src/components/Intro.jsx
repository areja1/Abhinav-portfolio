import PROFILE from "../data/profile.js";

export default function Intro() {
  return (
    <section className="intro" id="top">
      <div className="wrap intro-grid">
        <div>
          <h1>{PROFILE.headline}</h1>
          {PROFILE.intro.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          <div className="links">
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
              Resume (PDF)
            </a>
          </div>
          <p className="elsewhere">{PROFILE.elsewhere}</p>
        </div>
        <img
          className="photo"
          src={PROFILE.photo}
          alt={`${PROFILE.name}, smiling, in a navy suit`}
          width="152"
          height="190"
        />
      </div>
    </section>
  );
}
