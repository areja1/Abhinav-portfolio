import chatbotImg from "../assets/react.svg";

const PROJECTS = [
  {
    id: "crodex-development",
    Title: "CrodeX — AI Code Migration Tool",
    Description:
      "LLM-powered tool that auto-migrates backend projects across Flask, Django, and Spring Boot — winner of the Claude Developer Tools track against 100+ submissions.",
    Img: "/crodex.png",
    Link: "",
    Github: "https://github.com/areja1/CrodeX-Development",
    Badge: "HackASU 2025 Winner",
    TechStack: ["Python", "Flask", "Gemini", "Claude", "FastAPI", "LLM Agents"],
    Features: [
      "Auto-migrates backend projects across Flask, Django, and Spring Boot",
      "Multi-stage agentic pipeline (Gemini + Claude) analyzes project structure and dependency graphs",
      "Generates framework-idiomatic migrations in under 90 seconds per project",
      "Flask backend with persistent state and resumable sessions",
      "Human-in-the-loop validation flags ambiguous dependency conflicts before code generation",
      "Won Claude Developer Tools track against 100+ submissions"
    ]
  },
  {
    id: "claimcheck-ai",
    Title: "ClaimCheck — AI Decision Guard",
    Description:
      "Multi-agent AI that listens to meeting transcripts, extracts claims using Gemini, and verifies them in real time with Claude + RAG over company docs and live web search — catching wrong decisions before they're made.",
    Img: "/claimcheck.png",
    Link: "",
    Github: "https://github.com/areja1/ClaimCheck",
    TechStack: ["Python", "FastAPI", "Gemini", "Claude", "RAG", "Tavily", "ChromaDB", "OpenAI"],
    Features: [
      "Multi-agent pipeline: claim extractor (Gemini) + verifier (Claude + RAG)",
      "RAG over company documents and live web search via Tavily",
      "Hybrid pipeline routes low-confidence claims to human review",
      "FastAPI backend with plug-and-play LLM switching (OpenAI ↔ Anthropic)",
      "Verdict types: Verified, Contradicted, Uncertain — each with evidence and risk recommendation",
      "Reduces hallucinated verdicts before they reach the team"
    ]
  },
  {
    id: "wial-platform",
    Title: "WIAL Platform — AI Coaching Network",
    Description:
      "AI-native coaching platform unifying 20+ international chapters with cross-lingual semantic search, Stripe-powered multi-tenant provisioning, and GPT-4o-mini auto-generated website drafts.",
    Img: "/wial.png",
    Link: "",
    Github: "Private",
    TechStack: ["Next.js", "TypeScript", "Python", "OpenAI", "pgvector", "GPT-4o-mini", "Stripe"],
    Features: [
      "Cross-lingual semantic search via OpenAI embeddings + pgvector across 10+ languages",
      "GPT-4o-mini query parsing matching coaches across 20+ international chapters",
      "Rebuilt fragmented WordPress sites into a unified Next.js app",
      "Service worker caching + AVIF/WebP assets achieving sub-4s load on slow 3G",
      "Multi-tenant chapter provisioning with Stripe payments and role-based notifications",
      "Auto-generated website drafts for 20+ chapters in under 60 seconds each"
    ]
  },
  {
    id: "safecircle-innovation",
    Title: "SafeCircle — Financial Safety Net",
    Description:
      "Community-powered financial safety net app for immigrants, gig workers, and credit-invisible families — with Risk X-Ray scans, shared emergency pools, and a Crisis Mode for step-by-step financial triage.",
    Img: "/safecircle.png",
    Link: "https://safe-circle-innovation-hacks.vercel.app",
    Github: "https://github.com/areja1/SafeCircle-Innovation-hacks",
    TechStack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Supabase", "Claude API", "Recharts", "i18next"],
    Features: [
      "Risk X-Ray scan, group dashboard, and shared emergency pool",
      "Insurance gap cards, benefits finder, and poverty tax meter",
      "Crisis Mode — step-by-step financial triage for job loss, ER visits, accidents, and more",
      "Claude API powers real-time financial guidance and recommendations",
      "English & Spanish support via i18next for immigrant and multilingual users",
      "Built on Supabase (PostgreSQL + Auth + Realtime) with role-based access"
    ]
  },
  {
    id: "noxturn-shift-recovery",
    Title: "Noxturn — Circadian Recovery Planner",
    Description:
      "AI-powered recovery copilot for rotating shift workers — nurses, paramedics, factory staff — that detects circadian risk and generates personalized 24-hour recovery plans using Claude AI. Built at HackASU 2026.",
    Img: "/noxturn.png",
    Link: "https://noxturn.vercel.app",
    Github: "Private",
    TechStack: ["Next.js", "TypeScript", "FastAPI", "Claude AI", "Supabase", "RAG", "Fitbit OAuth", "Tailwind CSS"],
    Features: [
      "5-step onboarding wizard capturing role, commute, chronotype, and medical history",
      "Claude Haiku generates personalized 24-hour recovery plans calibrated to each worker",
      "Circadian risk engine detects rapid flips, short turnarounds, and unsafe drive windows",
      "RAG pipeline over clinical evidence cards (sentence-transformers) for evidence-backed advice",
      "7-day recovery heatmap and circadian strain score analytics",
      "Fitbit OAuth 2.0 wearable integration for real HRV and sleep data"
    ]
  },
  {
    id: "ai-powered-mental-health-chatbot",
    Title: "AI-Powered Mental Health Chatbot",
    Description:
      "Private, always-on mental health assistant with screenings, crisis checks, and a calming, responsive chat UI.",
    Img: "/chatbot.png",
    Link: "https://ai-powered-mental-health-chatbot.onrender.com",
    Github: "https://github.com/areja1/-AI-Powered-Mental-Health-Chatbot",
    TechStack: ["Python", "FastAPI", "OpenAI", "PostgreSQL", "HTML", "CSS", "Javascript", "CI/CD", "CSRF"],
    Features: [
      "Real-time chat responses powered by OpenAI",
      "PHQ-9 and GAD-7 self-assessments with basic scoring",
      "Crisis keyword detection and tailored safety messaging",
      "Secure session handling and PostgreSQL persistence",
      "Clean, responsive UI for desktop and mobile",
      "Modular FastAPI services for easy extension",
      "PII-aware prompting; CSRF & CORS hardening"
    ]
},
  {
    id: "tardis-lang-interpreter",
    Title: "TARDIS Language — Prolog Interpreter",
    Description:
      "Prolog-based lexer–parser–interpreter for a teaching language (TARDIS) with variables, control flow, functions, and printed parse trees.",
    Img: "/tardis.png",
    Link: "https://www.youtube.com/watch?v=gmbG3k5gbf8", // optional demo video from course
    Github: "Private",
    TechStack: ["Prolog", "DCG", "Lexer", "Parser", "Interpreter", "CLI"],
    Features: [
      "DCG-powered lexer & grammar-driven parser",
      "Statements: let, assignment (:=), if/else, whileLoop, forLoop with ++/--",
      "Functions: define, call, return; printout for output",
      "Types & ops: integers, strings, booleans; + − × ÷; and/or/not; ==, <=, >=",
      "Evaluator with scoped environment (symbol table)",
      "Batch runner scripts (tardis.sh / tardis.bat)",
      "Outputs: Token List, Parsed Tree, and program result",
      "Sample programs: factorial, sum, max-of-two, boolean logic, strings"
    ]
   },
  {
    id: "scrum-board-simulator",
    Title: "Scrum Board Simulator (Java/Swing)",
    Description:
      "Desktop Scrum board & simulator: plan sprints, manage user stories, switch roles, and model blockers/spikes with a clean Swing UI.",
    Img: "/scrumboard.png",
    Link: "",                 // no live demo → button shows “Demo Not Available”
    Github: "Private",        // shows a courteous private-repo message
    TechStack: ["Java", "Swing", "Gradle", "JUnit", "JSON", "FlatLaf"],
    Features: [
      "Backlog management: add/edit/delete user stories with points & business value",
      "Sprint planning UI with story state machine (Selected/Unselected/Completed/Deleted)",
      "Role-based simulation: Product Owner & Developer with role switcher",
      "Blockers & Spike stories: add blockers, propose solutions, randomize blockers",
      "Persistent JSON save/load for simulation details and settings",
      "Polished desktop UI (Swing + FlatLaf), wizards & dialogs",
      "Quality pipeline: Gradle build, Checkstyle, SpotBugs, JaCoCo, JUnit"
    ]
  },
  {
    id: "tkinter-music-player",
    Title: "Tkinter Music Player",
    Description:
      "Desktop MP3 player with Play/Pause/Next, folder import, and JSON-based favourites—no database required.",
    Img: "/playes.png",            // image placed in public/
    Link: "",                      // no live demo -> “Demo Not Available”
    Github: "https://github.com/areja1/musicplayer",
    TechStack: ["Python", "Tkinter", "pygame", "mutagen", "JSON"],
    Features: [
      "Playback controls: Play, Pause, Stop, Next, Previous (pygame mixer)",
      "Import MP3s; read title/artist via mutagen",
      "Favourites stored in favourites.json (portable, no DB)",
      "Clean Tkinter UI with basic progress/time display"
    ]
  }
];

export default PROJECTS;
