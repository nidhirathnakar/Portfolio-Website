import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  const menuItems = [
    { id: "hero", label: "HERO" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "TIMELINE" },
    { id: "contact", label: "CONTACT" }
  ];

  // Theme synchronization effect
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Update active section and handle hide-on-scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      
      // Determine visibility
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }
      
      lastScrollYRef.current = currentScrollY;

      // Track active section
      const scrollPosition = currentScrollY + window.innerHeight * 0.45;
      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const showNav = isVisible || isMobileMenuOpen;

  return (
    <>
      <motion.nav 
        animate={{ 
          y: showNav ? 0 : -100, 
          opacity: showNav ? 1 : 0 
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-40 px-6 flex justify-center"
      >
        <div className="w-full max-w-5xl flex items-center justify-between glass-panel px-6 py-3.5 rounded-full border-white/5">
          {/* Logo Name */}
          <div 
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-2.5 h-2.5 bg-accent-orange rounded-full group-hover:scale-125 transition-transform" />
            <span className="font-title text-sm tracking-widest text-white font-extrabold uppercase">
              NIDHI
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-4 py-1.5 text-[10px] font-mono font-bold tracking-widest transition-colors duration-300 ${
                    active ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 rounded-full border border-accent-orange/30 bg-accent-orange/[0.04] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Theme HUD Toggle Panel */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                theme === "light" 
                  ? "border-accent-orange/40 text-accent-orange hover:bg-accent-orange/5 hover:scale-105 shadow-[0_0_8px_rgba(255,94,0,0.15)]" 
                  : "border-neutral-800 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300 hover:scale-105"
              }`}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-accent-orange" />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2 border border-neutral-800 text-neutral-400 hover:text-white rounded-full cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[88px] z-30 bg-[#030303]/95 backdrop-blur-xl px-8 py-12 md:hidden flex flex-col items-center gap-8 border-b border-neutral-900"
          >
            <div className="absolute inset-0 bg-dots-cyber opacity-15 pointer-events-none" />
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-2xl font-title tracking-[0.2em] font-extrabold uppercase transition-all ${
                    active ? "text-accent-orange glow-text-orange" : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
