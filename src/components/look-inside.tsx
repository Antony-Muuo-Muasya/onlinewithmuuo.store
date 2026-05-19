"use client";

import React, { useState, useRef } from "react";
import { ProductSamplePage } from "@/data/products";
import { ChevronLeft, ChevronRight, Lock, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface LookInsideProps {
  samplePages: ProductSamplePage[];
  totalPages: number;
  onBuyNow: () => void;
}

export function LookInside({ samplePages, totalPages, onBuyNow }: LookInsideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  const nextPage = () => {
    if (currentPage < samplePages.length - 1) {
      // Small out transition before page change
      gsap.to(pageContentRef.current, {
        opacity: 0,
        x: -25,
        rotateY: -15,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setCurrentPage(currentPage + 1);
        }
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      // Small out transition before page change
      gsap.to(pageContentRef.current, {
        opacity: 0,
        x: 25,
        rotateY: 15,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setCurrentPage(currentPage - 1);
        }
      });
    }
  };

  // Stagger / Ease in the content on load or page swap
  useGSAP(() => {
    if (!isOpen) return;

    gsap.fromTo(
      pageContentRef.current,
      { opacity: 0, x: 25, rotateY: 15 },
      { opacity: 1, x: 0, rotateY: 0, duration: 0.35, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [currentPage, isOpen] });

  // Slide open the Look Inside drawer container initially
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        ".look-inside-drawer",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  return (
    <div ref={containerRef} className="w-full">
      {/* Trigger Button */}
      {!isOpen ? (
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="w-full justify-center gap-2 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 py-3.5"
        >
          <Eye className="h-4 w-4" /> Look Inside (Free 2-Page Sample)
        </Button>
      ) : (
        <div className="look-inside-drawer glass-panel border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-4">
          {/* Header */}
          <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Sample Preview
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold">
              Page {currentPage + 1} of {samplePages.length}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-slate-500 hover:text-white transition-colors underline cursor-pointer"
            >
              Close Sample
            </button>
          </div>

          {/* Sample Page Viewport */}
          <div className="relative aspect-[3/4.2] sm:aspect-[3/3.8] bg-slate-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden select-none" style={{ perspective: "1000px" }}>
            {/* Book Spine Shadow */}
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />

            {/* Diagonal Watermarks */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-8 opacity-[0.03] rotate-[-25deg] scale-125 pointer-events-none font-black text-center text-slate-400 select-none">
              <div className="text-lg">ONLINE WITH MUUO</div>
              <div className="text-lg">ONLINE WITH MUUO</div>
              <div className="text-lg">WATERMARKED SAMPLE</div>
              <div className="text-lg">WATERMARKED SAMPLE</div>
              <div className="text-lg">CONFIDENTIAL COPY</div>
              <div className="text-lg">CONFIDENTIAL COPY</div>
            </div>

            {/* Page Content Animation */}
            <div
              ref={pageContentRef}
              className="flex-1 flex flex-col justify-between py-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="space-y-4">
                <div className="border-b border-slate-900 pb-3">
                  <h5 className="text-[10px] uppercase tracking-widest font-black text-emerald-500">
                    {samplePages[currentPage]?.subtitle || "Sample Subtitle"}
                  </h5>
                  <h4 className="text-base sm:text-lg font-black text-white mt-1 leading-tight">
                    {samplePages[currentPage]?.title || "Sample Title"}
                  </h4>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed text-justify font-serif">
                  {samplePages[currentPage]?.content || "Sample Content"}
                </p>
              </div>

              {/* Simulated lock cue on end page */}
              {currentPage === samplePages.length - 1 && (
                <div className="mt-6 p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 flex-shrink-0">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white">Remaining pages locked</p>
                      <p className="text-[10px] text-slate-500 truncate">Purchase to read full {totalPages} pages.</p>
                    </div>
                  </div>
                  <Button onClick={onBuyNow} size="sm" className="text-xs py-2 px-4 whitespace-nowrap">
                    Unlock Now
                  </Button>
                </div>
              )}
            </div>

            {/* Diagonal Ribbon */}
            <div className="absolute top-8 right-[-32px] bg-emerald-500 text-slate-950 text-[8px] font-black tracking-widest py-1.5 px-10 rotate-45 shadow-md">
              SAMPLE ONLY
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-slate-900/50 p-4 border-t border-slate-800 flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-xs hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous Page
            </Button>

            <span className="text-[10px] text-slate-500 font-bold uppercase">
              End of Free Sample
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === samplePages.length - 1}
              className="text-xs hover:text-white"
            >
              Next Page <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
