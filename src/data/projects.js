// Projects, in display order. Each has a slug (its URL), a short card
// description, a `demo` key that picks the interactive component shown on the
// card and the detail page (see src/components/demos/index.js), and a case
// study for the detail page. `live` and `code` are optional.

export const PROJECTS = [
  {
    slug: "sign-planning",
    name: "Campaign sign planning engine",
    year: "2026",
    tag: "Client work at OZZI",
    demo: "signmap",
    accent: "#7ee0ff",
    description:
      "Ranks where a political campaign should plant yard signs across about 11,000 ADOT traffic count points, so every sign is seen by the most cars and no two signs waste views on the same traffic.",
    tech: ["PostGIS", "Supabase", "OpenStreetMap", "Expo / React Native Web", "MapLibre", "TypeScript"],
    caseStudy: {
      problem:
        "Campaigns were placing signs by gut feel and spreadsheets. The client wanted the most impressions per sign, not even spacing, plus warnings when a spot breaks Arizona sign law or a city ordinance.",
      approach: [
        "Ingested ADOT's statewide traffic counts into PostGIS and classified every point by FHWA functional class, so freeways, ramps, and residential streets drop out before ranking.",
        "Modeled road visibility with OpenStreetMap: a divided road shows a roadside sign to roughly half its traffic, an undivided or one way road shows it to all of it. That reorders the ranking in ways raw counts cannot.",
        "A greedy fill picks the busiest remaining spot that is at least 200 m from any chosen one, stopping at the campaign's sign count. Districts that run out of busy roads get fewer, honest recommendations instead of quiet streets.",
        "An AI pipeline finds each city's sign ordinance, extracts rules with verbatim quote checks, and a second model rejects anything not about temporary signs. The rules surface at placement time.",
      ],
      result:
        "A Mesa district that used to put 15 of 30 recommendations on the Superstition Freeway now puts zero there and still fills all 30 spots. The engine runs for all 91 Arizona cities with 81% road visibility coverage statewide.",
    },
  },
  {
    slug: "tii-servicing-bot",
    name: "Travel insurance servicing chatbot",
    year: "2026",
    tag: "Client work at OZZI",
    demo: "chat",
    accent: "#ffd166",
    description:
      "A chatbot for Travel Insured International that answers policy questions from a traveler's own documents and takes flight delay claims, verifying the delay live and computing the payout with deterministic rules.",
    tech: ["Next.js", "TypeScript", "Claude", "Vercel AI SDK", "Supabase Postgres", "AviationStack"],
    live: "https://tii-servicing-bot.vercel.app",
    code: "https://github.com/areja1/TII-Servicing-Bot",
    caseStudy: {
      problem:
        "Servicing calls were mostly the same questions: what does my plan cover, and my flight was delayed, what now. The answers had to come from the traveler's Confirmation of Benefits and plan document, never from the model's imagination, and a claim decision had to be reproducible.",
      approach: [
        "Both PDFs are parsed page by page, chunked and tagged, and loaded into Supabase. Every answer is grounded in retrieved passages with the source cited.",
        "Claim state is rebuilt from the conversation history on every request. No server holds session state, so any instance gives the same answer and a test can replay a conversation exactly.",
        "Flight delays are verified against the AviationStack API, then a deterministic rules layer computes the payout. The model explains; it never decides.",
        "Layered Anthropic prompt caching on the document context cut LLM cost by 71%.",
      ],
      result:
        "Shipped on Vercel with release gates: a 42 case claim regression suite, 95 conversational scenarios, and PII redaction checks that run before every deploy.",
    },
  },
  {
    slug: "crodex",
    name: "CrodeX",
    year: "2025",
    tag: "HackASU 2025 winner, Claude Developer Tools track",
    demo: "migration",
    accent: "#b8f135",
    description:
      "An LLM powered tool that migrates a backend project between Flask, Django, and Spring Boot while keeping the application logic intact. Chosen over 100+ submissions.",
    tech: ["Python", "Flask", "Gemini", "Claude", "Agentic pipeline"],
    code: "https://github.com/areja1/CrodeX-Development",
    caseStudy: {
      problem:
        "Framework migrations are slow, repetitive, and easy to get subtly wrong. A one shot prompt to an LLM produces code that looks right and misses half the dependency graph.",
      approach: [
        "A multi stage agentic pipeline: Gemini maps the project structure and extracts the dependency graph, Claude generates framework idiomatic code file by file with the graph as context.",
        "Persistent state and resumable sessions in a Flask backend, so a long migration survives a dropped connection.",
        "Human in the loop validation flags ambiguous dependency conflicts before any code is generated, instead of guessing.",
      ],
      result: "Migrates a typical project in under 90 seconds. Won the Claude Developer Tools track at HackASU 2025.",
    },
  },
  {
    slug: "face-recognition-aws",
    name: "Face recognition on AWS, three ways",
    year: "2025",
    tag: "ASU cloud computing coursework",
    demo: "latency",
    accent: "#ff8f6b",
    description:
      "The same face recognition workload built as IaaS, serverless, and edge, with the latency of each measured under 100 concurrent requests.",
    tech: ["AWS EC2", "S3", "SQS", "Lambda", "ECR", "Greengrass", "MQTT", "PyTorch", "MTCNN", "FaceNet"],
    caseStudy: {
      problem:
        "Pick an architecture for a bursty vision workload with real numbers, not opinions.",
      approach: [
        "IaaS: a custom autoscaler watching an SQS queue, PyTorch workers on a custom AMI, S3 for inputs and outputs.",
        "Serverless: container images in ECR, MTCNN face detection, SQS triggered FaceNet inference in Lambda.",
        "Edge: AWS Greengrass on device with MQTT messaging and Lambda backed recognition.",
      ],
      result:
        "IaaS 0.96 s at 80% accuracy across 100 concurrent requests, serverless 1.78 s, edge 0.78 s. Edge wins on latency, IaaS wins on control, serverless wins on operations.",
    },
  },
  {
    slug: "wial",
    name: "WIAL coaching platform",
    year: "2026",
    tag: "Opportunity Hack 2026",
    demo: "search",
    accent: "#d6a4ff",
    description:
      "Cross lingual coach search for the World Institute for Action Learning: find a coach across 20+ chapters in 10+ languages, on one Next.js app that replaced a pile of WordPress sites.",
    tech: ["Next.js", "TypeScript", "OpenAI embeddings", "pgvector", "GPT-4o mini", "Stripe"],
    caseStudy: {
      problem:
        "Twenty chapters, each with its own WordPress site in its own language, and no way for someone in Lisbon to find a coach who works in Portuguese and knows healthcare.",
      approach: [
        "OpenAI embeddings stored in pgvector make the search cross lingual: a query in one language matches coach profiles written in another.",
        "GPT-4o mini parses the free text query into structured filters (language, industry, format) before the vector search.",
        "Service worker caching and AVIF/WebP assets bring the unified app under four seconds on slow 3G.",
        "Multi tenant chapter provisioning with Stripe payments, role based notifications, and GPT-4o mini drafting a new chapter's site in under 60 seconds.",
      ],
      result: "One platform for 20+ international chapters, searchable in 10+ languages.",
    },
  },
  {
    slug: "noxturn",
    name: "Noxturn",
    year: "2026",
    tag: "HackASU 2026",
    demo: "recovery",
    accent: "#8fd3b6",
    description:
      "A recovery planner for rotating shift workers. A circadian risk engine flags dangerous schedules, then Claude writes a personalized 24 hour recovery plan backed by clinical evidence.",
    tech: ["Next.js", "FastAPI", "Claude", "Supabase", "RAG", "Fitbit OAuth"],
    live: "https://noxturn.vercel.app",
    caseStudy: {
      problem:
        "Nurses, paramedics, and factory staff flip between days and nights with no guidance beyond 'get some sleep'. The risky patterns are predictable from the schedule itself.",
      approach: [
        "A five step onboarding captures role, commute, chronotype, and medical history.",
        "The risk engine detects rapid flips, short turnarounds, and unsafe drive windows from the shift pattern.",
        "Claude Haiku writes the 24 hour plan with a RAG pipeline over clinical evidence cards (sentence transformers), so advice cites evidence.",
        "Fitbit OAuth 2.0 brings in real HRV and sleep data; a 7 day heatmap shows recovery and strain.",
      ],
      result: "Built and demoed at HackASU 2026.",
    },
  },
  {
    slug: "claimcheck",
    name: "ClaimCheck",
    year: "2026",
    tag: "Side project",
    demo: "verdict",
    accent: "#ffd166",
    description:
      "A multi agent decision guard for meetings. Gemini extracts claims from the transcript, Claude verifies each one against company documents and live web search, and every verdict ships with evidence.",
    tech: ["Python", "FastAPI", "Gemini", "Claude", "ChromaDB", "Tavily"],
    code: "https://github.com/areja1/ClaimCheck",
    caseStudy: {
      problem: "Teams make decisions on claims nobody checks until the meeting is over.",
      approach: [
        "Claim extractor (Gemini) pulls checkable statements out of the transcript.",
        "Verifier (Claude) checks each against RAG over company documents in ChromaDB and live web search through Tavily.",
        "Verdicts are Verified, Contradicted, or Uncertain, each with evidence and a risk note. Low confidence claims route to a human.",
        "Plug and play LLM switching between OpenAI and Anthropic.",
      ],
      result: "Fewer hallucinated verdicts reach the team, and wrong decisions get caught before they are made.",
    },
  },
  {
    slug: "safecircle",
    name: "SafeCircle",
    year: "2026",
    tag: "Innovation Hacks",
    demo: "crisis",
    accent: "#8fd3b6",
    description:
      "A community financial safety net for immigrants, gig workers, and credit invisible families, with shared emergency pools and a Crisis Mode that walks someone through job loss or an ER visit step by step.",
    tech: ["Next.js", "FastAPI", "Supabase", "Claude", "Recharts", "i18next"],
    live: "https://safe-circle-innovation-hacks.vercel.app",
    code: "https://github.com/areja1/SafeCircle-Innovation-hacks",
    caseStudy: {
      problem:
        "People outside the credit system have no buffer. A single ER visit or missed gig week becomes a crisis, and the help that exists is scattered and in the wrong language.",
      approach: [
        "Risk X-Ray scan, a group dashboard, and a shared emergency pool for a circle of trusted people.",
        "Insurance gap cards, a benefits finder, and a poverty tax meter.",
        "Crisis Mode: step by step financial triage for job loss, ER visits, accidents, and more, with Claude generating guidance in real time.",
        "English and Spanish through i18next, on Supabase with role based access.",
      ],
      result: "Built and demoed at Innovation Hacks.",
    },
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
      "Java Swing desktop app for sprint planning with role switching, blockers, spikes, and JSON persistence.",
  },
  {
    name: "Tkinter music player",
    year: "2023",
    description: "A small MP3 player in Python with folder import and JSON favourites.",
    code: "https://github.com/areja1/musicplayer",
  },
];

export const bySlug = (slug) => PROJECTS.find((p) => p.slug === slug);
