import { motion } from "framer-motion";
import { ArrowDown, FileText, Send, ChevronRight } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const nameLetterVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.035,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const nameString = "NIDHI";

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-12 md:py-0"
    >
      {/* Background HUD graphics */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-accent-orange/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#00ffff]/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.03] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        {/* Subtle Cyber Status Badge */}
        <motion.div 
          variants={itemVariants}
          className="mb-6 md:mb-8 px-4 py-1.5 rounded-full border border-accent-orange/20 bg-accent-orange/[0.03] flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-accent-orangeLight font-bold uppercase">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Giant Staggered Typography Reveal */}
        <h1 className="font-title font-extrabold text-5xl md:text-8xl lg:text-9xl text-white tracking-[0.12em] uppercase leading-none overflow-hidden flex flex-wrap justify-center mb-4 md:mb-6">
          {nameString.split("").map((letter, idx) => (
            <motion.span
              key={idx}
              custom={idx}
              variants={nameLetterVariants}
              className={`inline-block ${letter === " " ? "w-[0.3em]" : ""}`}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Dynamic Title Subheader */}
        <motion.div variants={itemVariants} className="mb-4 md:mb-6 w-full max-w-3xl px-6 flex justify-center">
          <h2 className="font-mono text-[10px] sm:text-sm md:text-base tracking-[0.12em] sm:tracking-[0.25em] text-neutral-500 uppercase text-center leading-relaxed sm:whitespace-nowrap">
            Computer Science Engineer <span className="text-accent-orange px-1">•</span> AI <span className="text-accent-orange px-1">•</span> Web3 <span className="text-accent-orange px-1">•</span> Full Stack Developer
          </h2>
        </motion.div>

        {/* Elegant Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-neutral-400 text-base md:text-lg lg:text-xl font-light tracking-wide max-w-2xl leading-relaxed mb-6 md:mb-12"
        >
          Building intelligent systems, immersive digital experiences, and futuristic decentralized applications.
        </motion.p>

        {/* Cyber CTA Button Console */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center"
        >
          {/* Projects Button */}
          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm cyber-button flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-white"
          >
            <span>VIEW PROJECTS</span>
            <ChevronRight className="w-3.5 h-3.5 text-accent-orange group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Resume Button */}
          <a
            href="/resume/Nidhi_Rathnakar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-neutral-800 bg-neutral-950/20 backdrop-blur-sm hover:border-neutral-700 hover:text-white flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </a>

          {/* Contact Button */}
          <button
            onClick={() => handleScrollTo("contact")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-neutral-800 bg-neutral-950/20 backdrop-blur-sm hover:border-accent-orange/30 hover:text-white flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 transition-all hover:shadow-[0_0_15px_rgba(255,94,0,0.15)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating HUD status labels */}
      <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-1 text-[9px] sm:text-[10px] font-mono text-neutral-600 tracking-wider">
        <p>CAM_POS: [SCROLL_INTERPOLATION]</p>
        <p>MATRIX_RENDERER: THREE_R3F</p>
      </div>

      <div className="absolute bottom-10 right-10 hidden xl:flex flex-col gap-1 text-[9px] sm:text-[10px] font-mono text-neutral-600 tracking-wider text-right">
        <p>LOC: 12.9716° N, 77.5946° E</p>
        <p>SYSTEM_HZ: 60 FPS</p>
      </div>

      {/* Breathing Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={() => handleScrollTo("about")}
        className="relative bottom-auto left-auto translate-x-0 mt-12 md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:mt-0 cursor-pointer flex flex-col items-center gap-1.5 md:gap-2 group z-10"
      >
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-neutral-600 group-hover:text-accent-orange transition-colors uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-9 md:w-6 md:h-10 border border-neutral-800 rounded-full flex justify-center p-1 group-hover:border-accent-orange/50 transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-accent-orange rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
