import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const STEPS = [
  "Pick a topic and a city project from the knowledge base",
  "Codex writes the draft locally, no API calls",
  "Fact check: every claim must match PCC's approved facts",
  "Style check: no em dashes or AI phrasing",
  "A person reviews, edits and approves",
  "Zernio schedules it on each platform",
];

const PLATFORMS = ["LinkedIn", "Instagram", "Facebook", "X"];

export default function PostFlowDemo() {
  const [ref, step] = useLoop(STEPS.length + 2, 950, 2800);
  const scheduled = step >= STEPS.length;
  return (
    <div ref={ref} className="steps compact">
      <div className="title">
        <span>Draft · Tacoma project spotlight</span>
        <span className="mono">
          {Math.min(step, STEPS.length)}/{STEPS.length}
        </span>
      </div>
      {STEPS.map((s, i) => (
        <div className={`step ${i < step ? "done" : i === step ? "active" : ""}`} key={s}>
          <i>{i < step ? "✓" : ""}</i>
          <span>{s}</span>
        </div>
      ))}
      <div className="plats">
        {PLATFORMS.map((p) => (
          <span key={p} className={`plat ${scheduled ? "on" : ""}`}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

PostFlowDemo.propTypes = { accent: PropTypes.string };
