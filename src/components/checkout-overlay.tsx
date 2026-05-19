"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store-context";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Lock, ShieldCheck, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CheckoutOverlay() {
  const router = useRouter();
  const {
    isOpenCheckout,
    activeProductForCheckout,
    cart,
    checkoutStep,
    startCheckoutSimulation,
    closeCheckout,
  } = useStore();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processStepMsg, setProcessStepMsg] = useState("Securing connection...");

  if (!isOpenCheckout) return null;

  // Determine items and totals
  const items = activeProductForCheckout ? [activeProductForCheckout] : cart;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // Input formatters
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    setCardNumber(parts.join(" "));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setExpiry(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCvc(value);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!name.trim()) {
      newErrors.name = "Name on card is required.";
    }
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Enter a valid 16-digit card number.";
    }
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Use MM/YY format.";
    }
    if (cvc.length !== 3) {
      newErrors.cvc = "CVC must be 3 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate multi-stage payment processing messages
    const messages = [
      "Contacting Stripe sandbox API...",
      "Encrypting payload with AES-256...",
      "Simulating bank 3D-Secure approval...",
      "Securing payment authorization...",
      "Compiling your custom PDF download key..."
    ];

    let msgIndex = 0;
    const interval = setInterval(() => {
      if (msgIndex < messages.length) {
        setProcessStepMsg(messages[msgIndex]);
        msgIndex++;
      }
    }, 450);

    const success = await startCheckoutSimulation({ email, name, cardNumber, expiry, cvc });
    clearInterval(interval);

    if (success) {
      // Elegant navigation with order search query
      const pId = activeProductForCheckout ? activeProductForCheckout.id : "cart";
      router.push(`/success?id=${pId}&email=${encodeURIComponent(email)}`);
      closeCheckout();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckout}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Panel */}
        <motion.div
          id="checkout-modal"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Lock className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base">Stripe Secure Checkout</h3>
                <p className="text-[10px] text-slate-400">Simulated Sandbox Environment</p>
              </div>
            </div>
            <button
              onClick={closeCheckout}
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {checkoutStep === "processing" ? (
            /* Processing Animation Screen */
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative flex items-center justify-center h-20 w-20">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/10 animate-ping"></span>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white">Processing Payment</h4>
                <p className="text-sm text-emerald-400 font-mono animate-pulse">{processStepMsg}</p>
              </div>
              <p className="text-xs text-slate-500 max-w-xs">
                Do not refresh the page or click back. Your checkout session is securely monitored.
              </p>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Order Summary */}
              <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Items</h4>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-300 font-medium truncate max-w-[260px]">
                      {item.title}
                    </span>
                    <span className="text-white font-bold">${item.price}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-400">Total Price</span>
                  <span className="text-lg text-emerald-400 font-black">${totalPrice}</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                    Email for PDF Delivery
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      id="checkout-email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-slate-950 border ${
                        errors.email ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                      } focus:border-emerald-500 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white transition-all`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                    Cardholder Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      id="checkout-name"
                      placeholder="Muuo Forex"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-slate-950 border ${
                        errors.name ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                      } focus:border-emerald-500 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white transition-all`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                    Credit Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      id="checkout-card"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className={`w-full bg-slate-950 border ${
                        errors.cardNumber ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                      } focus:border-emerald-500 focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-white tracking-widest transition-all`}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1.5">{errors.cardNumber}</p>
                  )}
                </div>

                {/* Expiry & CVC Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="checkout-expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className={`w-full bg-slate-950 border ${
                        errors.expiry ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                      } focus:border-emerald-500 focus:outline-none rounded-xl py-3 px-4 text-sm text-center text-white transition-all`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1.5">{errors.expiry}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                      CVC Code
                    </label>
                    <input
                      type="text"
                      id="checkout-cvc"
                      placeholder="123"
                      value={cvc}
                      onChange={handleCvcChange}
                      className={`w-full bg-slate-950 border ${
                        errors.cvc ? "border-red-500" : "border-slate-800 hover:border-slate-700"
                      } focus:border-emerald-500 focus:outline-none rounded-xl py-3 px-4 text-sm text-center text-white transition-all`}
                    />
                    {errors.cvc && <p className="text-red-500 text-xs mt-1.5">{errors.cvc}</p>}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <Button type="submit" id="submit-checkout" className="w-full justify-center py-4">
                Pay Securely ${totalPrice}
              </Button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" /> AES-256 Bit Encryption
                </span>
                <span>•</span>
                <span>Powered by Stripe Sandbox</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
