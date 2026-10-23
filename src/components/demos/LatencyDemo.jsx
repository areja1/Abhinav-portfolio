import PropTypes from "prop-types";
import useInView from "../../hooks/useInView.js";

const ROWS = [
  { name: "IaaS", sub: "EC2 autoscaler · SQS · PyTorch", s: 0.96 },
  { name: "Serverless", sub: "Lambda · ECR · MTCNN + FaceNet", s: 1.78 },
  { name: "Edge", sub: "Greengrass · MQTT · Lambda", s: 0.78, best: true },
];
const MAX = 2.0;

export default function LatencyDemo() {
  const [ref, inView] = useInView(0.3);
  return (
    <div ref={ref} className="bars">
      <div className="mono" style={{ marginBottom: "-0.3rem" }}>
        latency · 100 concurrent requests · lower is better
      </div>
      {ROWS.map((r) => (
        <div className={`bar-row ${r.best ? "best" : ""}`} key={r.name}>
          <div className="name">
            {r.name}
            <small>{r.sub}</small>
          </div>
          <div className="track">
            <i style={{ width: inView ? `${(r.s / MAX) * 100}%` : 0 }} />
          </div>
          <div className="val">{r.s.toFixed(2)} s</div>
        </div>
      ))}
      <span className="demo-note">measured, Fall 2025</span>
    </div>
  );
}

LatencyDemo.propTypes = { accent: PropTypes.string };
