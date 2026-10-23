import PropTypes from "prop-types";
import PROFILE from "../data/profile.js";
import useCountUp from "../hooks/useCountUp.js";
import useInView from "../hooks/useInView.js";

function Stat({ stat, start, delay }) {
  const v = useCountUp(stat.value, start);
  const text = stat.decimals
    ? v.toFixed(stat.decimals)
    : Math.round(v).toLocaleString("en-US");
  return (
    <div className="stat reveal in" style={{ transitionDelay: `${delay}ms` }}>
      <div className="num">
        {stat.prefix || ""}
        {text}
        {stat.suffix || ""}
      </div>
      <div>
        <div className="label">{stat.label}</div>
        <div className="src mono">{stat.source}</div>
      </div>
    </div>
  );
}

Stat.propTypes = {
  stat: PropTypes.object.isRequired,
  start: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
};

export default function Hero() {
  const [ref, inView] = useInView(0.2);
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <div className="kicker">
            {PROFILE.openToWork && <span className="pulse" aria-hidden="true" />}
            <span className="mono">
              {PROFILE.role} · {PROFILE.location}
            </span>
          </div>
          <h1>
            {PROFILE.headline.map((line) => (
              <span className="line" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="lede">{PROFILE.intro[0]}</p>
          <div className="meta">
            {PROFILE.openToWork && (
              <span className="chip">
                <span className="pulse" aria-hidden="true" /> Open to full time roles
              </span>
            )}
            <a className="chip" href="#work">
              Selected work ↓
            </a>
            <a className="chip" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="chip" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="chip" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
          </div>
        </div>
        <div className="stats" ref={ref} aria-label="Numbers from recent work">
          {PROFILE.stats.map((s, i) => (
            <Stat key={s.label} stat={s} start={inView} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
