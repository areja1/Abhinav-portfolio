import { Link, useLocation } from "react-router-dom";
import PROFILE from "../data/profile.js";

export default function Nav() {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const to = (hash) => (home ? hash : `/${hash}`);
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="mark" to="/">
          <span className="dot" aria-hidden="true" />
          {PROFILE.name}
        </Link>
        <nav aria-label="Sections">
          <ul>
            <li>
              <a href={to("#work")}>Work</a>
            </li>
            <li className="hide-sm">
              <a href={to("#experience")}>Experience</a>
            </li>
            <li className="hide-sm">
              <a href={to("#about")}>About</a>
            </li>
            <li>
              <a href={to("#contact")}>Contact</a>
            </li>
            <li>
              <a className="cta" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
