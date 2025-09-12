import React from "react";
import PropTypes from "prop-types";

export default function TechStackIcon({ TechStackIcon: icon, Language }) {
  // Use CDN URL as-is; otherwise load from /public root
  const src = /^https?:\/\//i.test(icon) ? icon : `/${icon}`;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-4 h-40">
      <img
        src={src}
        alt={`${Language} icon`}
        className="h-16 w-16 object-contain"
        loading="lazy"
        decoding="async"
      />
      <span className="font-semibold text-white">{Language}</span>
    </div>
  );
}

TechStackIcon.propTypes = {
  TechStackIcon: PropTypes.string.isRequired,
  Language: PropTypes.string.isRequired,
};