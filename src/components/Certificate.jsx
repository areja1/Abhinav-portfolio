// Repurposed: show Achievements (single render), not certificate tiles
import React from "react";

export default function Certificate() {
  return (
    <section id="achievements" className="w-full max-w-4xl mx-auto px-4 py-2 text-white">
      <h2 className="text-2xl md:text-3xl font-semibold">Achievements</h2>
      <ul className="mt-4 space-y-3 list-disc pl-5 text-sm md:text-base leading-relaxed">
        <li>
          Won a <strong>National-level Bronze Medal</strong> in <strong>Taekwondo</strong>.
        </li>
        <li>
          Second position in 200m race on <strong>November, 2014</strong> at
          Delhi Public School, Satna
        </li>
        <li>
          Third position in <strong>Swimming</strong> on <strong>October, 2015</strong> at
          Delhi Public School, Satna
        </li>
        <li>
          Secured <strong>1st position</strong> in <strong>Water Polo</strong> on <strong>October, 2015</strong> at
          Delhi Public School, Satna
        </li>
      </ul>
    </section>
  );
}