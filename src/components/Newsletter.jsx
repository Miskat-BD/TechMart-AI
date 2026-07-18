"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("Successfully subscribed to tech updates!", {
        icon: "📨",
      });
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24">
      {/* Background neon rings */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 shadow-2xl border border-slate-800/80 sm:px-12 sm:py-16 md:px-16">
          <div className="relative mx-auto max-w-2xl text-center">
            
            {/* Title */}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Stay Ahead of the Curve
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
              Subscribe to the TechMart AI digest to get early product drops, deep-dive technical breakdowns, and exclusive discounts. No spam, ever.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubscribe} className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
              />
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center rounded-2xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3.5 text-sm font-bold text-slate-900 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 shrink-0"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {/* Footer mini text */}
            <p className="mt-4 text-xs text-slate-500">
              We care about your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
