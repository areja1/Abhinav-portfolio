// Work history, newest first. Wording follows the current resume.

const EXPERIENCE = [
  {
    company: "OZZI (OZO Development LLC)",
    role: "Forward Deployed Engineer",
    location: "Phoenix, AZ",
    start: "Jun 2026",
    end: "Present",
    summary:
      "Client facing engineering. I own a product from the first conversation to production, including the parts nobody asks for until they break.",
    bullets: [
      "Shipped a travel insurance servicing chatbot (Next.js, TypeScript, Claude, Supabase Postgres) for policy questions and flight delay claim intake. It verifies live delays through the AviationStack API and computes payouts with deterministic rules. Layered Anthropic prompt caching cut LLM cost by 71%.",
      "Rebuilt claim state from conversation history on every request, so behavior is deterministic and tests replay the same way on any server instance.",
      "Set release gates: a 42 case claim regression suite, 95 conversational scenarios, and PII redaction checks, all run before a deploy.",
      "Built a recommendation engine that ranks high visibility campaign sign locations across about 11,000 ADOT traffic points, using PostGIS, OpenStreetMap road modeling, spacing rules, and district anchored geocoding.",
    ],
    tech: ["TypeScript", "Next.js", "Claude API", "Supabase", "PostGIS", "Vercel"],
  },
  {
    company: "Vosyn Inc.",
    role: "Backend Developer Intern",
    location: "Chicago, IL (remote)",
    start: "Jun 2025",
    end: "Aug 2025",
    bullets: [
      "Built a history aware content recommendation API on a fine tuned Llama 3 8B (LoRA) classifier across 50+ genres, with batch inference and cached lookups. A/B tested at a 15% lift in click through rate.",
      "Redesigned the PostgreSQL schema for audio, video, and text content with composite indexes and normalized relations, cutting p90 retrieval latency by about 30% across three downstream services.",
      "Moved bulk audio and video ingestion into a Django REST batch pipeline, taking heavy media work out of synchronous requests and cutting end to end ingestion time by 11%.",
      "Added a Java and Cucumber integration test framework to the GitHub Actions pipeline, cutting regression testing time per release by 15%.",
    ],
    tech: ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Docker", "GCP", "Llama 3", "Cucumber"],
  },
  {
    company: "WINspect Technologies Pvt. Ltd.",
    role: "Software Engineer",
    location: "Mumbai, India",
    start: "Jan 2023",
    end: "May 2024",
    bullets: [
      "Built C++ REST APIs for a GPS time sync dashboard serving 500+ distributed clients at sub 200 ms p95 latency.",
      "Added a Redis caching layer with short TTLs for synchronization data, halving average read latency under high frequency polling.",
      "Automated 40+ integration tests with Google Test and wired them into Jenkins, cutting manual regression effort per release by 30%.",
      "Wrote Python automation to diagnose and fix recurring production failures, cutting ticket resolution time by 18%.",
    ],
    tech: ["C++", "Google Test", "Python", "Redis", "REST", "Linux", "Jenkins"],
  },
  {
    company: "Wipro Limited",
    role: "Web Developer Intern",
    location: "Bangalore, India",
    start: "Feb 2022",
    end: "Apr 2022",
    bullets: [
      "Built the front end of an e-voting system in HTML, CSS, and JavaScript, tuned the MySQL schema and queries, and tightened token based validation.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
  },
];

export default EXPERIENCE;
