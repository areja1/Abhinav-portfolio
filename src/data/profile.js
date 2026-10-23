// Everything about me that appears on the site, in one place.
// Keep this in step with public/Abhinav_Reja_Resume.pdf.

const PROFILE = {
  name: "Abhinav Reja",
  firstName: "Abhinav",
  title: "Software engineer",
  role: "Forward Deployed Engineer at OZZI",
  location: "Tempe, Arizona",
  email: "abhinavreja2000@gmail.com",
  github: "https://github.com/areja1",
  linkedin: "https://www.linkedin.com/in/abhinavreja",
  resume: "/Abhinav_Reja_Resume.pdf",
  siteUrl: "https://abhinavrejaportfolio.vercel.app",
  photo: "/Photo.jpg",
  lastUpdated: "October 2026",
  openToWork: true,

  headline: ["Backend systems", "and the AI features", "that run on them."],

  intro: [
    "I'm a software engineer in Tempe, Arizona. I finished my M.S. in Software Engineering at Arizona State in May 2026 with a 4.0 and now work as a Forward Deployed Engineer at OZZI, shipping products end to end for clients: a travel insurance claims chatbot, a campaign sign planning engine on PostGIS, and the regression suites that keep an LLM feature honest before it reaches users.",
    "Before that I built recommendation APIs at Vosyn and C++ time sync services at WINspect. I like problems where the data model matters, latency gets measured, and a test suite decides what ships.",
  ],

  // Numbers from real work, shown on the home page. Keep them defensible.
  stats: [
    { value: 71, suffix: "%", label: "LLM cost cut with layered prompt caching", source: "OZZI" },
    { value: 11000, prefix: "~", suffix: "", label: "ADOT traffic points ranked for sign placement", source: "OZZI" },
    { value: 0.78, suffix: " s", decimals: 2, label: "edge inference latency, face recognition on Greengrass", source: "AWS" },
    { value: 500, suffix: "+", label: "distributed clients on a C++ time sync API at sub 200 ms p95", source: "WINspect" },
  ],

  elsewhere:
    "Away from the keyboard I am a national level Taekwondo bronze medalist, and I grew up swimming and playing water polo.",
};

export default PROFILE;
