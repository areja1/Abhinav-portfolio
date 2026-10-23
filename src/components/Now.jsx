import PROFILE from "../data/profile.js";

export default function Now() {
  return (
    <section className="now" id="now">
      <div className="wrap">
        <h2 className="section-label">Now</h2>
        <ul>
          {PROFILE.now.map((line) => (
            <li key={line.slice(0, 24)}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
