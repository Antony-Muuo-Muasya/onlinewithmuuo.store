import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brand description */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-slate-950">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                OnlineWith<span className="text-emerald-400">Muuo</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              Providing step-by-step digital workbooks, freelancing blueprints, and action checklists to help you land micro-gigs and make your first $100 online working from anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Store Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Homepage Catalog</Link>
              </li>
              <li>
                <Link href="/products/first-100-online" className="hover:text-emerald-400 transition-colors">First $100 Guide</Link>
              </li>
              <li>
                <Link href="/products/freelance-action-plan" className="hover:text-emerald-400 transition-colors">Freelance Action Plan</Link>
              </li>
              <li>
                <Link href="/products/complete-first-100-bundle" className="hover:text-emerald-400 transition-colors">Complete Bundle</Link>
              </li>
            </ul>
          </div>

          {/* Security & Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Support & Trust</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-900 max-w-xs">
                <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span>Encrypted checkout. Simulated payment sandbox activated.</span>
              </div>
              <p className="text-xs text-slate-500">
                Have questions? Reach our mentor team via email support@onlinewithmuuo.store.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} OnlineWithMuuo Storefront. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <span className="hover:text-emerald-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-emerald-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-emerald-400 cursor-pointer">Refund Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
