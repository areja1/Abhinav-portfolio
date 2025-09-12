// Repurposed: show Achievements (single render), not certificate tiles
import React from "react";
import ACHIEVEMENTS from "../data/achievements";

export default function Certificate() {
  const items = Array.isArray(ACHIEVEMENTS) ? ACHIEVEMENTS : [];

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
        <ul className="space-y-3 list-disc pl-5 text-sm md:text-base leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}