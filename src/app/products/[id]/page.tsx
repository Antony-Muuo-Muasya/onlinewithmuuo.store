"use client";

import React, { use, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store-context";
import { LookInside } from "@/components/look-inside";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShieldCheck, CheckCircle2, ArrowLeft, FileText, Sparkles, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Cover Gradient skin mapping
const getCoverGradientClass = (coverImage: string) => {
  if (coverImage === "Emerald Cyber") return "from-slate-950 via-emerald-950 to-slate-950 border-emerald-500/30 text-emerald-400";
  if (coverImage === "Midnight Nebula") return "from-slate-950 via-indigo-950 to-slate-950 border-indigo-500/30 text-indigo-400";
  if (coverImage === "Crimson Gold") return "from-slate-950 via-rose-950 to-slate-950 border-rose-500/30 text-rose-400";
  if (coverImage === "Sunset Cyber") return "from-slate-950 via-amber-950 to-slate-950 border-amber-500/30 text-amber-400";
  
  // Standard Default
  return "from-slate-950 via-slate-900 to-slate-950 text-emerald-400";
};

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { products, addToCart, isInCart, openCheckout, convertPrice } = useStore();

  const product = products.find((p) => p.id === id);

  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  // GSAP Animations: Stagger Entrance + Mouse Tilt Tracking
  useGSAP(() => {
    if (!product) return;

    // 1. Entrance animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".animate-left-col",
      { opacity: 0, x: -40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8 }
    );

    tl.fromTo(
      ".animate-right-col-item",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.08 },
      "-=0.6"
    );

    // 2. Interactive mouse-tracking tilt effect
    const book = bookRef.current;
    if (!book) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = book.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation angles (capped at 15 degrees max for control)
      const rotateY = (x / (rect.width / 2)) * 15;
      const rotateX = -(y / (rect.height / 2)) * 15;

      gsap.to(book, {
        rotateY: rotateY,
        rotateX: rotateX,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(book, {
        rotateY: 0,
        rotateX: 0,
        ease: "power2.out",
        duration: 0.6,
      });
    };

    book.addEventListener("mousemove", handleMouseMove);
    book.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      book.removeEventListener("mousemove", handleMouseMove);
      book.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef, dependencies: [product] });

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ebook Not Found</h3>
        <p className="text-slate-400 text-sm mb-6">The requested product could not be located in our digital product catalog.</p>
        <Link href="/">
          <Button variant="secondary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-slate-700" />);
      }
    }
    return stars;
  };

  const handleBuyNow = () => {
    openCheckout(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
    // Proactively click the cart button trigger to open the cart panel for validation
    setTimeout(() => {
      const trigger = document.getElementById("cart-trigger");
      if (trigger) trigger.click();
    }, 150);
  };

  const gradientClass = getCoverGradientClass(product.coverImage);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 overflow-hidden">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Storefront
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT COLUMN: Prominent PDF cover mockup with an embedded Look Inside module */}
        <div className="lg:col-span-5 space-y-6 animate-left-col">
          {/* Main Book Mockup Illustration Container */}
          <div 
            ref={bookRef}
            className="relative aspect-[3/4.2] w-full max-w-[340px] mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border border-slate-800 book-cover cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Spine Highlight */}
            <div className="absolute top-0 left-0 bottom-0 w-3.5 bg-gradient-to-r from-emerald-600/40 via-emerald-500/10 to-transparent z-10" />

            {/* Inner Design */}
            <div className={`absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-br ${gradientClass}`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold border border-current px-2.5 py-1 rounded-lg bg-white/5 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" /> Mentor Class
                </span>
                <FileText className="h-6 w-6 text-emerald-400" />
              </div>

              <div className="space-y-4 py-8">
                <p className="text-xs uppercase font-extrabold text-slate-500 tracking-widest text-center">OnlineWithMuuo</p>
                <h2 className="text-xl sm:text-2xl font-black text-white text-center leading-tight tracking-tight">
                  {product.title}
                </h2>
              </div>

              <div className="pt-4 border-t border-slate-900/60 text-center">
                <span className="text-xs text-slate-400 font-bold font-mono">
                  {product.pages} Pages • Digital PDF
                </span>
              </div>
            </div>
          </div>

          {/* Embedded Look Inside module */}
          <LookInside
            samplePages={product.samplePages}
            totalPages={product.pages}
            onBuyNow={handleBuyNow}
          />
        </div>

        {/* RIGHT COLUMN: Rich metadata specifications, CTAs, features list */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h1 className="animate-right-col-item text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              {product.title}
            </h1>

            {/* Rating Stars and Count */}
            <div className="animate-right-col-item flex items-center gap-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-xs font-black text-white">{product.rating}</span>
              <span className="text-xs text-slate-500">({product.reviewsCount} organic reviews)</span>
            </div>
          </div>

          {/* Ebook Overview text */}
          <div className="animate-right-col-item prose prose-invert max-w-none">
            <p className="text-slate-300 text-sm leading-relaxed text-justify">
              {product.description}
            </p>
          </div>

          {/* File Format Specifications */}
          <div className="animate-right-col-item grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-900/40 rounded-2xl border border-slate-900">
            {[
              { label: "File Format", value: product.format },
              { label: "File Size", value: product.fileSize },
              { label: "Page Count", value: `${product.pages} Pages` },
              { label: "Release Edition", value: `${product.publishedYear} v1.2` }
            ].map((spec, i) => (
              <div key={i} className="text-center sm:text-left">
                <p className="text-[10px] uppercase font-bold text-slate-500">{spec.label}</p>
                <p className="text-xs font-bold text-white mt-1">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Core Strategies Checklist */}
          <div className="animate-right-col-item space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">What's Inside the Ebook</h3>
            <ul className="space-y-2">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Row and CTA Buttons */}
          <div className="animate-right-col-item pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500">Retail Price</span>
              <p className="text-4xl font-black text-emerald-400">{convertPrice(product.price)}</p>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                id="add-to-cart-btn"
                variant="secondary"
                onClick={handleAddToCart}
                className="w-full justify-center py-4 gap-2 text-xs"
              >
                <ShoppingBag className="h-4 w-4" /> {isInCart(product.id) ? "In Your Cart" : "Add to Shopping Cart"}
              </Button>

              <Button
                id="buy-now-btn"
                onClick={handleBuyNow}
                className="w-full justify-center py-4 gap-2 text-xs shadow-lg shadow-emerald-500/20"
              >
                <ShieldCheck className="h-4 w-4" /> Instant Purchase (Buy Now)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
