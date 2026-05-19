"use client";

import React, { useRef } from "react";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/product-card";
import { ShieldCheck, Download, Award, Clock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { products } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Content Entrance (Fade & Slide)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-element",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );

    // 2. Trust Indicators Entrance (Staggered Pop)
    tl.fromTo(
      ".trust-indicator-card",
      { opacity: 0, y: 20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08 },
      "-=0.4"
    );

    // 3. Strategy Library Section Header (ScrollTriggered)
    gsap.fromTo(
      ".strategy-header-element",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".strategy-section",
          start: "top 85%",
        }
      }
    );

    // 4. Product Grid Stagger Entrance (ScrollTriggered 3D Tilt Reveal)
    gsap.fromTo(
      ".product-card-item",
      { opacity: 0, y: 45, rotationX: 8 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".product-grid-container",
          start: "top 90%",
        }
      }
    );

    // 5. Author Profile Banner Entrance (ScrollTriggered Slide)
    gsap.fromTo(
      ".author-banner",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: ".author-section",
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-slate-950 overflow-hidden">
      {/* 1. HERO SECTION (Fintech Theme) */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-950">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Top Tagline */}
            <div className="hero-element inline-block">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                <Award className="h-4 w-4" /> Step-by-Step Online Income Blueprints
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-element text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
              Start Earning Online with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Practical Guides
              </span>
            </h1>

            {/* Description */}
            <p className="hero-element text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Stop grinding without results. Secure the exact copy-paste scripts, proposal templates, and step-by-step checklists to make your first $100 online.
            </p>
          </div>

          {/* Core Trust Indicators Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16">
            {[
              { icon: Download, title: "Instant Delivery", desc: "Download link sent immediately post-purchase." },
              { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted credit card checkout powered by Stripe." },
              { icon: Clock, title: "Lifetime Updates", desc: "Free revised editions whenever platform rules adapt." },
              { icon: Award, title: "Beginner Friendly", desc: "No complex skills or high starting capital required." }
            ].map((item, idx) => (
              <div key={idx} className="trust-indicator-card p-4 bg-slate-900/30 rounded-2xl border border-slate-900 flex flex-col items-center text-center space-y-2">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CATALOG GRID SECTION */}
      <section className="strategy-section py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="strategy-header-element text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Our Strategy Library
            </h2>
            <p className="strategy-header-element text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Select one of our action-oriented manuals to accelerate your remote income journey today.
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="product-grid-container grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="product-card-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MENTOR PROFILE BANNER */}
      <section className="author-section py-16 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="author-banner glass-panel border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

            <div className="h-24 w-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex-shrink-0 flex items-center justify-center font-black text-2xl text-slate-950 shadow-lg shadow-emerald-500/10">
              OM
            </div>

            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider">Meet The Author</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">OnlineWithMuuo Mentor Team</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We specialize in helping beginners navigate the remote work market. Having successfully earned online through writing, data analytics, and digital services, we put together these step-by-step blueprints to help you avoid common pitfalls and earn your first $100 online with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
