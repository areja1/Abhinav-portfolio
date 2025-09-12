import chatbotImg from "../assets/react.svg";

const PROJECTS = [
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
