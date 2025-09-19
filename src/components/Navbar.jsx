import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const getHeaderHeight = () => {
  const nav = document.querySelector("nav");
  return nav?.offsetHeight ?? 64; // fallback
};

// Case-insensitive section lookup: "#Contact" -> element with id "contact"
const getSectionEl = (href) => {
  if (!href?.startsWith("#")) return null;
  const id = href.slice(1);
  // try exact match first
  let el = document.getElementById(id);
  if (el) return el;
  // fallback: case-insensitive search
  const allWithId = Array.from(document.querySelectorAll("[id]"));
  return allWithId.find((n) => n.id.toLowerCase() === id.toLowerCase()) || null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("About");

  const navItems = [
    { href: "#About", label: "About" },
    { href: "#Portofolio", label: "Portofolio" },
    { href: "#contact", label: "Contact" },
  ];

  // Robust active-section tracking using IntersectionObserver
  useEffect(() => {
    let observer;
    const observe = () => {
      const headerH = getHeaderHeight();

      // Update background-on-scroll
      const onScrollBG = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", onScrollBG);
      onScrollBG();

      observer = new IntersectionObserver(
        (entries) => {
          // Choose the most visible intersecting section
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visible?.target?.id) {
            setActiveSection(visible.target.id);
          }
        },
        {
          root: null,
          // Push top boundary by header height so a section becomes active only
          // after it clears under the sticky navbar
          rootMargin: `-${headerH + 8}px 0px -45% 0px`,
          threshold: [0.25, 0.4, 0.5, 0.75],
        }
      );

      // Start observing each section in navItems
      navItems.forEach((item) => {
        const el = getSectionEl(item.href);
        if (el) observer.observe(el);
      });

      // Cleanup
      return () => {
        window.removeEventListener("scroll", onScrollBG);
        observer && observer.disconnect();
      };
    };

    // initial attach
    const cleanup = observe();

    // reattach on resize to refresh header height / margins
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cleanup && cleanup();
        // re-observe with new header height
        observe();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cleanup && cleanup();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = getSectionEl(href);
    const headerH = getHeaderHeight();
    if (section) {
      const y = Math.max(0, section.offsetTop - headerH - 16); // leave some air
      window.scrollTo({ top: y, behavior: "smooth" });
      // Optimistically set active to avoid brief mismatch until IO callback fires
      setActiveSection(section.id);
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isOpen
          ? "bg-[#030014] opacity-100"
          : scrolled
          ? "bg-[#030014]/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#About"
              onClick={(e) => scrollToSection(e, "#About")}
              className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
            >
              Abhinav Reja
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="group relative px-1 py-2 text-sm font-medium"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      activeSection.toLowerCase() ===
                      item.href.substring(1).toLowerCase()
                        ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                        : "text-[#e2d3fd] group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                      activeSection.toLowerCase() ===
                      item.href.substring(1).toLowerCase()
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden h-2/5 fixed inset-0 bg-[#030014] transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-100%] pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 space-y-4 flex-1 ">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                  activeSection.toLowerCase() ===
                  item.href.substring(1).toLowerCase()
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                    : "text-[#e2d3fd] hover:text-white"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isOpen ? "translateX(0)" : "translateX(50px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
