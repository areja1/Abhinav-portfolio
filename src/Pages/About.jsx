import React, { useEffect, useMemo, useState, memo } from "react";
import PROJECTS from "../data/projects";
import ACHIEVEMENTS from "../data/achievements";
import { Link } from "react-router-dom";
import {
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Github,
  Linkedin,
  Phone,
  Mail,
  FileText,
  Sparkles
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* =========================
   Header
   ========================= */
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

/* =========================
   Profile Image (animated circular holder)
   Place your image at: public/Photo.png
   ========================= */
const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Gradient auras (desktop only) */}
      <div className="absolute -inset-10 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-90 h-90 sm:w-96 sm:h-96 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          {/* Overlays (desktop only) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/Photo.jpg"
            alt="Abhinav Reja"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Hover effects (desktop only) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

/* =========================
   Stat Card (Total Projects / Achievements / Years)
   Make the *whole card* clickable while keeping the arrow visible.
   ========================= */
const StatCard = memo(({ icon: Icon, color, value, label, description, animation, href, tab }) => {
  // Build a single target with the tab hint your Portfolio reads
  const target = href
    ? `${href}${href.includes("#Portofolio") ? "" : "#Portofolio"}${tab ? `?tab=${tab}` : ""}`
    : null;

  // Smooth scroll helper (offset accounts for any sticky header)
  const scrollToPortfolioNow = () => {
    const el = document.getElementById("Portofolio");
    if (!el) return;
    const offset = 96; // px
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div data-aos={animation} data-aos-duration={1300} className={`relative ${href ? "group cursor-pointer" : "group"}`}>
      {/* Card UI */}
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-white/10 p-6 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between transition-transform">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {label?.toLowerCase().includes("experience") ? `${value}+` : value}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-xs tracking-wider text-white/70 font-semibold">{label?.toUpperCase()}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-white/70">{description}</p>
            {/* Arrow remains visible but is decorative; clicks go to the overlay link */}
            <span className="p-2 rounded-lg group-hover:bg-white/10 pointer-events-none">
              <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            </span>
          </div>
        </div>
      </div>

      {/* Full-card clickable overlay (Link for internal, <a> for external) */}
      {href ? (
        href.startsWith("/") ? (
          <Link
            to={target}
            aria-label={`Open ${label}`}
            onClick={() => { scrollToPortfolioNow(); }}
            className="absolute inset-0 rounded-3xl z-20"
          />
        ) : (
          <a
            href={target}
            aria-label={`Open ${label}`}
            onClick={() => { scrollToPortfolioNow(); }}
            className="absolute inset-0 rounded-3xl z-20"
          />
        )
      ) : null}
    </div>
  );
});

/* =========================
   Page
   ========================= */
