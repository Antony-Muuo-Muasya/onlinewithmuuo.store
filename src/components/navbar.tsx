"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/store-context";
import { ShoppingBag, BookOpen, X, Menu, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { cart, removeFromCart, openCheckout } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "First $100 Guide", href: "/products/first-100-online" },
    { name: "Freelance Action Plan", href: "/products/freelance-action-plan" },
    { name: "Complete Bundle", href: "/products/complete-first-100-bundle" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg text-slate-950 group-hover:rotate-6 transition-transform duration-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-emerald-400">
                  OnlineWith<span className="text-emerald-400 font-black">Muuo</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                      isActive ? "text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => alert("Simulated OAuth / Sign In prompt: supabase auth email confirmations route successfully")}
              >
                Login / Sign Up
              </button>

              <button
                id="cart-trigger"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-900/60 rounded-xl transition-all cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-xs font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-950"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-emerald-400 md:hidden cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-900 bg-slate-950 px-4 pt-2 pb-4 space-y-2"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-emerald-400 border-l-4 border-emerald-500"
                        : "text-slate-300 hover:bg-slate-900 hover:text-emerald-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Side Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-slate-950 border-l border-slate-900 z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {totalItems === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-slate-900/50 rounded-full text-slate-500 mb-4">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h3 className="text-slate-300 font-semibold mb-1">Your cart is empty</h3>
                    <p className="text-sm text-slate-500 max-w-xs">
                      Explore our step-by-step blueprints and grab a copy of our high-converting guidebooks.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 bg-slate-900/40 rounded-xl border border-slate-900 flex gap-4 items-center"
                    >
                      <div className="h-16 w-12 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        PDF
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{item.format}</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">${item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {totalItems > 0 && (
                <div className="p-6 border-t border-slate-900 bg-slate-900/20">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-400 text-sm">Subtotal</span>
                    <span className="text-2xl font-black text-white">${totalPrice}</span>
                  </div>

                  <Button
                    onClick={() => {
                      setIsCartOpen(false);
                      openCheckout(); // Open standard cart checkout overlay
                    }}
                    className="w-full justify-center gap-2 py-4"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Button>

                  <p className="text-center text-[10px] text-slate-500 mt-4 flex items-center justify-center gap-1">
                    🔒 Secured payment handled with simulated Stripe processor
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
