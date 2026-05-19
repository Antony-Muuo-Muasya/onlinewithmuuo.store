"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore, StoreTheme } from "@/context/store-context";
import { ShoppingBag, BookOpen, X, Menu, Trash2, ArrowRight, Lock, Unlock, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { 
    cart, 
    removeFromCart, 
    openCheckout,
    currency,
    setCurrency,
    convertPrice,
    theme,
    setTheme,
    promoDiscountApplied,
    applyPromoDiscount
  } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Easter Egg puzzle states
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [vaultCode, setVaultCode] = useState("");
  const [vaultError, setVaultError] = useState(false);
  const [vaultSuccess, setVaultSuccess] = useState(false);

  const totalItems = cart.length;
  
  // Calculate total cart value converted to currency
  const totalCartPriceUSD = cart.reduce((sum, item) => sum + item.price, 0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "First $100 Guide", href: "/products/first-100-online" },
  ];

  const handleDecrypt = (e: React.FormEvent) => {
    e.preventDefault();
    if (vaultCode.trim().toLowerCase() === "onlinewithmuuo") {
      setVaultSuccess(true);
      setVaultError(false);
      applyPromoDiscount();
      setTimeout(() => {
        setIsVaultOpen(false);
        setVaultSuccess(false);
        setVaultCode("");
      }, 3000);
    } else {
      setVaultError(true);
      setTimeout(() => setVaultError(false), 2000);
    }
  };

  const THEMES: { id: StoreTheme; color: string; label: string }[] = [
    { id: "cyber-emerald", color: "bg-emerald-500 shadow-emerald-500/20", label: "Emerald Cyber" },
    { id: "cyber-purple", color: "bg-violet-500 shadow-violet-500/20", label: "Midnight Nebula" },
    { id: "crimson-rose", color: "bg-rose-500 shadow-rose-500/20", label: "Crimson Gold" },
    { id: "amber-gold", color: "bg-amber-500 shadow-amber-500/20", label: "Sunset Cyber" }
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

            {/* Actions Panel */}
            <div className="flex items-center gap-4">
              
              {/* Feature 7: Theme Switcher Dot Panel */}
              <div className="hidden lg:flex items-center gap-2 p-1.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`h-4.5 w-4.5 rounded-full cursor-pointer transition-all hover:scale-125 hover:shadow-lg ${t.color} ${
                      theme === t.id ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    title={t.label}
                  />
                ))}
              </div>

              {/* Feature 3: Dynamic Currency Selector Dropdown */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer transition-colors shadow-inner"
              >
                <option value="USD">USD ($)</option>
                <option value="KES">KES (KSh)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>

              {/* Feature 10: Secret Safe Easter Egg padlock Trigger */}
              <button
                onClick={() => setIsVaultOpen(true)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  promoDiscountApplied 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white animate-pulse"
                }`}
                title={promoDiscountApplied ? "Cyber Vault Unlocked! 20% Applied." : "Decrypt Vault for 20% Off Code!"}
              >
                {promoDiscountApplied ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </button>

              <button
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => alert("Simulated OAuth / Sign In prompt: supabase auth email confirmations route successfully")}
              >
                Login / Sign Up
              </button>

              {/* Shopping Cart Button */}
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
                    className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-950"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 cursor-pointer"
            />

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
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-slate-900/40 rounded-2xl border border-slate-900 justify-between items-center">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.format} • {item.fileSize}</p>
                      <p className="text-xs font-bold text-emerald-400 mt-1">{convertPrice(item.price)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="py-20 text-center space-y-3">
                    <ShoppingBag className="h-10 w-10 text-slate-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-400">Your cart is empty</p>
                    <p className="text-xs text-slate-500">Explore the strategie library to download guides.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-900 bg-slate-900/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
                    <span className="text-xl font-black text-white">{convertPrice(totalCartPriceUSD)}</span>
                  </div>
                  
                  {promoDiscountApplied && (
                    <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                      🔥 Cyber Vault Code Applied: 20% OFF Site-wide!
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setIsCartOpen(false);
                      openCheckout();
                    }}
                    className="w-full py-4 justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* EASTER EGG DECRYPTION VAULT MODAL POPUP */}
      <AnimatePresence>
        {isVaultOpen && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel border-indigo-500/20 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
            >
              <button 
                onClick={() => setIsVaultOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-900 rounded-lg text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl mx-auto flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 animate-pulse" />
              </div>

              {!vaultSuccess ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white">Decrypt Cyber Security Vault</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      Crack the decryption passkey to unlock a permanent **20% Discount Code** applied instantly to checkout!
                    </p>
                  </div>

                  <form onSubmit={handleDecrypt} className="space-y-3">
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Decryption Password (lowercase hint: bot brand name)</label>
                      <input 
                        type="text" 
                        value={vaultCode}
                        onChange={(e) => setVaultCode(e.target.value)}
                        placeholder="Enter the secret key..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 text-center font-mono"
                      />
                    </div>

                    {vaultError && (
                      <p className="text-xs text-rose-500 font-bold">❌ Decryption Failed. Check passcode and try again!</p>
                    )}

                    <Button type="submit" className="w-full py-3.5 justify-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin" /> Verify & Decrypt Code
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="space-y-4 py-4 animate-bounce">
                  <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full mx-auto flex items-center justify-center">
                    <Unlock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Access Granted!</h3>
                    <p className="text-emerald-400 text-xs font-bold font-mono mt-1">
                      PROMO CODE: 'ONLINEWITHMUUO_VAULT' ACTIVE! 20% DISCOUNT SITE-WIDE APPLIED.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
