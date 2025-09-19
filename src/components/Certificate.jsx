import React from "react";
import ACHIEVEMENTS from "../data/achievements";

export default function Certificate() {
  const items = Array.isArray(ACHIEVEMENTS) ? ACHIEVEMENTS.filter(Boolean) : [];

  return (
    <section id="achievements" className="w-full max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Achievements</h2>
        <p className="text-white/60 mt-1">Professional milestones earned</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-white/70">No achievements to display right now.</p>
        </div>
      ) : (
        // Hoverable “pill” bullets (matches the project feature style)
        <ul className="space-y-2 text-sm md:text-base leading-relaxed">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="group flex items-start gap-3 p-2 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-colors duration-200"
            >
              {/* Glowing dot */}
              <div className="relative mt-1.5">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-2 h-2 rounded-full bg-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Text */}
              <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
