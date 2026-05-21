import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShieldAlert, Cpu, Database, Server, Box } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// Project Tilt Card Wrapper
function ProjectTiltCard({ children, className }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const rotateX = (percentY - 0.5) * -8;
    const rotateY = (percentX - 0.5) * 8;

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
        transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease",
      }}
      className={`relative overflow-hidden rounded-sm border border-neutral-900 bg-neutral-950/40 interactive-card ${className}`}
    >
      <div 
        style={{
          background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(255, 94, 0, 0.09), transparent 80%)`
        }}
        className="absolute inset-0 pointer-events-none"
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const projectsData = [
    {
      id: "decentraestate",
      title: "DECENTRAESTATE",
      gitUrl: "https://github.com/nidhirathnakar/DECENTRAESTATE",
      desc: "A decentralized real estate management platform enabling secure property registration, fractional ownership transfers, and fraud prevention through smart contracts and MetaMask authentication.",
      tech: ["Solidity", "Hardhat", "Ethereum", "Web3.js", "MetaMask", "Node.js"],
      icon: <Box className="w-5 h-5 text-accent-orange" />,
      accentColor: "#ff5e00",
      graphic: (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-48 h-48 border border-accent-orange/15 rounded-lg animate-spin duration-15000 relative flex items-center justify-center">
            <div className="w-36 h-36 border border-dashed border-accent-orange/20 rounded-full animate-pulse" />
            <div className="absolute w-2 h-2 bg-accent-orange rounded-full top-0 left-1/2 -translate-x-1/2" />
            <div className="absolute w-2 h-2 bg-[#00ffff] rounded-full bottom-0 left-1/2 -translate-x-1/2" />
            <div className="w-16 h-16 border border-accent-orange/30 rotate-45 flex items-center justify-center">
              <span className="font-mono text-[9px] text-accent-orange select-none tracking-widest">BLOCK</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "malicious-detector",
      title: "AI MALICIOUS DETECTOR",
      gitUrl: "https://github.com/nidhirathnakar/AI-Malicious-Website-detector-extension",
      desc: "An AI-powered Chrome security extension executing real-time website URL scanning. Utilizes local machine learning classification algorithms and a Flask api backend to alert users of phishing attempts.",
      tech: ["Python", "Flask", "Machine Learning", "JavaScript", "Extension API", "HTML/CSS"],
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      accentColor: "#ef4444",
      graphic: (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-full h-full relative overflow-hidden bg-grid-cyber opacity-10"></div>
          <div className="absolute w-40 h-40 border border-red-500/20 rounded-sm flex flex-col justify-between p-2 font-mono text-[8px] text-red-500/60">
            <div className="flex justify-between items-center border-b border-red-500/20 pb-1">
              <span>SCANNER_V1</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            </div>
            <div className="space-y-0.5">
              <p>URL: HTTPS://UNKNOWN_SRC...</p>
              <p>STATUS: CLASSIFYING...</p>
              <p className="text-red-500 font-bold">THREAT_LEVEL: DANGER</p>
            </div>
            <div className="w-full h-1 bg-red-500/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-red-500 animate-scan-line w-full" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "cliniq",
      title: "CLINIQ PLATFORM",
      gitUrl: "https://github.com/nidhirathnakar/clinIQ",
      desc: "A medical practice management infrastructure simplifying appointment bookings, digital patient records, and doctor scheduling, coupled with medical NLP classification features.",
      tech: ["Python", "Machine Learning", "NLP", "Flask", "MongoDB", "JavaScript"],
      icon: <Cpu className="w-5 h-5 text-[#00ffff]" />,
      accentColor: "#00ffff",
      graphic: (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-48 h-20 relative flex items-center justify-center">
            {/* SVG electrocardiogram pulse */}
            <svg viewBox="0 0 200 80" className="w-full h-full stroke-[#00ffff]/30 fill-none stroke-2">
              <path d="M 0,40 L 40,40 L 50,20 L 60,60 L 70,40 L 110,40 L 120,5 L 130,75 L 140,40 L 200,40" className="animate-pulse duration-2000" />
            </svg>
            <div className="absolute text-[8px] font-mono text-[#00ffff]/60 bottom-0 left-4">
              <span>HEART_RATE_MONITOR</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 overflow-hidden bg-[#030303]/20"
    >
      <div className="absolute inset-0 bg-dots-cyber opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent-orange font-bold tracking-widest">[03 // DEPLOYMENTS]</span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </div>
        
        <h2 className="font-title text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-12 uppercase">
          ENGINEERING ARCHIVES
        </h2>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectTiltCard className="h-full flex flex-col justify-between p-6 border-white/5 hover:border-accent-orange/20 hover:shadow-[0_0_30px_rgba(255,94,0,0.08)] transition-all">
                
                {/* Visual Graphics Background */}
                {project.graphic}

                <div className="relative z-10 flex flex-col">
                  {/* Card Header Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-sm">
                      {project.icon}
                    </div>
                    
                    {/* GitHub Link */}
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm border border-neutral-900 text-neutral-500 hover:text-white hover:border-neutral-700 hover:bg-neutral-900/40 transition-all cursor-pointer pointer-events-auto"
                      title="View GitHub Repository"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-title text-xl font-bold text-white tracking-widest mb-3 uppercase">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] md:text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    {project.desc}
                  </p>
                </div>

                {/* Tech tags footer */}
                <div className="relative z-10 flex flex-wrap gap-1.5 pt-4 border-t border-neutral-900/60">
                  {project.tech.map((t, tIdx) => (
                    <span 
                      key={tIdx}
                      style={{ 
                        borderColor: `${project.accentColor}18`,
                        color: project.accentColor
                      }}
                      className="px-2 py-0.5 rounded-sm border text-[8px] font-mono tracking-wider uppercase bg-neutral-950"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </ProjectTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
