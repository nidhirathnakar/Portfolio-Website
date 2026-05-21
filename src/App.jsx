import { useEffect, useState } from "react";
import Lenis from "lenis";
import BackgroundCanvas from "./components/canvas/BackgroundCanvas";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/sections/LoadingScreen";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Achievements from "./components/sections/Achievements";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";
import { ArrowUp } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis scroll engine for smooth inertia scrolling
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard smooth inertia curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Cinematic Loading Portal */}
      <LoadingScreen onComplete={() => setLoading(false)} />
      
      {!loading && (
        <div className="relative min-h-screen">
          {/* Three.js R3F Backdrop */}
          <BackgroundCanvas />

          {/* Trailing Pointer Particles */}
          <CustomCursor />

          {/* Fixed HUD Navigation Menu */}
          <Navbar />

          {/* DOM Story Layout */}
          <main className="relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Experience />
            <Contact />
          </main>

          {/* Digital System Footer */}
          <footer className="relative z-10 w-full border-t border-neutral-900 bg-neutral-950/60 backdrop-blur-md py-8 px-6 text-center text-[10px] font-mono text-neutral-600">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} NIDHI. ALL CHANNELS SECURED.</p>
              <div className="flex gap-6">
                <a 
                  href="https://github.com/nidhirathnakar" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent-orange transition-colors"
                >
                  GITHUB
                </a>
                <a 
                  href="https://www.linkedin.com/in/nidhi-rathnakar-317b5723a" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent-orange transition-colors"
                >
                  LINKEDIN
                </a>
                <a 
                  href="mailto:nidhirathnakar@gmail.com" 
                  className="hover:text-accent-orange transition-colors"
                >
                  MAIL
                </a>
              </div>
            </div>
          </footer>

          {/* Scroll to Top Utility */}
          {showScrollTop && (
            <button
              onClick={handleScrollTop}
              className="fixed bottom-6 right-6 z-40 p-2.5 rounded-sm border border-neutral-800 bg-neutral-950/80 text-neutral-500 hover:text-white hover:border-accent-orange/45 hover:shadow-[0_0_12px_rgba(255,94,0,0.2)] transition-all animate-fade-in"
              title="Return to System Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default App;
