import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorType, setCursorType] = useState("default");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Event delegation for hovers
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("interactive-card") ||
        target.closest(".interactive-card");
        
      if (isClickable) {
        setHovered(true);
        if (target.classList.contains("project-card") || target.closest(".project-card")) {
          setCursorType("project");
        } else {
          setCursorType("pointer");
        }
      } else {
        setHovered(false);
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on touch devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-orange z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      />
      
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-neutral-700 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ 
          x: trailX, 
          y: trailY,
          width: hovered ? (cursorType === "project" ? 72 : 48) : 24,
          height: hovered ? (cursorType === "project" ? 72 : 48) : 24,
          borderColor: hovered ? "#ff5e00" : "rgba(163, 163, 163, 0.4)",
          backgroundColor: hovered ? "rgba(255, 94, 0, 0.05)" : "rgba(255, 255, 255, 0)",
          boxShadow: hovered ? "0 0 15px rgba(255, 94, 0, 0.4)" : "none"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        {hovered && cursorType === "project" && (
          <span className="absolute text-[9px] sm:text-[10px] text-accent-orange font-mono tracking-widest uppercase top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            VIEW
          </span>
        )}
        
        {/* Futuristic corner details inside the ring on hover */}
        {hovered && cursorType !== "project" && (
          <div className="absolute inset-0 flex items-center justify-between p-1">
            <div className="w-1 h-[1px] bg-accent-orange"></div>
            <div className="w-1 h-[1px] bg-accent-orange"></div>
          </div>
        )}
      </motion.div>
    </>
  );
}
