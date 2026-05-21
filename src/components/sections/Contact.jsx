import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Sparkles, RefreshCw } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const playSubmitSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Cyber confirmation chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(600, ctx.currentTime);
      osc1.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      osc1.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.25);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(300, ctx.currentTime);
      osc2.frequency.setValueAtTime(400, ctx.currentTime + 0.1);
      osc2.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "88915f48-b74f-4e19-b6fb-6d478cff4100",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        playSubmitSound();
        
        // Burst canvas confetti
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#ff5e00", "#ff9d00", "#ffffff"],
          angle: 90
        });

        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("idle");
        alert("Transmission interrupted. Please try again.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Relay network offline. Check your internet connection.");
    }
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dots-cyber opacity-[0.02] pointer-events-none" />
      
      {/* Background ambient light balls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-orange/[0.015] rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT COLUMN - Contact meta */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between py-2"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-accent-orange font-bold tracking-widest">[06 // COMMS]</span>
              <div className="h-[1px] w-12 bg-neutral-800" />
            </div>
            
            <h2 className="font-title text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-wider mb-6 uppercase">
              TRANSMIT A MESSAGE
            </h2>

            <p className="text-neutral-400 font-light text-sm leading-relaxed mb-8">
              Whether you want to discuss AI models, build Web3 smart contracts, collaborate on client platforms, or just check standard network systems, feel free to transmit a ping.
            </p>
          </div>

          {/* Social / Direct Link Blocks */}
          <div className="space-y-4">
            {/* Email link */}
            <a 
              href="mailto:nidhirathnakar@gmail.com" 
              className="flex items-center gap-4 p-4 rounded-sm border border-neutral-900 bg-neutral-950/40 hover:border-accent-orange/30 hover:bg-neutral-950/70 transition-all group"
            >
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm text-neutral-400 group-hover:text-accent-orange group-hover:border-accent-orange/40 transition-all">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div className="font-mono text-left">
                <p className="text-[8px] text-neutral-600 tracking-wider">DIRECT EMAIL</p>
                <p className="text-xs text-neutral-300 group-hover:text-white transition-colors">nidhirathnakar@gmail.com</p>
              </div>
            </a>

            {/* LinkedIn Link */}
            <a 
              href="https://www.linkedin.com/in/nidhi-rathnakar-317b5723a" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-4 p-4 rounded-sm border border-neutral-900 bg-neutral-950/40 hover:border-accent-orange/30 hover:bg-neutral-950/70 transition-all group"
            >
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm text-neutral-400 group-hover:text-accent-orange group-hover:border-accent-orange/40 transition-all">
                <FaLinkedin className="w-4.5 h-4.5" />
              </div>
              <div className="font-mono text-left">
                <p className="text-[8px] text-neutral-600 tracking-wider">LINKEDIN PROFILE</p>
                <p className="text-xs text-neutral-300 group-hover:text-white transition-colors">nidhi-rathnakar-317b5723a</p>
              </div>
            </a>

            {/* GitHub Link */}
            <a 
              href="https://github.com/nidhirathnakar" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center gap-4 p-4 rounded-sm border border-neutral-900 bg-neutral-950/40 hover:border-accent-orange/30 hover:bg-neutral-950/70 transition-all group"
            >
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-sm text-neutral-400 group-hover:text-accent-orange group-hover:border-accent-orange/40 transition-all">
                <FaGithub className="w-4.5 h-4.5" />
              </div>
              <div className="font-mono text-left">
                <p className="text-[8px] text-neutral-600 tracking-wider">GITHUB INVENTORY</p>
                <p className="text-xs text-neutral-300 group-hover:text-white transition-colors">nidhirathnakar</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Interactive Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="p-6 md:p-8 rounded-sm border border-neutral-900 bg-neutral-950/30 backdrop-blur-sm relative overflow-hidden">
            {/* Ambient scan sweep */}
            {status === "sending" && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-accent-orange shadow-[0_0_8px_#ff5e00] animate-scan-line z-10" />
            )}

            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  {/* Name field */}
                  <div className="flex flex-col gap-2 font-mono text-left">
                    <label className="text-[10px] text-neutral-600 tracking-widest uppercase">
                      01 // SENDER_NAME
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === "sending"}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-neutral-700 rounded-sm px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                        placeholder="ENTER YOUR NAME..."
                      />
                      <div 
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-orange shadow-[0_0_8px_#ff5e00] transition-all duration-300 ${
                          focused === "name" ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2 font-mono text-left">
                    <label className="text-[10px] text-neutral-600 tracking-widest uppercase">
                      02 // RETURN_PATH
                    </label>
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === "sending"}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-neutral-700 rounded-sm px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                        placeholder="ENTER YOUR EMAIL..."
                      />
                      <div 
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-orange shadow-[0_0_8px_#ff5e00] transition-all duration-300 ${
                          focused === "email" ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2 font-mono text-left">
                    <label className="text-[10px] text-neutral-600 tracking-widest uppercase">
                      03 // TRANSMISSION_BODY
                    </label>
                    <div className="relative">
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        disabled={status === "sending"}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused("")}
                        className="w-full bg-neutral-900/60 border border-neutral-800 focus:border-neutral-700 rounded-sm px-4 py-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors resize-none"
                        placeholder="ENTER YOUR MESSAGE..."
                      />
                      <div 
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-orange shadow-[0_0_8px_#ff5e00] transition-all duration-300 ${
                          focused === "message" ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === "sending" || !formData.name || !formData.email || !formData.message}
                    className="w-full py-4 rounded-sm cyber-button text-xs font-mono font-bold tracking-[0.25em] uppercase text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-accent-orange" />
                        <span>TRANSMITTING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-accent-orange" />
                        <span>ESTABLISH COMMS</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-12 h-12 bg-accent-orange/10 border border-accent-orange/40 rounded-full flex items-center justify-center text-accent-orange mb-6 shadow-[0_0_15px_rgba(255,94,0,0.15)]">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="font-title text-2xl font-bold text-white tracking-widest mb-4 uppercase">
                    PINGS DISPATCHED
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-sm leading-relaxed mb-8">
                    Your transmission has bypassed core relays and successfully reached the receiver inbox. Stand by for response.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2 border border-neutral-800 bg-neutral-900 text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 hover:text-white hover:border-neutral-700 rounded-sm transition-all"
                  >
                    SEND ANOTHER PING
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
