import PropTypes from "prop-types";
import { DEMOS } from "./demos/index.js";

// A bordered "window" that hosts a project's interactive demo.
export default function DemoFrame({ project, tall = false, label }) {
  const Demo = DEMOS[project.demo];
  return (
    <div
      className={`demo-frame ${tall ? "tall" : ""}`}
      style={{ "--demo-accent": project.accent }}
      aria-label={`Illustrative demo: ${project.name}`}
    >
      <div className="demo-bar">
        <span className="lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mono">{label || project.slug}</span>
        <span className="mono" style={{ color: project.accent }}>
          demo
        </span>
      </div>
      <div className="demo-body">{Demo ? <Demo accent={project.accent} /> : null}</div>
    </div>
  );
}

DemoFrame.propTypes = {
  project: PropTypes.object.isRequired,
  tall: PropTypes.bool,
  label: PropTypes.string,
};
