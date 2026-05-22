import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [logText, setLogText] = useState("INITIALIZING ENGINE...");

  const logs = [
    "COMPILING VERTEX SHADERS...",
    "ESTABLISHING WEB3 PROTOCOLS...",
    "PARSING ML MODELS & WEIGHTS...",
    "GENERATING PARTICLES BACKDROP...",
    "SYNCHRONIZING AUDIO NODES...",
    "SYSTEM SECURED & READY."
  ];

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 3.0,
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (latest) => {
        const rounded = Math.floor(latest);
        setProgress(rounded);

        // Rotate HUD logs based on progress
        const logIdx = Math.min(
          Math.floor((rounded / 100) * logs.length),
          logs.length - 1
        );
        setLogText(logs[logIdx]);
      },
      onComplete: () => {
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Allow fade out animation to finish
        }, 850);
      }
    });

    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-16 bg-[#030303] text-neutral-200 overflow-hidden font-mono"
        >
          {/* Cyber scanner overlay lines */}
          <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-20" />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent-orange/5 to-transparent animate-scan-line pointer-events-none" />

          {/* Header Info HUD */}
          <div className="flex justify-between items-start text-[11px] sm:text-xs tracking-wider text-neutral-600">
            <div>
              <p>PROJECT: PORTFOLIO_V3</p>
              <p>OPERATING SYSTEM: GEMINI_NT_10.0</p>
            </div>
            <div className="text-right">
              <p>SYSTEM LOCATION: BANGALORE, INDIA</p>
              <p>STATUS: LOADING_SYSTEM_RESOURCES</p>
            </div>
          </div>

          {/* Center Brand Name & Progress */}
          <div className="flex flex-col items-center justify-center my-auto">
            {/* Logo placeholder icon */}
            <div className="mb-6 w-12 h-12 flex items-center justify-center border border-accent-orange/30 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-accent-orange/5 animate-pulse" />
              <div className="w-4 h-4 bg-accent-orange rounded-sm rotate-45 animate-spin duration-1000" />
            </div>

            {/* Title Glitch Text */}
            <h1 
              data-text="NIDHI"
              className="glitch-text font-title text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-[0.25em] text-center mb-4 uppercase"
            >
              NIDHI
            </h1>
            
            {/* Title subheader */}
            <p className="text-xs md:text-sm text-neutral-500 uppercase tracking-[0.4em] mb-12 text-center max-w-md">
              AI • Web3 • Full Stack Engineer
            </p>

            {/* Massive Percentage Counter */}
            <div className="relative">
              <div className="text-7xl md:text-9xl font-bold font-title text-stroke tracking-tighter opacity-15">
                {progress}%
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-5xl md:text-7xl font-bold font-title text-white tracking-tighter glow-text-orange">
                {progress}%
              </div>
            </div>
          </div>

          {/* Bottom HUD & Status Logs */}
          <div className="flex flex-col gap-4">
            {/* Progress bar */}
            <div className="w-full h-[1px] bg-neutral-900 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-accent-orange shadow-[0_0_8px_#ff5e00]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] sm:text-xs tracking-wider text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-ping" />
                <span>{logText}</span>
              </div>
              <div className="text-neutral-600">
                <span>SPEED: {(Math.random() * 50 + 200).toFixed(1)} KB/S</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
