import PROFILE from "../data/profile.js";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="name" href="#top">
          {PROFILE.name}
        </a>
        <nav aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
