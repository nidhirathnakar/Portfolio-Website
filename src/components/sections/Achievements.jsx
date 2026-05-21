import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Code2, Users, Rocket } from "lucide-react";

// Count Up digit animator
function CountUpNumber({ endValue, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = parseInt(endValue, 10);
    if (isNaN(end)) {
      setCount(endValue);
      return;
    }

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentVal = Math.floor((end * step) / totalSteps);
      setCount(currentVal);

      if (step >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, endValue, duration]);

  return <span ref={ref}>{String(count).padStart(endValue.length, '0')}{suffix}</span>;
}

export default function Achievements() {
  const stats = [
    {
      label: "LEETCODE SOLUTIONS",
      stat: "90",
      suffix: "+",
      detail: "Solved 90+ DSA problems focusing on algorithms and advanced problem-solving structures.",
      icon: <Code2 className="w-5 h-5 text-accent-orange" />
    },
    {
      label: "HACKATHON ATTENDEES",
      stat: "300",
      suffix: "+",
      detail: "Organized and led a national-level hackathon with 300+ students and developers at Sir MVIT.",
      icon: <Users className="w-5 h-5 text-accent-orange" />
    },
    {
      label: "COMMUNITIES LED",
      stat: "02",
      suffix: "",
      detail: "Core Member of GLUG MVIT and TechHub Community, driving tech workshops and tech engagement.",
      icon: <Award className="w-5 h-5 text-accent-orange" />
    },
    {
      label: "INNOVATION EVENTS",
      stat: "06",
      suffix: "+",
      detail: "Participated in multiple hackathons, technology panels, and design showcases.",
      icon: <Rocket className="w-5 h-5 text-accent-orange" />
    }
  ];

  return (
    <section 
      id="achievements" 
      className="relative min-h-[80vh] w-full flex items-center justify-center py-24 px-6 overflow-hidden bg-[#030303]/30"
    >
      <div className="absolute inset-0 bg-dots-cyber opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-accent-orange font-bold tracking-widest">[04 // PROTOCOLS]</span>
          <div className="h-[1px] w-12 bg-neutral-800" />
        </div>
        
        <h2 className="font-title text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-12 uppercase">
          SYSTEM ACHIEVEMENTS
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-sm border border-neutral-900 bg-neutral-950/45 hover:border-accent-orange/15 hover:shadow-[0_0_20px_rgba(255,94,0,0.04)] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon */}
                <div className="mb-6 p-2 w-fit bg-neutral-900 border border-neutral-800 rounded-sm group-hover:border-accent-orange/45 transition-all">
                  {item.icon}
                </div>

                {/* Big Stat Count */}
                <div className="text-4xl md:text-5xl font-bold font-title text-white tracking-tight mb-2 flex items-baseline">
                  <CountUpNumber endValue={item.stat} suffix={item.suffix} />
                </div>

                {/* Stat label */}
                <h3 className="font-mono text-[10px] text-accent-orangeLight font-bold tracking-[0.2em] mb-4 uppercase">
                  {item.label}
                </h3>
              </div>

              {/* Detail desc */}
              <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
