import React, { useEffect, useState, useCallback } from "react";

import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";

import AOS from "aos";
import "aos/dist/aos.css";

import { Code, Award, Boxes, Briefcase } from "lucide-react";
import PROJECTS from "../data/projects";
import { EXPERIENCES } from "../data/experiences";

/* -------------------------------------------------------------------------- */
/* Small reusable Show More/Less button                                       */
/* -------------------------------------------------------------------------- */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 shadow hover:shadow-md relative overflow-hidden group"
  >
    <span className="relative z-10">{isShowingMore ? "Show Less" : "Show More"}</span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);
ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

/* -------------------------------------------------------------------------- */
/* MUI TabPanel helper                                                        */
/* -------------------------------------------------------------------------- */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 }, overflow: "hidden" }}>
          <Typography component="div" color="inherit" sx={{ color: "inherit" }}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

/* -------------------------------------------------------------------------- */
/* Tech stack icons (served from /public or CDN)                              */
/* -------------------------------------------------------------------------- */
const techStacks = [
  // Local files that already exist in /public
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "reactjs.svg", language: "React" },
  { icon: "nodejs.svg", language: "Node.js" },

  // From resume (CDN icons)
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", language: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", language: "Python" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", language: "Django" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-plain.svg", language: "FastAPI" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", language: "Flask" },
  { icon: "https://cdn.simpleicons.org/openai/ffffff", language: "OpenAI" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f9e0.svg", language: "AI/ML" },
  { icon: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4ac.svg", language: "LLMs" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", language: "Spring" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg", language: "Hibernate" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", language: "PostgreSQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", language: "MySQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", language: "Redis" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", language: "Docker" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", language: "GCP" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg", language: "Elasticsearch" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", language: "Git" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", language: "Jira" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", language: "Postman" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", language: "C" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", language: "C++" },
];

/* -------------------------------------------------------------------------- */
/* Main page                                                                  */
/* -------------------------------------------------------------------------- */
export default function Portofolio() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  // Smooth scroll helper
  const scrollToPortfolio = () => {
    const el = document.getElementById("Portofolio");
    if (!el) return;
    const offset = 96; // adjust if you have a sticky header
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Read "?tab=" from hash and smooth scroll to #Portofolio. Scrub hash after.
  useEffect(() => {
    const applyTab = (name) => {
      if (!name) return;
      // 0=Experience, 1=Projects, 2=Tech Stack, 3=Achievements
      const map = { experience: 0, projects: 1, tech: 2, stack: 2, techstack: 2, achievements: 3 };
      if (Object.prototype.hasOwnProperty.call(map, name)) {
        setValue(map[name]);
      }
    };

    const readHash = () => {
      const raw = (window.location.hash || "").toLowerCase();
      const [path, qs] = raw.split("?");
      const params = new URLSearchParams(qs || "");
      const tab = params.get("tab");
      applyTab(tab);
      if (path.includes("#portofolio")) {
        scrollToPortfolio();
        setTimeout(() => {
          try {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          } catch {}
        }, 400);
      }
    };

    readHash();
    const onHash = () => readHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [location.hash]);

  const [projects, setProjects] = useState([]);

  // Experience state (local file)
  const [experiences, setExperiences] = useState([]);
  const [showAllExperiences, setShowAllExperiences] = useState(false);

  const [showAllProjects, setShowAllProjects] = useState(false);

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const initialItems = isMobile ? 4 : 6;

  // Initialize AOS once
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  // Load experiences from local file safely
  useEffect(() => {
    try {
      const src = Array.isArray(EXPERIENCES) ? EXPERIENCES : [];
      const sorted = [...src].sort((a, b) => (b?.order ?? 0) - (a?.order ?? 0));
      setExperiences(sorted);
    } catch (e) {
      console.error("Failed to load EXPERIENCES:", e);
      setExperiences([]);
    }
  }, []);

  // Load only local PROJECTS
  const fetchData = useCallback(() => {
    try {
      const projectData = PROJECTS;
      setProjects(projectData);
    } catch (error) {
      console.error("Error initializing projects:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (_e, newValue) => setValue(newValue);
  const handleChangeIndex = (index) => setValue(index);

  const toggleShowMore = (type) => {
    if (type === "projects") setShowAllProjects((p) => !p);
    if (type === "experiences") setShowAllExperiences((p) => !p);
  };

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedExperiences = showAllExperiences ? experiences : experiences.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio
        </h2>
        <p className="mt-3 text-slate-400">Experience, Projects, Tech Stack & Achievements</p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "transparent",
            color: "#fff",
            boxShadow: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            overflowX: "auto",
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isNarrow ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="portfolio tabs"
            textColor="inherit"
            indicatorColor="secondary"
            TabIndicatorProps={{ style: { height: "0px" } }}
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                },
              },
              "& .Mui-selected": {
                color: "#ffffff !important",
                background: "linear-gradient(90deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
              "& .MuiTabs-indicator": { height: 0 },
              "& .MuiTabs-flexContainer": { gap: "8px" },
            }}
          >
            <Tab icon={<Briefcase className="mb-2 w-5 h-5 transition-all duration-300" />} label="Experience" {...a11yProps(0)} />
            <Tab icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />} label="Projects" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />} label="Tech Stack" {...a11yProps(2)} />
            <Tab icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />} label="Achievements" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
          {/* Experience (index 0) */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedExperiences.map((exp, idx) => (
                  <div
                    key={(exp.company || "") + (exp.role || "") + idx}
                    className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    data-aos={idx % 3 === 0 ? "fade-up-right" : idx % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={idx % 3 === 1 ? "1200" : "1000"}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-white">{exp.role}</h3>
                      <span className="text-sm text-gray-400">
                        {exp.start} – {exp.end}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="font-bold text-white">{exp.company}</span>
                      <span className="text-gray-500"> • </span>
                      <span className="text-gray-300">{exp.location}</span>
                    </div>
                    <ul className="mt-3 list-disc list-inside space-y-1.5 text-gray-300">
                      {(exp.bullets || []).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    {exp.tech?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {experiences.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => toggleShowMore("experiences")} isShowingMore={showAllExperiences} />
              </div>
            )}
          </TabPanel>

          {/* Projects (index 1) */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    className="min-w-0"
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>

            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton onClick={() => toggleShowMore("projects")} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          {/* Tech Stack (index 2) */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* Achievements (index 3) */}
          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="w-full">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <Certificate />
                </div>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
