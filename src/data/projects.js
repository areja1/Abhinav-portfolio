// Projects, newest first. `live` and `code` are optional; leave them out
// when a repo is private or there is no deployment, and the row just shows text.

export const PROJECTS = [
  {
    name: "TII Servicing Bot",
    year: "2026",
    tag: "Client proof of concept",
    description:
      "A text chat assistant for Travel Insured International that answers servicing questions grounded in a traveler's Confirmation of Benefits and plan document. Retrieval over both PDFs, with guardrails that refuse claim decisions, invented benefits, and medical or legal advice, and that route urgent issues to the right contact.",
    tech: ["Next.js", "TypeScript", "Vercel AI SDK", "Claude", "Supabase"],
    live: "https://tii-servicing-bot.vercel.app",
    code: "https://github.com/areja1/TII-Servicing-Bot",
  },
  {
    name: "WIAL Platform",
    year: "2026",
    tag: "Opportunity Hack 2026",
    description:
      "Cross lingual coach search for the World Institute for Action Learning. OpenAI embeddings and pgvector match coaches across 20+ chapters in 10+ languages, with GPT-4o mini parsing the query. Replaced a set of fragmented WordPress sites with one Next.js app that loads in under four seconds on slow 3G, plus Stripe backed multi tenant chapter provisioning.",
    tech: ["Next.js", "TypeScript", "Python", "OpenAI", "pgvector", "Stripe"],
  },
  {
    name: "Noxturn",
    year: "2026",
    tag: "HackASU 2026",
    description:
      "A recovery planner for rotating shift workers: nurses, paramedics, factory staff. A circadian risk engine flags rapid shift flips, short turnarounds, and unsafe drive windows, then Claude writes a personalized 24 hour recovery plan backed by a RAG pipeline over clinical evidence cards. Fitbit OAuth brings in real sleep and HRV data.",
    tech: ["Next.js", "FastAPI", "Claude", "Supabase", "RAG", "Fitbit OAuth"],
    live: "https://noxturn.vercel.app",
  },
  {
    name: "CrodeX",
    year: "2025",
    tag: "HackASU 2025 winner, Claude Developer Tools track",
    description:
      "An LLM powered tool that migrates a backend project between Flask, Django, and Spring Boot while preserving application logic. A multi stage agentic pipeline on Gemini and Claude reads the project structure, extracts the dependency graph, and generates framework idiomatic code in under 90 seconds, with a human in the loop step for ambiguous dependency conflicts. Chosen over 100+ submissions.",
    tech: ["Python", "Flask", "Gemini", "Claude", "LLM agents"],
    code: "https://github.com/areja1/CrodeX-Development",
  },
  {
    name: "Face Recognition on AWS",
    year: "2025",
    tag: "ASU cloud computing coursework",
    description:
      "The same face recognition workload built three ways. IaaS: a custom autoscaler, S3 and SQS queueing, and PyTorch workers on a custom AMI, at 0.96 s latency and 80% accuracy across 100 concurrent requests. Serverless: ECR, MTCNN, and SQS triggered FaceNet inference at 1.78 s. Edge: AWS Greengrass with MQTT and Lambda backed recognition at 0.78 s.",
    tech: ["AWS EC2", "S3", "SQS", "Lambda", "ECR", "Greengrass", "PyTorch"],
  },
  {
    name: "ClaimCheck",
    year: "2026",
    tag: "Side project",
    description:
      "A multi agent decision guard for meetings. Gemini extracts claims from a transcript, then Claude verifies each one against company documents (RAG over ChromaDB) and live web search through Tavily. Every verdict is Verified, Contradicted, or Uncertain, with evidence attached, and low confidence claims go to a human.",
    tech: ["Python", "FastAPI", "Gemini", "Claude", "ChromaDB", "Tavily"],
    code: "https://github.com/areja1/ClaimCheck",
  },
  {
    name: "SafeCircle",
    year: "2026",
    tag: "Innovation Hacks",
    description:
      "A community financial safety net for immigrants, gig workers, and credit invisible families. Risk scans, shared emergency pools, a benefits finder, and a Crisis Mode that walks someone through job loss or an ER visit step by step. Claude handles the guidance; the app runs in English and Spanish.",
    tech: ["Next.js", "FastAPI", "Supabase", "Claude", "i18next"],
    live: "https://safe-circle-innovation-hacks.vercel.app",
    code: "https://github.com/areja1/SafeCircle-Innovation-hacks",
  },
];

// Smaller or older work, shown as a compact list.
export const EARLIER = [
  {
    name: "AI mental health chatbot",
    year: "2025",
    description:
      "FastAPI and OpenAI chat with PHQ-9 and GAD-7 screenings, crisis keyword detection, and PostgreSQL sessions.",
    live: "https://ai-powered-mental-health-chatbot.onrender.com",
    code: "https://github.com/areja1/-AI-Powered-Mental-Health-Chatbot",
  },
  {
    name: "TARDIS language interpreter",
    year: "2025",
    description:
      "A Prolog lexer, parser, and evaluator for a small teaching language with variables, control flow, functions, and printed parse trees.",
    live: "https://www.youtube.com/watch?v=gmbG3k5gbf8",
  },
  {
    name: "Scrum board simulator",
    year: "2024",
    description:
      "Java Swing desktop app for sprint planning with role switching, blockers, spikes, and JSON persistence. Gradle, JUnit, Checkstyle, SpotBugs, JaCoCo.",
  },
  {
    name: "Tkinter music player",
    year: "2023",
    description: "A small MP3 player in Python with folder import and JSON favourites.",
    code: "https://github.com/areja1/musicplayer",
  },
];
