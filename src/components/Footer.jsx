import PROFILE from "../data/profile.js";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>
          {PROFILE.name} · {PROFILE.location}
        </span>
        <span>
          Last updated {PROFILE.lastUpdated} ·{" "}
          <a href="https://github.com/areja1/Abhinav-portfolio" target="_blank" rel="noopener noreferrer">
            Source
          </a>
        </span>
      </div>
    </footer>
  );
}
