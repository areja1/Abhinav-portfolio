import SignMap from "./SignMap.jsx";
import ChatDemo from "./ChatDemo.jsx";
import MigrationDemo from "./MigrationDemo.jsx";
import LatencyDemo from "./LatencyDemo.jsx";
import SearchDemo from "./SearchDemo.jsx";
import RecoveryDemo from "./RecoveryDemo.jsx";
import VerdictDemo from "./VerdictDemo.jsx";
import CrisisDemo from "./CrisisDemo.jsx";

// Keyed by the `demo` field in src/data/projects.js.
export const DEMOS = {
  signmap: SignMap,
  chat: ChatDemo,
  migration: MigrationDemo,
  latency: LatencyDemo,
  search: SearchDemo,
  recovery: RecoveryDemo,
  verdict: VerdictDemo,
  crisis: CrisisDemo,
};
