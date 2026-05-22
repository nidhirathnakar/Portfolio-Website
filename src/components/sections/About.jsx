import { useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, Code2, Cpu, Link } from "lucide-react";

export default function About() {
  const [isTapped, setIsTapped] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const focusAreas = [
    { icon: <Cpu className="w-4.5 h-4.5 text-accent-orange" />, title: "Artificial Intelligence", desc: "Building neural networks, natural language processors, and integrating AI models into scalable apps." },
    { icon: <Link className="w-4.5 h-4.5 text-accent-orange" />, title: "Web3 & Blockchain", desc: "Designing secure smart contracts in Solidity and decentralized apps leveraging Ethereum protocols." },
    { icon: <Code2 className="w-4.5 h-4.5 text-accent-orange" />, title: "Full Stack Development", desc: "Developing highly responsive frontend client structures integrated with robust backend systems." },
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-screen w-full flex items-center justify-center py-14 md:py-24 px-6 overflow-hidden bg-[#030303]/30"
    >
      <div className="absolute inset-0 bg-dots-cyber opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN - Holographic Photo Frame */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardVariants}
          className="lg:col-span-5 flex justify-center"
        >
          <div 
            onMouseDown={() => setIsTapped(true)}
            onMouseUp={() => setIsTapped(false)}
            onTouchStart={() => setIsTapped(true)}
            onTouchEnd={() => setIsTapped(false)}
            className="relative w-full max-w-[320px] aspect-[3/4] rounded-sm border border-neutral-800 bg-neutral-950/40 p-3 group overflow-hidden cursor-pointer"
          >
            {/* Ambient inner card glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Cyberpunk corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-600 group-hover:border-accent-orange transition-colors" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neutral-600 group-hover:border-accent-orange transition-colors" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neutral-600 group-hover:border-accent-orange transition-colors" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-600 group-hover:border-accent-orange transition-colors" />
            
            {/* Cyber scanline sweeps */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-orange/40 shadow-[0_0_8px_#ff5e00] animate-scan-line pointer-events-none z-10" />

            {/* Inner holographic picture frame */}
            <div className="relative w-full h-full bg-neutral-900 overflow-hidden flex items-center justify-center">
              <img 
                src="/nidhi.png" 
                alt="Nidhi" 
                className={`w-full h-full object-cover filter contrast-115 brightness-95 transition-all duration-700 ${
                  isTapped ? "grayscale-0 scale-105" : "grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
                }`}
              />
              
              {/* Tech details hud overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 border-t border-neutral-800 px-3 py-2 text-[9px] font-mono text-neutral-500 flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <User className="w-2.5 h-2.5 text-accent-orange" />
                  NIDHI
                </span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-accent-orange" />
                  BLR, IN
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Bio Details */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Section ID Header */}
          <motion.div 
            variants={cardVariants}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-xs text-accent-orange font-bold tracking-widest">[01 // IDENTITY]</span>
            <div className="h-[1px] w-12 bg-neutral-800" />
          </motion.div>

          {/* Section Main Title */}
          <motion.h2 
            variants={cardVariants}
            className="font-title text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-6 uppercase"
          >
            THE COGNITIVE PATHWAY
          </motion.h2>

          {/* Bio text */}
          <motion.p 
            variants={cardVariants}
            className="text-neutral-300 font-light text-sm md:text-base leading-relaxed mb-6"
          >
            I am a passionate <b>Computer Science Engineering student</b> and developer dedicated to crafting intelligent, scalable, and visually immersive digital solutions. My engineering focus centers around combining the power of <b>Artificial Intelligence</b> with decentralized <b>Web3/Blockchain architectures</b> and robust full stack client interfaces.
          </motion.p>

          <motion.p 
            variants={cardVariants}
            className="text-neutral-400 font-light text-sm leading-relaxed mb-8"
          >
            Driven by continuous innovation and curiosity, I focus on building software that solves complex real-world logic challenges while delivering elegant, responsive, and memorable user experiences.
          </motion.p>

          {/* Core Focus cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {focusAreas.map((area, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="p-4 rounded-sm border border-neutral-900 bg-neutral-950/40 hover:border-neutral-800 hover:bg-neutral-950/70 transition-all group"
              >
                <div className="mb-3 p-1.5 w-fit rounded-sm bg-neutral-900 border border-neutral-800 group-hover:border-accent-orange/40 transition-colors">
                  {area.icon}
                </div>
                <h3 className="font-mono text-[11px] font-bold text-white tracking-wider mb-2 uppercase">
                  {area.title}
                </h3>
                <p className="text-[10px] text-neutral-500 leading-relaxed">
                  {area.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Skills quick badges */}
          <motion.div 
            variants={cardVariants}
            className="flex flex-wrap gap-2 text-[9px] font-mono tracking-widest text-neutral-500 uppercase"
          >
            <span className="px-2.5 py-1 rounded-sm bg-neutral-900 border border-neutral-800">FULL STACK</span>
            <span className="px-2.5 py-1 rounded-sm bg-neutral-900 border border-neutral-800">UI / UX ARCHITECTURE</span>
            <span className="px-2.5 py-1 rounded-sm bg-neutral-900 border border-neutral-800">INTELLIGENT SYSTEMS</span>
            <span className="px-2.5 py-1 rounded-sm bg-neutral-900 border border-neutral-800">DECENTRALIZED LOGIC</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
