import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const CLAIMS = [
  {
    text: "“Churn dropped 12% after the pricing change.”",
    v: "verified",
    ev: "Matches Q3 metrics doc, p. 4: 11.8% decline.",
  },
  {
    text: "“The vendor contract auto renews in March.”",
    v: "contradicted",
    ev: "MSA §9.2: renews in January unless notice by Nov 30.",
  },
  {
    text: "“Competitor X launched the same feature last week.”",
    v: "uncertain",
    ev: "Web search: announcement found, no launch confirmed. Sent to human review.",
  },
];

const LABEL = { verified: "VERIFIED", contradicted: "CONTRADICTED", uncertain: "UNCERTAIN" };

export default function VerdictDemo() {
  const [ref, step] = useLoop(CLAIMS.length * 2 + 1, 900, 3000);
  return (
    <div ref={ref} className="claims">
      <div className="mono">meeting transcript · 3 claims extracted</div>
      {CLAIMS.map((c, i) => {
        const checking = step === i * 2 + 1;
        const done = step > i * 2 + 1;
        return (
          <div className="claim" key={c.text}>
            <span className="text">{c.text}</span>
            <span className={`v ${done ? c.v : ""}`}>{done ? LABEL[c.v] : checking ? "checking…" : "queued"}</span>
            <span className="ev">{done ? c.ev : ""}</span>
          </div>
        );
      })}
    </div>
  );
}

VerdictDemo.propTypes = { accent: PropTypes.string };
