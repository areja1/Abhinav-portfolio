import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const QUERY = "coach de liderança para equipes de saúde, em português";
const RESULTS = [
  { who: "Mariana F.", where: "WIAL Brasil · São Paulo · healthcare, leadership", score: "0.91" },
  { who: "Rui C.", where: "WIAL Portugal · Lisboa · team coaching", score: "0.87" },
  { who: "Elena R.", where: "WIAL España · Madrid · healthcare · Portuguese fluent", score: "0.82" },
];

export default function SearchDemo() {
  const typeSteps = QUERY.length;
  const total = typeSteps + RESULTS.length + 2;
  const [ref, step] = useLoop(total, 55, 3200);
  const typed = QUERY.slice(0, Math.min(step, typeSteps));
  const shown = Math.max(0, step - typeSteps - 1);
  return (
    <div ref={ref} className="search">
      <div className="box">
        <span className="q">
          {typed}
          {step < typeSteps && <span className="cursor" style={{ marginLeft: 2 }} />}
        </span>
        {step >= typeSteps && <span className="lang">pt → 10+ languages</span>}
      </div>
      <div className="results">
        {RESULTS.slice(0, shown).map((r) => (
          <div className="result" key={r.who}>
            <span className="who">{r.who}</span>
            <span className="score">{r.score}</span>
            <span className="where">{r.where}</span>
          </div>
        ))}
      </div>
      <span className="demo-note">embeddings + pgvector · names fictional</span>
    </div>
  );
}

SearchDemo.propTypes = { accent: PropTypes.string };
