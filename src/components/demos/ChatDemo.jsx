import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const SCRIPT = [
  { who: "user", text: "My flight from PHX to ORD was delayed last night. Am I covered?" },
  { who: "typing" },
  {
    who: "bot",
    text: "Your FlexiPAX plan includes Travel Delay. Give me the flight number and I will check the delay.",
  },
  { who: "user", text: "AA 1428, Oct 21." },
  { who: "typing" },
  {
    who: "card",
    html: (
      <>
        <b>Delay verified</b> · AviationStack
        <br />
        AA 1428 · scheduled 18:05 · departed 22:17 · <b>4 h 12 m</b>
        <br />
        Rule: delay ≥ 3 h → $200 per insured · <b>Payout $200</b>
      </>
    ),
  },
  {
    who: "bot",
    text: "That qualifies. I have started a Travel Delay claim for $200. You will get a confirmation email with next steps.",
  },
];

export default function ChatDemo() {
  const [ref, step] = useLoop(SCRIPT.length + 1, 1300, 3200);
  const visible = SCRIPT.slice(0, step).filter((m, i) => !(m.who === "typing" && i < step - 1));
  return (
    <div ref={ref} className="chat" aria-live="polite">
      {visible.map((m, i) =>
        m.who === "typing" ? (
          <div className="typing" key={`t${i}`}>
            <i />
            <i />
            <i />
          </div>
        ) : (
          <div className={`msg ${m.who}`} key={i}>
            {m.html || m.text}
          </div>
        )
      )}
      <span className="demo-note">scripted · amounts illustrative</span>
    </div>
  );
}

ChatDemo.propTypes = { accent: PropTypes.string };
