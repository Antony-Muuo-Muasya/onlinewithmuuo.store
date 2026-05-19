"use client";

import React, { useRef, useState } from "react";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/product-card";
import { 
  ShieldCheck, Download, Award, Clock, Search, Sliders, 
  HelpCircle, ChevronDown, Star, MessageSquare, Target, Calculator 
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    q: "How soon can I make my first $100 online?",
    a: "Many students who actively apply the Fiverr profile setup checklist and use our Upwork pitch templates land their first micro-gig within 3 to 7 days of launching. The guides are designed to get you active immediately without delays."
  },
  {
    q: "Do I need prior technical experience or degrees?",
    a: "Absolutely not! The blueprints are written specifically for beginners. We focus on 'no-code' micro-skills like copy-editing, lead generation, profile auditing, and transcription that you can learn in under 2 hours."
  },
  {
    q: "Are the payments safe and encrypted?",
    a: "Yes. All purchases are handled through secure TLS-encrypted transaction networks powered by Stripe. Your billing credentials are fully secure and never stored on our servers."
  },
  {
    q: "What format are the strategy guides in?",
    a: "All items are instant-download digital files (PDF format), optimized to be read beautifully on phones, tablets, or laptops. You get lifetime access to all revisions and downloads!"
  }
];

const TESTIMONIALS = [
  {
    name: "Kelvin O.",
    location: "Nairobi, KE",
    quote: "I used the profile setup checklist from the Freelance Action Plan and landed my first order on Fiverr in 3 days. Super practical and straightforward!",
    rating: 5,
    tag: "Fiverr Success"
  },
  {
    name: "Amara N.",
    location: "Lagos, NG",
    quote: "The proposal templates are actual gold. I had been struggling to get replies on Upwork for weeks. Copy-pasted the script and got hired immediately.",
    rating: 5,
    tag: "Upwork Success"
  },
  {
    name: "Chloe L.",
    location: "Bristol, UK",
    quote: "Simple to understand, no unnecessary fluff. Just actionable blueprints. If you want to make a side income online, this is the perfect starting point.",
    rating: 5,
    tag: "Micro-task Income"
  }
];

export default function Home() {
  const { products, convertPrice } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive feature states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // ROI Calculator states
  const [studyHours, setStudyHours] = useState(5);
  const [focusNiche, setFocusNiche] = useState<"writing" | "data" | "design">("writing");

  // Calculate potential earnings based on slider and niche multiplier
  const calculateSimulatedEarnings = () => {
    const multipliers = { writing: 15, data: 22, design: 18 };
    const baseWeekly = studyHours * multipliers[focusNiche];
    return baseWeekly;
  };

  const getProjectedDaysToFirstSale = () => {
    if (studyHours >= 12) return "3 to 4 days";
    if (studyHours >= 6) return "6 to 8 days";
    return "10 to 14 days";
  };

  // Filter products based on search input
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

    // 4. Product Grid Stagger Entrance
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-slate-950 overflow-hidden relative">
      
      {/* 1. HERO SECTION (Fintech Theme) */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-slate-950">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Top Tagline */}
            <div className="hero-element inline-block">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                <Award className="h-4 w-4 text-theme-accent" /> Step-by-Step Online Income Blueprints
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
              Stop grinding without results. Secure the exact copy-paste scripts, profile checklists, and step-by-step checklists to make your first $100 online.
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
                <div className="p-2 bg-emerald-500/10 rounded-xl text-theme-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION (Feature 5) */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/40 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-xs font-black text-theme-accent uppercase tracking-wider">
              <Calculator className="h-3.5 w-3.5" /> Interactive ROI Estimator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Simulate Your Income Returns</h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              Slide study hours and select your micro-niche to compute potential side-yields.
            </p>
          </div>

          <div className="glass-panel border-slate-900 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xl">
            {/* Control Panel */}
            <div className="space-y-6">
              {/* Slider 1: Study hours */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-wider">Study & Applied Hours</span>
                  <span className="text-theme-accent">{studyHours} hrs/week</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="25" 
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[9px] font-bold text-slate-500">
                  <span>Casual (2 hrs)</span>
                  <span>Hyper-focus (25 hrs)</span>
                </div>
              </div>

              {/* Toggle Buttons: Niche Selector */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Micro-Skill</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "writing", label: "Copy-writing" },
                    { id: "data", label: "Data Auditing" },
                    { id: "design", label: "UI Layouts" }
                  ].map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setFocusNiche(n.id as any)}
                      className={`py-2 px-3 text-[10px] font-black uppercase rounded-xl border transition-all cursor-pointer ${
                        focusNiche === n.id 
                          ? "bg-emerald-500/10 border-theme-accent text-theme-accent"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations Dashboard */}
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800/80 space-y-4">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Weekly Return Potential</span>
                <h3 className="text-3xl font-black text-white mt-1">
                  {convertPrice(calculateSimulatedEarnings())}
                </h3>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-xs">
                <span className="text-slate-400">First Order Outlook:</span>
                <span className="font-bold text-emerald-400">{getProjectedDaysToFirstSale()}</span>
              </div>
              <p className="text-[9px] text-slate-500 leading-normal pt-1">
                *Simulations are based on realistic hourly task returns in Nairobi/Lagos gig centers using active Upwork & Fiverr average entry quotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOG GRID SECTION (Feature 8 Integrated) */}
      <section className="strategy-section py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <h2 className="strategy-header-element text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Our Strategy Library
            </h2>
            <p className="strategy-header-element text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Select one of our action-oriented manuals to accelerate your remote income journey today.
            </p>

            {/* Feature 8: Search & Filter Toolbar */}
            <div className="max-w-md mx-auto relative pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates, proposal scripts, guides..."
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder-slate-500"
                />
              </div>
              {searchQuery && (
                <div className="absolute right-3 top-7 text-[10px] text-slate-500 font-bold">
                  {filteredProducts.length} matched
                </div>
              )}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="product-grid-container grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id} 
                  className="product-card-item"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-3">
                <Search className="h-10 w-10 text-slate-700 mx-auto" />
                <h4 className="text-sm font-bold text-slate-400">No blueprints match your query</h4>
                <p className="text-xs text-slate-500">Try checking details on another search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL SECTION (Feature 2) */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-xs font-black text-theme-accent uppercase tracking-wider">
              <MessageSquare className="h-3.5 w-3.5" /> Reader Success Stories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Rated 5.0 Stars by Global Beginners</h2>
          </div>

          {/* Glass Testimonial Frame */}
          <div className="glass-panel border-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-xl min-h-[280px] justify-center">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex gap-1 text-amber-400 mb-6">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            <p className="text-sm sm:text-lg text-slate-200 font-medium italic leading-relaxed max-w-2xl">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-black text-white">{TESTIMONIALS[activeTestimonial].name}</h4>
              <p className="text-[10px] font-bold text-slate-500 mt-0.5">{TESTIMONIALS[activeTestimonial].location} • {TESTIMONIALS[activeTestimonial].tag}</p>
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                    activeTestimonial === idx ? "bg-theme-accent w-6" : "bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION WITH GSAP ACCORDIONS (Feature 4) */}
      <section className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-xs font-black text-theme-accent uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5" /> Pre-Sales Queries
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-theme-accent" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-900/60 text-xs text-slate-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
              <span className="text-[10px] uppercase font-black text-theme-accent tracking-wider">Meet The Author</span>
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
