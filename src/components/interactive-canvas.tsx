"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/context/store-context";
import { motion, AnimatePresence } from "framer-motion";

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

interface BgParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulseDir: number;
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

  // 1. NEON MOUSE-TRAIL & DRIFTING BACKGROUND STARFIELD EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let bgParticles: BgParticle[] = [];
    const mouse = { x: 0, y: 0, active: false };

    // Get RGB string based on active theme
    const getAccentRGB = () => {
      if (typeof window !== "undefined") {
        const style = getComputedStyle(document.body);
        const rgbString = style.getPropertyValue("--accent-color").trim();
        return rgbString || "16, 185, 129"; // fallback to emerald
      }
      return "16, 185, 129";
    };

    // Initialize background floating starfield
    const initBgParticles = () => {
      bgParticles = [];
      const count = 45;
      for (let i = 0; i < count; i++) {
        const maxAlpha = Math.random() * 0.45 + 0.15;
        bgParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedY: -(Math.random() * 0.25 + 0.08), // slow upward drift
          speedX: (Math.random() - 0.5) * 0.12,  // subtle side-to-side sway
          alpha: Math.random() * maxAlpha,
          maxAlpha,
          pulseSpeed: Math.random() * 0.008 + 0.003,
          pulseDir: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBgParticles();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn temporary cursor trail particles
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
      const rgb = getAccentRGB();

      // A. DRAW DRIFTING NEON BACKGROUND PARTICLES
      for (let j = 0; j < bgParticles.length; j++) {
        const bp = bgParticles[j];

        // Slowly move background particle upward
        bp.y += bp.speedY;
        bp.x += bp.speedX;

        // Pulse the opacity slowly
        bp.alpha += bp.pulseSpeed * bp.pulseDir;
        if (bp.alpha >= bp.maxAlpha) {
          bp.alpha = bp.maxAlpha;
          bp.pulseDir = -1;
        } else if (bp.alpha <= 0.05) {
          bp.alpha = 0.05;
          bp.pulseDir = 1;
        }

        // Recycle if floated off the top edge
        if (bp.y < -10) {
          bp.y = canvas.height + 10;
          bp.x = Math.random() * canvas.width;
        }
        // Keep in horizontal bounds
        if (bp.x < -10) bp.x = canvas.width + 10;
        if (bp.x > canvas.width + 10) bp.x = -10;

        // Check proximity to active mouse
        let proximityScale = 1;
        if (mouse.active) {
          const dx = bp.x - mouse.x;
          const dy = bp.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            // Glow brighter and expand slightly when cursor is near
            proximityScale = (120 - dist) / 60 + 1; // max scale 3x
          }
        }

        // Draw background dust
        ctx.save();
        ctx.globalAlpha = bp.alpha;
        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size * proximityScale, 0, Math.PI * 2);

        // Ambient radial neon glow
        const radial = ctx.createRadialGradient(
          bp.x, bp.y, 0,
          bp.x, bp.y, bp.size * 3 * proximityScale
        );
        radial.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        radial.addColorStop(0.2, `rgba(${rgb}, 0.75)`);
        radial.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radial;
        ctx.fill();
        ctx.restore();
      }

      // B. DRAW TRANSIENT CURSOR TRAIL PARTICLES
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

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
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
      {/* Background Interactive animated particles layer (positioned deep in the backdrop) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-10]"
        style={{ opacity: 0.95 }}
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
