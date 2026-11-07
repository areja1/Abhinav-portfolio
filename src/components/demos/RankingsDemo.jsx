import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

// PCC search and AI visibility, measured Oct 6 vs Oct 26, 2026 (ranks checked Oct 30).
const METRICS = [
  { name: "AI answers naming PCC", before: 60, after: 83, max: 100, unit: "%" },
  { name: "Searches in Google top 3", before: 48, after: 61, max: 100, unit: "%" },
  { name: "Google Maps listings", before: 1, after: 10, max: 10, unit: "" },
];

const RANKS = [
  { kw: "sidewalk grinding service", from: "#8", to: "#2" },
  { kw: "trip hazard repair", from: "#3", to: "#1" },
  { kw: "trip hazard removal", to: "#1" },
  { kw: "sidewalk trip hazard removal", to: "#1" },
];

const ENGINES = [
  { name: "ChatGPT", note: "Best companies for sidewalk trip hazard removal", v: "#1 PICK" },
  { name: "Perplexity", note: "Removing trip hazards without replacing concrete", v: "ONLY ONE NAMED" },
  { name: "Google AI Overview", note: "sidewalk trip hazard removal", v: "NAMED FIRST" },
  { name: "Google AI Mode", note: "Trip hazard contractors for Colorado cities", v: "NAMED FIRST" },
];

const TABS = ["Growth", "Google rankings", "AI answers"];

export default function RankingsDemo() {
  const [ref, step] = useLoop(4, 2300, 2600);
  const tab = step <= 1 ? 0 : step - 1;
  const after = step >= 1;

  return (
    <div ref={ref} className="vis">
      <div className="vis-tabs">
        {TABS.map((t, i) => (
          <span key={t} className={`vis-tab ${i === tab ? "on" : ""}`}>
            {t}
          </span>
        ))}
        <span className="mono vis-date">{tab === 0 && !after ? "Oct 6" : "Oct 26"}</span>
      </div>

      {tab === 0 && (
        <div className="bars vis-pane">
          {METRICS.map((m) => {
            const v = after ? m.after : m.before;
            return (
              <div className={`bar-row ${after ? "best" : ""}`} key={m.name}>
                <div className="name">{m.name}</div>
                <div className="track">
                  <i style={{ width: `${(v / m.max) * 100}%` }} />
                </div>
                <div className="val">
                  {v}
                  {m.unit}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 1 && (
        <div className="vis-pane vis-list">
          {RANKS.map((r) => (
            <div className="vis-row" key={r.kw}>
              <span className="kw">{r.kw}</span>
              <span className="mono move">
                {r.from ? <s>{r.from}</s> : null}
                <b>{r.to}</b>
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <div className="claims vis-pane">
          {ENGINES.map((e) => (
            <div className="claim" key={e.name}>
              <span className="text">{e.name}</span>
              <span className="v verified">{e.v}</span>
              <span className="ev">{e.note}</span>
            </div>
          ))}
        </div>
      )}

      <span className="demo-note">8 new pages · Preferred Sources button live</span>
    </div>
  );
}

RankingsDemo.propTypes = { accent: PropTypes.string };
