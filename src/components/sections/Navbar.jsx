import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Web Audio Synth references
  const audioCtxRef = useRef(null);
  const droneOscRef = useRef(null);
  const droneFilterRef = useRef(null);
  const droneGainRef = useRef(null);

  const menuItems = [
    { id: "hero", label: "HERO" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "TIMELINE" },
    { id: "contact", label: "CONTACT" }
  ];

  // Initialize Web Audio API synth
  const initAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Create filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 180;
      filter.Q.value = 8;
      droneFilterRef.current = filter;

      // Create oscillator (Low drone)
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = 55; // A1 note
      osc.connect(filter);
      droneOscRef.current = osc;

      // Create gain node
      const gain = ctx.createGain();
      gain.gain.value = 0.05; // soft volume
      filter.connect(gain);
      gain.connect(ctx.destination);
      droneGainRef.current = gain;

      osc.start();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  };

  // Play micro click sound for HUD interaction
  const playClickSound = () => {
    if (isMuted || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.085);
    } catch (e) {}
  };

  const toggleAudio = () => {
    if (isMuted) {
      if (!audioCtxRef.current) {
        initAudio();
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (droneGainRef.current) {
        droneGainRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 0.2);
      }
      setIsMuted(false);
    } else {
      if (droneGainRef.current && audioCtxRef.current) {
        droneGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
      setIsMuted(true);
    }
  };

  // Adjust drone synth filter cutoff on mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMuted && droneFilterRef.current && audioCtxRef.current) {
        const mousePct = e.clientX / window.innerWidth;
        const targetFreq = 100 + mousePct * 450; // shift cutoff from 100Hz to 550Hz
        droneFilterRef.current.frequency.setTargetAtTime(
          targetFreq, 
          audioCtxRef.current.currentTime, 
          0.1
        );
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMuted]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (droneOscRef.current) {
        try {
          droneOscRef.current.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    playClickSound();
    const element = document.getElementById(id);
    if (element) {
      // Lenis handles smooth scrolling, scrollIntoView triggers standard scroll behaviour which Lenis intercepts and smooths
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-40 px-6 flex justify-center">
        <div className="w-full max-w-5xl flex items-center justify-between glass-panel px-6 py-3.5 rounded-full border-white/5">
          {/* Logo Name */}
          <div 
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-2.5 h-2.5 bg-accent-orange rounded-full group-hover:scale-125 transition-transform" />
            <span className="font-title text-sm tracking-widest text-white font-extrabold uppercase">
              NIDHI R.
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
                  onMouseEnter={playClickSound}
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

          {/* Audio HUD Panel */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAudio}
              onMouseEnter={playClickSound}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isMuted 
                  ? "border-neutral-800 text-neutral-500 hover:border-neutral-700" 
                  : "border-accent-orange/50 text-accent-orange shadow-[0_0_8px_#ff5e00] hover:scale-105"
              }`}
              title={isMuted ? "Unmute Ambient Drone Synthesizer" : "Mute Ambient Drone"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <div className="flex items-center gap-0.5">
                  <Volume2 className="w-3.5 h-3.5 mr-1" />
                  <div className="flex items-end h-2.5">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>
                </div>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => {
                playClickSound();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2 border border-neutral-800 text-neutral-400 hover:text-white rounded-full"
            >
              {isMobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </nav>

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
