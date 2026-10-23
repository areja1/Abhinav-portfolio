import PropTypes from "prop-types";
import useLoop from "./useLoop.js";

const FLASK = [
  ['<span class="k">from</span> flask <span class="k">import</span> Flask, jsonify'],
  ['<span class="k">from</span> .db <span class="k">import</span> get_user'],
  [""],
  ['app = Flask(<span class="s">__name__</span>)'],
  [""],
  ['<span class="a">@app.route</span>(<span class="s">"/users/&lt;int:uid&gt;"</span>)'],
  ['<span class="k">def</span> user(uid):'],
  ["    u = get_user(uid)"],
  ['    <span class="k">if</span> u <span class="k">is</span> <span class="k">None</span>:'],
  ['        <span class="k">return</span> jsonify(error=<span class="s">"not found"</span>), 404'],
  ['    <span class="k">return</span> jsonify(u.to_dict())'],
];

const SPRING = [
  '<span class="a">@RestController</span>',
  '<span class="a">@RequestMapping</span>(<span class="s">"/users"</span>)',
  '<span class="k">public class</span> UserController {',
  "",
  '  <span class="k">private final</span> UserRepository repo;',
  "",
  '  <span class="a">@GetMapping</span>(<span class="s">"/{uid}"</span>)',
  '  <span class="k">public</span> ResponseEntity&lt;UserDto&gt; user(',
  '      <span class="a">@PathVariable</span> <span class="k">long</span> uid) {',
  "    <span class=\"k\">return</span> repo.findById(uid)",
  "        .map(u -&gt; ResponseEntity.ok(u.toDto()))",
  "        .orElse(ResponseEntity.notFound().build());",
  "  }",
  "}",
];

const PHASES = ["analyzing project structure", "extracting dependency graph", "generating Spring Boot", "done"];

export default function MigrationDemo() {
  const total = SPRING.length + 4;
  const [ref, step] = useLoop(total, 420, 3000);
  const shown = Math.max(0, step - 3);
  const phase = step < 2 ? 0 : step < 3 ? 1 : shown < SPRING.length ? 2 : 3;
  const pct = Math.round((step / (total - 1)) * 100);
  return (
    <div ref={ref} style={{ position: "absolute", inset: "1rem 1rem 2.2rem" }}>
      <div className="migrate">
        <div className="pane">
          <div className="pane-head">
            <span>app.py</span>
            <span>Flask</span>
          </div>
          <pre dangerouslySetInnerHTML={{ __html: FLASK.map((l) => l[0]).join("\n") }} />
        </div>
        <div className="pane">
          <div className="pane-head">
            <span>UserController.java</span>
            <span>Spring Boot</span>
          </div>
          <pre
            dangerouslySetInnerHTML={{
              __html:
                SPRING.slice(0, shown).join("\n") + (shown < SPRING.length ? '<span class="cursor"></span>' : ""),
            }}
          />
        </div>
      </div>
      <div className="progress">
        <span>{PHASES[phase]}</span>
        <span className="bar">
          <i style={{ width: `${pct}%` }} />
        </span>
        <span>{String(Math.round((step / (total - 1)) * 47)).padStart(2, "0")}s</span>
      </div>
    </div>
  );
}

MigrationDemo.propTypes = { accent: PropTypes.string };
