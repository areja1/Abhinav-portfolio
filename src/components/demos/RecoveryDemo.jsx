import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Shift blocks per day as [startHour, endHour). A night shift Thu→Fri then an
// early day shift Sat is the "rapid flip" the risk engine flags.
const SHIFTS = [
  [7, 15],
  [7, 15],
  [15, 23],
  [19, 27],
  [19, 27],
  [6, 14],
  null,
];

function strain(day, hour) {
  const s = SHIFTS[day];
  if (!s) return 0;
  const inShift = hour >= s[0] && hour < s[1];
  const prevNight = day > 0 && SHIFTS[day - 1] && SHIFTS[day - 1][1] > 24 && hour < SHIFTS[day - 1][1] - 24;
  if (prevNight) return 0.9;
  if (inShift) return s[0] >= 19 ? 0.8 : 0.45;
  if (day === 5 && hour < 6) return 0.95; // short turnaround into Sat
  return 0.08;
}

export default function RecoveryDemo({ accent }) {
  const [ref, step] = useLoop(DAYS.length + 2, 420, 2600);
  const shownDays = Math.min(DAYS.length, step);
  const flagged = step >= DAYS.length;
  return (
    <div ref={ref} className="heat">
      {DAYS.map((d, di) => (
        <div key={d} style={{ display: "contents" }}>
          <span style={{ alignSelf: "center" }}>{d}</span>
          <div className="cells">
            {Array.from({ length: 24 }, (_, h) => {
              const v = di < shownDays ? strain(di, h) : 0;
              const bg = v ? `color-mix(in srgb, ${accent} ${Math.round(v * 100)}%, var(--bg-3))` : undefined;
              return <i key={h} style={bg ? { background: bg } : undefined} />;
            })}
          </div>
        </div>
      ))}
      <div className="flag" style={{ opacity: flagged ? 1 : 0, transition: "opacity 300ms" }}>
        <b>RISK</b> Rapid flip: night shift Fri ends 03:00, day shift Sat starts 06:00. Plan: 90 min anchor nap, no driving
        before 09:00.
      </div>
    </div>
  );
}

RecoveryDemo.propTypes = { accent: PropTypes.string.isRequired };
