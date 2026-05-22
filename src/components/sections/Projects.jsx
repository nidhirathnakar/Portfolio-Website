import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Cpu, Box } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// Component for DecentraEstate dynamic background (Blockchain Mesh Network)
function DecentraEstateBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    const particles = [];
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    let gridOffset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle futuristic orange glow (radial)
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );
      glowGrad.addColorStop(0, "rgba(255, 94, 0, 0.07)");
      glowGrad.addColorStop(1, "rgba(255, 94, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Holographic grid motion
      ctx.strokeStyle = "rgba(255, 94, 0, 0.02)";
      ctx.lineWidth = 1;
      gridOffset = (gridOffset + 0.1) % 30;
      
      for (let x = gridOffset; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridOffset; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Moving nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 94, 0, 0.25)";
        ctx.fill();
      });

      // Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 90) * 0.12;
            ctx.strokeStyle = `rgba(255, 94, 0, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" />;
}

// Component for AI Malicious website detector (Red Matrix Warning Pulse)
function MaliciousDetectorBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    const fontSize = 10;
    const columns = Math.floor(width / fontSize) + 1;
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -100);

    let scanLineY = 0;
    let pulseOpacity = 0;
    let pulseDirection = 1;

    const draw = () => {
      ctx.fillStyle = "rgba(3, 3, 3, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Matrix rain (red theme)
      ctx.fillStyle = "rgba(239, 68, 68, 0.1)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < yPositions.length; i++) {
        const char = Math.random() > 0.5 ? "1" : "0";
        const x = i * fontSize;
        const y = yPositions[i];
        
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.98) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 1.2;
        }
      }

      // Cyber Grid
      ctx.strokeStyle = "rgba(239, 68, 68, 0.01)";
      ctx.lineWidth = 1;
      const gridSpacing = 25;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Scan-line
      scanLineY = (scanLineY + 1) % height;
      const scanGrad = ctx.createLinearGradient(0, scanLineY - 10, 0, scanLineY + 2);
      scanGrad.addColorStop(0, "rgba(239, 68, 68, 0)");
      scanGrad.addColorStop(0.5, "rgba(239, 68, 68, 0.05)");
      scanGrad.addColorStop(1, "rgba(239, 68, 68, 0.15)");
      
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 10, width, 12);

      ctx.beginPath();
      ctx.moveTo(0, scanLineY);
      ctx.lineTo(width, scanLineY);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.25)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Pulses
      pulseOpacity += 0.01 * pulseDirection;
      if (pulseOpacity >= 0.2) {
        pulseOpacity = 0.2;
        pulseDirection = -1;
      } else if (pulseOpacity <= 0) {
        pulseOpacity = 0;
        pulseDirection = 1;
      }
      ctx.fillStyle = `rgba(239, 68, 68, ${pulseOpacity * 0.1})`;
      ctx.fillRect(0, 0, width, height);

      // Noise glitch
      if (Math.random() > 0.985) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
        ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 40 + 10, Math.random() * 3 + 1);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" />;
}

// Component for ClinIQ Platform background (ECG Wave & Medical Particles)
function CliniqBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    const particles = [];
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -0.12 - Math.random() * 0.12,
        vx: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 3 + 2,
        type: Math.random() > 0.65 ? "cross" : "circle",
        opacity: Math.random() * 0.2 + 0.1,
      });
    }

    let pulseX = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft glow
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.75,
        5,
        width / 2,
        height * 0.75,
        Math.max(width, height) / 1.1
      );
      glowGrad.addColorStop(0, "rgba(0, 255, 255, 0.05)");
      glowGrad.addColorStop(1, "rgba(0, 255, 255, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // ECG wave
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(0, 255, 255, 0.09)";
      ctx.shadowBlur = 3;
      ctx.shadowColor = "#00ffff";

      ctx.moveTo(0, height * 0.65);
      for (let x = 0; x < width; x++) {
        let y = height * 0.65;
        const localX = (x - pulseX + width) % width;
        if (localX > 120 && localX < 160) {
          const t = localX - 120;
          if (t < 8) y -= t * 1.5;
          else if (t < 20) y += (t - 8) * 2 - 12;
          else if (t < 28) y -= (t - 20) * 1.8 - 12;
        }
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      pulseX = (pulseX + 0.8) % width;

      // Float particles
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) p.vx *= -1;

        ctx.strokeStyle = `rgba(0, 255, 255, ${p.opacity})`;
        ctx.lineWidth = 0.8;

        if (p.type === "cross") {
          ctx.beginPath();
          ctx.moveTo(p.x - p.size / 2, p.y);
          ctx.lineTo(p.x + p.size / 2, p.y);
          ctx.moveTo(p.x, p.y - p.size / 2);
          ctx.lineTo(p.x, p.y + p.size / 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-35 z-0" />;
}

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
    },
    {
      id: "malicious-detector",
      title: "AI MALICIOUS DETECTOR",
      gitUrl: "https://github.com/nidhirathnakar/AI-Malicious-Website-detector-extension",
      desc: "An AI-powered Chrome security extension executing real-time website URL scanning. Utilizes local machine learning classification algorithms and a Flask api backend to alert users of phishing attempts.",
      tech: ["Python", "Flask", "Machine Learning", "JavaScript", "Extension API", "HTML/CSS"],
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      accentColor: "#ef4444",
    },
    {
      id: "cliniq",
      title: "CLINIQ PLATFORM",
      gitUrl: "https://github.com/nidhirathnakar/clinIQ",
      desc: "A medical practice management infrastructure simplifying appointment bookings, digital patient records, and doctor scheduling, coupled with medical NLP classification features.",
      tech: ["Python", "Machine Learning", "NLP", "Flask", "MongoDB", "JavaScript"],
      icon: <Cpu className="w-5 h-5 text-[#00ffff]" />,
      accentColor: "#00ffff",
    }
  ];

  const renderBackground = (id) => {
    if (id === "decentraestate") return <DecentraEstateBackground />;
    if (id === "malicious-detector") return <MaliciousDetectorBackground />;
    if (id === "cliniq") return <CliniqBackground />;
    return null;
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full flex items-center justify-center py-14 md:py-24 px-6 overflow-hidden bg-[#030303]/20"
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
                {renderBackground(project.id)}

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
