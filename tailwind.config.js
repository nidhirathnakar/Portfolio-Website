/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        panel: "#0b0b0b",
        card: "#0d0d0d",
        borderAccent: "#1f1f1f",
        accent: {
          orange: "#ff5e00",
          orangeLight: "#ff8c00",
          orangeDark: "#b33600",
          orangeGlow: "rgba(255, 94, 0, 0.4)",
        },
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        title: ["Syne", "Outfit", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s infinite alternate",
        "scan-line": "scanLine 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glitch": "glitch 1s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 94, 0, 0.2), 0 0 10px rgba(255, 94, 0, 0.1)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 94, 0, 0.6), 0 0 35px rgba(255, 94, 0, 0.3)" }
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" }
        }
      }
    },
  },
  plugins: [],
}
