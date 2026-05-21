import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "WEB DEVELOPMENT INTERN",
      company: "Zephyr Technologies",
      location: "Mangalore, India",
      period: "INTERNSHIP TERM",
      desc: "Developed modern web application client interfaces and worked alongside developers to design robust responsive logic setups using React and backend endpoints.",
      details: ["Integrated APIs", "Optimized Layout Performance", "Modern UI Design Implementation"]
    },
    {
      role: "DESIGNER",
      company: "CLANCE",
      location: "Bangalore, India",
      period: "DESIGN TERM",
      desc: "Created highly premium UX flows, mockups, design systems, and digital assets. Focused heavily on high-end typography layouts, interactive visual grids, and minimalist user navigation structures.",
      details: ["UX Wireframing", "Brand Asset Development", "Design-to-Code Standards Alignments"]
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 overflow-hidden bg-[#030303]/20"
    >
      <div className="absolute inset-0 bg-dots-cyber opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent-orange font-bold tracking-widest">[05 // LOGBOOKS]</span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </div>
        
        <h2 className="font-title text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-16 uppercase">
          EXPERIENCE TIMELINE
        </h2>

        {/* Timeline Core */}
        <div className="relative border-l border-neutral-900 ml-4 md:ml-12 pl-8 md:pl-16 space-y-12">
          {/* Animated vertical glow track */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-accent-orange via-accent-orange/40 to-transparent pointer-events-none" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Timeline Orb Node */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-neutral-950 border border-neutral-800 z-10 group">
                <span className="w-2 h-2 rounded-full bg-neutral-700 animate-pulse group-hover:bg-accent-orange transition-colors" />
                <div className="absolute inset-0 rounded-full border border-accent-orange/20 animate-ping opacity-0 group-hover:opacity-100" />
              </div>

              {/* Experience Card */}
              <div className="p-6 md:p-8 rounded-sm border border-neutral-900 bg-neutral-950/45 hover:border-neutral-800 hover:shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all max-w-3xl">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-900/60 text-[10px] font-mono text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent-orange" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Job Title & Company */}
                <h3 className="font-title text-lg md:text-xl font-bold text-white tracking-widest uppercase mb-1">
                  {exp.role}
                </h3>
                <h4 className="font-mono text-xs text-accent-orangeLight font-bold tracking-wider mb-6">
                  {exp.company}
                </h4>

                {/* Job Description */}
                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {exp.desc}
                </p>

                {/* Bullet details */}
                <div className="flex flex-wrap gap-2">
                  {exp.details.map((detail, dIdx) => (
                    <span 
                      key={dIdx}
                      className="px-2.5 py-1 rounded-sm bg-neutral-900 text-[8px] font-mono text-neutral-400 border border-neutral-900"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
