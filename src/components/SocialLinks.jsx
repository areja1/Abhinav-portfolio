import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

/**
 * Keep your Instagram in here (replace your_instagram_id with your actual handle if needed).
 * This array is now safe to render; even if an item is malformed the component won't crash.
 */
const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "on LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/abhinavreja/",
    gradient: "from-[#0a66c2] to-[#004182]",
  },
  {
    name: "Github",
    displayName: "Open Source",
    subText: "@abhinavReja",
    icon: Github,
    url: "https://github.com/abhinavReja",
    gradient: "from-[#333] to-[#24292e]",
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@a.bhimanyu_17", // <-- keep your IG handle here
    icon: Instagram,
    url: "https://www.instagram.com/a.bhimanyu_17/", 
    gradient: "from-[#f58529] via-[#dd2a7b] to-[#8134af]",
  },
];

export default function SocialLinks() {
  // Guard to prevent "Cannot read properties of undefined (reading 'url')" crash
  const list = Array.isArray(socialLinks) ? socialLinks.filter(Boolean) : [];
  console.log("socialLinks list:", list); // helpful log while you debug

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {list.map(({ name, displayName, subText, icon: Icon, url, gradient } = {}, idx) => (
        <a
          key={url || name || idx}
          href={String(url || "#")}
          target="_blank"
          rel="noreferrer"
          className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient || "from-[#6366f1] to-[#a855f7]"}`}>
              {Icon ? <Icon className="w-5 h-5 text-white" /> : null}
            </div>
            <div className="leading-tight">
              <div className="text-sm text-white">{displayName || name || "Profile"}</div>
              {subText ? <div className="text-xs text-slate-400">{subText}</div> : null}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