const AboutPage = () => {
  
  const { totalProjects, totalAchievements, years } = useMemo(() => {
    const projectsCount = Array.isArray(PROJECTS) ? PROJECTS.length : 0;
    const achievementsCount = Array.isArray(ACHIEVEMENTS) ? ACHIEVEMENTS.length : 0;

    // full years since 2021-11-06
    const startDate = new Date("2021-11-06");
    const now = new Date();
    let y = now.getFullYear() - startDate.getFullYear();
    const m = now.getMonth() - startDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < startDate.getDate())) y -= 1;

    return {
      totalProjects: projectsCount,
      totalAchievements: achievementsCount,
      years: y < 0 ? 0 : y,
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  // ===== Contact helpers =====
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);   
  const PHONE_NUMBER = "+1 (480)942-8069";
  const EMAIL_ADDRESS = "areja1@asu.edu";
  const scrollToContact = () => {
    const el = document.getElementById("Contact") || document.getElementById("contact");
    if (!el) return;
    const offset = 96; // adjust if you have a sticky header
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
 // Close modals on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowPhone(false);
        setShowEmail(false);                           
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
        href: "#Portofolio",
        tab: "projects",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalAchievements,
        label: "Achievements",
        description: "Sports & extracurricular milestones",
        animation: "fade-up",
        href: "#Portofolio",
        tab: "achievements",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: years,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
        href: "#Portofolio",
        tab: "experience",
      },
    ],
    [totalProjects, totalAchievements, years]
  );
  return (
    <div className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0 scroll-mt-24" id="About">
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT: Intro & buttons */}
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Abhinav Reja
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Master’s candidate in Computer Software Engineering with extensive back-end development experience across diverse industries through internships. Team-oriented engineer skilled in optimizing performance, designing scalable APIs, and building practical AI/ML applications with LLMs and OpenAI. I believe that being a true engineer means never settling; I am deeply committed to continuous learning and would embrace the chance to expand my skills.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="/Abhinav_Reja_Resume.pdf" className="w-full lg:w-auto" download>
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              {/* Contact CTA — same visual style as Download CV */}
              <a
                href="#Contact"
                className="w-full lg:w-auto"
                onClick={(e) => { e.preventDefault(); scrollToContact(); }}
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-2 rounded-xl
                             bg-gradient-to-r from-[#6366f1] to-[#a855f7]
                             text-white border border-white/10
                             flex items-center gap-2 shadow
                             hover:opacity-95 transition-all"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  Contact
                </button>
              </a>
            </div>
            {/* ===== Social icons ===== */}
            <div className="mt-4 flex items-center gap-4">
              <a
                 href="https://github.com/areja1" target="_blank" rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all shadow"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-white/80" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhinavreja/" target="_blank" rel="noreferrer"
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all shadow"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-white/80" />
              </a>
              {/* Phone (replaces Instagram) -> opens modal */}
              <button
                type="button"
                onClick={() => setShowPhone(true)}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all shadow"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5 text-white/80" />
              </button>
              {/* Email -> opens modal */}
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all shadow"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-white/80" />
              </button>
            </div>

            {/* ===== Simple phone modal with soft animation ===== */}
            {showPhone && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200" onClick={()=>setShowPhone(false)} />
                <div className="relative z-[1001] w-[92%] max-w-sm rounded-2xl border border-white/10 bg-[#0b0f1a] p-5
                                shadow-2xl scale-95 opacity-0 animate-[modalIn_.18s_ease-out_forwards]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <Phone className="w-5 h-5 text-white/90" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Connect via call</h3>
                  </div>
                  <p className="mt-3 text-white/80 select-all">{PHONE_NUMBER}</p>
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={()=>setShowPhone(false)}
                      className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 text-white"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===== Email modal (same style) ===== */}
            {showEmail && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
                  onClick={() => setShowEmail(false)}
                />
                <div className="relative z-[1001] w-[92%] max-w-sm rounded-2xl border border-white/10 bg-[#0b0f1a] p-5
                                shadow-2xl scale-95 opacity-0 animate-[modalIn_.18s_ease-out_forwards]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                      <Mail className="w-5 h-5 text-white/90" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Connect via email</h3>
                  </div>
                  <p className="mt-3 text-white/80 select-all">{EMAIL_ADDRESS}</p>
                  <div className="mt-5 flex justify-end gap-2">
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 text-white"
                      onClick={() => setShowEmail(false)}
                    >
                      Open Mail
                    </a>
                    <button
                      onClick={() => setShowEmail(false)}
                      className="px-4 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 text-white"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>

          {/* RIGHT: Animated profile holder (ONLY this, no extra <img/>) */}
          <ProfileImage />
        </div>

        {/* Stats row — each card links individually (no outer anchor) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Keyframes for custom animations */}
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes spin-slower { to { transform: rotate(360deg); } }
        .animate-bounce-slow { animation: bounce 3s infinite; }
        .animate-pulse-slow  { animation: pulse 3s infinite; }
        .animate-spin-slower { animation: spin-slower 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
