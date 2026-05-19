"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/context/store-context";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag, BookOpen } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
}

const ACTIVITIES = [
  { text: "James K. from Nairobi just unlocked the Freelance Action Plan!", icon: "🔥" },
  { text: "14 people are currently looking inside the Forex Bundle!", icon: "⚡" },
  { text: "Sarah M. from London unlocked the Complete Strategy Bundle!", icon: "💎" },
  { text: "A customer from Hamburg purchased the First $100 Guide!", icon: "📈" },
  { text: "Liam D. from Dublin downloaded the Freelance Action Plan!", icon: "🚀" },
  { text: "9 readers added the Complete Bundle to their cart in the last hour!", icon: "🎯" }
];

export function InteractiveCanvas() {
  const { theme } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [toast, setToast] = useState<{ text: string; icon: string } | null>(null);

  // 1. NEON MOUSE-TRAIL EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, active: false };

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Get RGB string based on active theme
    const getAccentRGB = () => {
      if (typeof window !== "undefined") {
        const style = getComputedStyle(document.body);
        const rgbString = style.getPropertyValue("--accent-color").trim();
        return rgbString || "16, 185, 129"; // fallback to emerald
      }
      return "16, 185, 129";
    };

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn particles
      const rgb = getAccentRGB();
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 8 + 3,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          color: `rgba(${rgb}, ${Math.random() * 0.4 + 0.4})`,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Canvas animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        // Draw glowing circles
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Dynamic Neon Glow Radial Gradient
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        gradient.addColorStop(0.3, p.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  // 2. REAL-TIME CUSTOMER ACTION TICKER
  useEffect(() => {
    const triggerNextActivity = () => {
      const idx = Math.floor(Math.random() * ACTIVITIES.length);
      setToast(ACTIVITIES[idx]);

      // Hide toast after 6 seconds
      setTimeout(() => {
        setToast(null);
      }, 5500);
    };

    // Initial alert delay
    const initialTimeout = setTimeout(triggerNextActivity, 8000);

    // Repeated cycle
    const interval = setInterval(triggerNextActivity, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Background Interactive mouse-trail layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30"
        style={{ opacity: 0.8 }}
      />

      {/* Floating Alert Ticker Toast */}
      <div className="fixed bottom-6 left-6 z-40 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ x: "-120%", opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "-120%", opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="glass-panel border-theme-accent p-4 rounded-2xl shadow-xl pointer-events-auto flex items-start gap-3 bg-slate-950/95"
            >
              <div className="text-xl bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-center">
                {toast.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Live Activity</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed mt-1">{toast.text}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
