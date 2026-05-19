"use client";

import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@/context/store-context";
import { motion, AnimatePresence } from "framer-motion";

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
}

interface WebNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulseDir: number;
}

const ACTIVITIES = [
  { text: "James K. from Nairobi just unlocked the First $100 Online Guide!", icon: "🔥" },
  { text: "14 people are currently reading the Chapter 1 sample pages!", icon: "⚡" },
  { text: "Sarah M. from London downloaded the Step-by-Step Blueprint PDF!", icon: "💎" },
  { text: "A student from Lagos just secured the First $100 Workbook!", icon: "📈" },
  { text: "Liam D. from Dublin successfully made his first sale using this guide!", icon: "🚀" },
  { text: "9 readers added the First $100 Blueprint to their cart in the last hour!", icon: "🎯" }
];

export function InteractiveCanvas() {
  const { theme } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [toast, setToast] = useState<{ text: string; icon: string } | null>(null);

  // KINETIC CYBERNETIC VECTOR WEB & MOUSE TRAIL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let trailParticles: TrailParticle[] = [];
    let webNodes: WebNode[] = [];
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

    // Initialize the vector grid nodes
    const initWebNodes = () => {
      webNodes = [];
      // Adjust count based on screen width for performance optimization
      const nodeCount = window.innerWidth < 768 ? 35 : 70;
      for (let i = 0; i < nodeCount; i++) {
        webNodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35, // slowly drifting
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2.5 + 1.5,
          alpha: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.005 + 0.002,
          pulseDir: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    // Resize canvas viewport and re-init nodes
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initWebNodes();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse coordinate pushes
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn temporary fast cursor trail glowing particles
      const rgb = getAccentRGB();
      for (let i = 0; i < 2; i++) {
        trailParticles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 6 + 2.5,
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

    // Core high-performance vector rendering loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getAccentRGB();

      // 1. UPDATE AND DRAW CYBER VECTOR WEB NODES
      for (let i = 0; i < webNodes.length; i++) {
        const node = webNodes[i];

        // Move nodes slowly in space
        node.x += node.vx;
        node.y += node.vy;

        // Boundary reflection collision physics
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Breathe/Pulse opacity
        node.alpha += node.pulseSpeed * node.pulseDir;
        if (node.alpha >= 0.8 || node.alpha <= 0.15) {
          node.pulseDir *= -1;
        }

        // Active cursor magnetic repulsion/attraction force
        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Gently warp grid points away from cursor
            const force = (180 - dist) / 180;
            node.x += (dx / dist) * force * 1.5;
            node.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw node vertices
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${node.alpha})`;
        
        // Add glowing drop shadows on vertices
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgb(${rgb})`;
        ctx.fill();
        ctx.restore();
      }

      // 2. RENDER THE INTERCONNECTING VECTOR NETWORK LINKS
      // Max distance allowed to form a vector connection line
      const maxConnectDistance = 140;
      for (let i = 0; i < webNodes.length; i++) {
        for (let j = i + 1; j < webNodes.length; j++) {
          const n1 = webNodes[i];
          const n2 = webNodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            // Calculate opacity proportional to proximity
            const linkAlpha = (1 - dist / maxConnectDistance) * 0.18 * (n1.alpha + n2.alpha) / 2;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${rgb}, ${linkAlpha})`;
            ctx.lineWidth = (1 - dist / maxConnectDistance) * 1.2;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // 3. DRAW TRANSIENT CURSOR TRAIL GLOWS
      for (let i = 0; i < trailParticles.length; i++) {
        const p = trailParticles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          trailParticles.splice(i, 1);
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
      {/* Background Interactive animated kinetic web layer */}
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
