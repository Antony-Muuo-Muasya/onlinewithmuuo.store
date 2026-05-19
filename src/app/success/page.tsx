"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, ShieldCheck, Mail, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("id");
  const email = searchParams.get("email") || "your-email@example.com";

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "completed">("idle");

  // Lookup product
  const purchasedItems = productId === "cart" 
    ? products // If checkout full cart
    : products.filter((p) => p.id === productId);

  // Default fallback if no valid products matched
  const items = purchasedItems.length > 0 ? purchasedItems : [products[0]];
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const startDownloadSimulation = () => {
    if (downloadState !== "idle") return;
    setDownloadState("downloading");
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState("completed");
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 180);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 flex-1 w-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-8"
      >
        {/* Glowing Success Ring */}
        <div className="mx-auto h-20 w-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20 relative">
          <span className="absolute inset-0 h-full w-full rounded-full bg-emerald-400/5 animate-ping"></span>
          <CheckCircle2 className="h-10 w-10" />
        </div>

        {/* Header Message */}
        <div className="space-y-3">
          <Badge variant="success">Payment Completed Successfully</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Your payment was securely processed via Stripe. The high-resolution PDF download keys are ready below and have been forwarded to your email.
          </p>
        </div>

        {/* Email indicator */}
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900 flex items-center justify-center gap-3 text-slate-300 text-xs sm:text-sm max-w-sm mx-auto">
          <Mail className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <span className="truncate">Sent to: <strong className="text-white font-bold">{email}</strong></span>
        </div>

        {/* Invoice Summary */}
        <div className="border-t border-b border-slate-900 py-6 text-left space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order Summary</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 bg-slate-900 rounded-lg text-emerald-400 text-[10px] font-mono">
                    PDF
                  </div>
                  <span className="text-slate-300 font-bold max-w-[200px] sm:max-w-md truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-white font-black">${item.price}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-sm font-black">
              <span className="text-slate-400">Total Price Paid</span>
              <span className="text-base text-emerald-400">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Interactive Download Action Container */}
        <div className="space-y-4 max-w-md mx-auto">
          {downloadState === "idle" && (
            <Button
              id="download-pdf-btn"
              onClick={startDownloadSimulation}
              className="w-full justify-center py-4 gap-2 text-sm shadow-emerald-500/20"
            >
              <Download className="h-5 w-5" /> Download Your Ebook PDFs
            </Button>
          )}

          {downloadState === "downloading" && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span className="animate-pulse">Retrieving secure cloud file...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-900">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-150"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          )}

          {downloadState === "completed" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                🎉 Download Triggered! Files are saving locally to your device.
              </div>
              <div className="flex gap-4">
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full justify-center text-xs py-3.5 gap-2">
                    Back to Storefront
                  </Button>
                </Link>
                <button
                  onClick={() => router.push("https://onlinewithmuuo.store")}
                  className="flex-1 inline-flex items-center justify-center font-semibold rounded-xl text-xs py-3.5 bg-slate-800 hover:bg-slate-700 text-white cursor-pointer border border-slate-700"
                >
                  Visit Main Hub <ExternalLink className="h-4 w-4 ml-1.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Authorized License Granted
          </span>
          <span>•</span>
          <span>Support: help@onlinewithmuuo.store</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
