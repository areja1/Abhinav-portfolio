import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const STEPS = [
  "Ask the hospital for an itemized bill and a financial assistance form",
  "Check Medicaid retroactive coverage (90 days in Arizona)",
  "Request a payment plan before the bill goes to collections",
  "Draw $300 from your circle's emergency pool",
  "Set a reminder: appeal window closes in 30 days",
];

export default function CrisisDemo() {
  const [ref, step] = useLoop(STEPS.length + 2, 950, 2800);
  return (
    <div ref={ref} className="steps">
      <div className="title">
        <span>Crisis Mode · ER visit, uninsured</span>
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
      <span className="demo-note">also in Spanish · guidance by Claude</span>
    </div>
  );
}

CrisisDemo.propTypes = { accent: PropTypes.string };
