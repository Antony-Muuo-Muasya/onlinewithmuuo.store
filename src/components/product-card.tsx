"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, FileText, Sparkles } from "lucide-react";

import { useStore } from "@/context/store-context";

interface ProductCardProps {
  product: Product;
}

// Gradient Map for premium covers
const getCoverGradientClass = (coverImage: string) => {
  if (coverImage === "Emerald Cyber") return "from-slate-950 via-emerald-950 to-slate-950 border-emerald-500/30 text-emerald-400";
  if (coverImage === "Midnight Nebula") return "from-slate-950 via-indigo-950 to-slate-950 border-indigo-500/30 text-indigo-400";
  if (coverImage === "Crimson Gold") return "from-slate-950 via-rose-950 to-slate-950 border-rose-500/30 text-rose-400";
  if (coverImage === "Sunset Cyber") return "from-slate-950 via-amber-950 to-slate-950 border-amber-500/30 text-amber-400";
  
  // Default legacy gradient cover
  return "from-slate-950 via-slate-900 to-slate-950 text-emerald-400";
};

export function ProductCard({ product }: ProductCardProps) {
  const { convertPrice } = useStore();

  // Generate rating stars array
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />);
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-slate-600" />);
      }
    }
    return stars;
  };

  const gradientClass = getCoverGradientClass(product.coverImage);

  return (
    <div
      className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/15 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Mockup Container (Realistic 3D Book Shadows) */}
        <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto mb-6 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-slate-800/80 book-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
          {/* Internal Glowing Spine */}
          <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-gradient-to-r from-emerald-600/40 via-emerald-500/10 to-transparent z-10" />

          {/* Book Mockup Illustration Content */}
          <div className={`absolute inset-0 p-4 flex flex-col justify-between bg-gradient-to-br ${gradientClass}`}>
            <div className="flex justify-between items-start">
              <span className="text-[8px] font-bold border border-current px-1.5 py-0.5 rounded-md bg-white/5 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="h-2 w-2" /> PDF Pro
              </span>
              <FileText className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="space-y-2 py-4">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest text-center">OnlineWithMuuo</p>
              <h4 className="text-sm font-extrabold text-white text-center leading-tight tracking-tight line-clamp-3">
                {product.title.split(":")[0]}
              </h4>
            </div>

            <div className="pt-2 border-t border-slate-900/60 text-center">
              <span className="text-[9px] text-slate-400 font-medium">
                {product.pages} Pages • {product.fileSize}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Badge and Ratings */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="primary" className="text-xs py-1 px-3">
            {convertPrice(product.price)}
          </Badge>
          <div className="flex items-center gap-1">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-[10px] font-bold text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Ebook Metadata info */}
        <div className="space-y-2 mb-6">
          <h3 className="text-lg font-extrabold text-white leading-snug tracking-tight group-hover:text-emerald-400 transition-colors">
            {product.title}
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
            {product.snippet}
          </p>
        </div>
      </div>

      {/* View Details Call to Action */}
      <Link href={`/products/${product.id}`} className="w-full block">
        <Button variant="secondary" className="w-full justify-center group/btn gap-2 text-xs py-3.5">
          View Ebook Details
          <ArrowRight className="h-4 w-4 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-emerald-400 transition-all" />
        </Button>
      </Link>
    </div>
  );
}
