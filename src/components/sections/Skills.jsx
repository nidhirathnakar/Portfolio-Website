import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Laptop, Database, Link, Cpu, Wrench } from "lucide-react";

// Interactive Mouse-Tilt wrapper for cards
function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate inside the card
    const y = e.clientY - rect.top;  // y coordinate inside the card

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    // Shift rotate from -10deg to +10deg
    const rotateX = (percentY - 0.5) * -12;
    const rotateY = (percentX - 0.5) * 12;

    setTilt({ x: rotateX, y: rotateY });
    setGlow({ x: percentX * 100, y: percentY * 100 });
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease",
      }}
      className={`relative overflow-hidden rounded-sm border border-neutral-900 bg-neutral-950/45 ${className}`}
    >
      {/* Dynamic hover lighting glow spot */}
      <div 
        style={{
          background: `radial-gradient(120px circle at ${glow.x}% ${glow.y}%, rgba(255, 94, 0, 0.08), transparent 80%)`
        }}
        className="absolute inset-0 pointer-events-none"
      />
      {children}
    </div>
  );
}

export default function Skills() {
  const skillCategories = [
    {
      title: "LANGUAGES",
      icon: <Terminal className="w-4 h-4 text-accent-orange" />,
      skills: ["C", "C++", "Java", "Python", "JavaScript"]
    },
    {
      title: "FRONTEND",
      icon: <Laptop className="w-4 h-4 text-accent-orange" />,
      skills: ["HTML", "CSS", "React.js", "TailwindCSS", "Three.js"]
    },
    {
      title: "BACKEND",
      icon: <Database className="w-4 h-4 text-accent-orange" />,
      skills: ["Node.js", "Flask", "MongoDB"]
    },
    {
      title: "BLOCKCHAIN",
      icon: <Link className="w-4 h-4 text-accent-orange" />,
      skills: ["Solidity", "Hardhat", "Ethereum", "Web3.js", "MetaMask"]
    },
    {
      title: "AI / MACHINE LEARNING",
      icon: <Cpu className="w-4 h-4 text-accent-orange" />,
      skills: ["Machine Learning", "NLP", "YOLO", "AI Integration"]
    },
    {
      title: "TOOLS & DEV",
      icon: <Wrench className="w-4 h-4 text-accent-orange" />,
      skills: ["Git", "GitHub", "VS Code"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="skills" 
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-cyber opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent-orange font-bold tracking-widest">[02 // MATRIX]</span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </div>
        
        <h2 className="font-title text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-12 uppercase">
          SKILLS & SYSTEM INVENTORY
        </h2>

        {/* Grid of Categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TiltCard className="h-full p-6 hover:border-accent-orange/20 hover:shadow-[0_0_20px_rgba(255,94,0,0.06)] transition-all">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-900">
                  <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm">
                    {cat.icon}
                  </div>
                  <h3 className="font-mono text-xs font-bold text-white tracking-[0.15em] uppercase">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills tags list */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div 
                      key={sIdx}
                      className="px-3 py-1.5 rounded-sm bg-neutral-900/60 border border-neutral-900 text-[10px] font-mono text-neutral-400 hover:text-white hover:border-accent-orange/45 hover:bg-accent-orange/[0.02] cursor-default transition-all duration-300 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-accent-orange transition-colors" />
                      {skill}
                    </div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
