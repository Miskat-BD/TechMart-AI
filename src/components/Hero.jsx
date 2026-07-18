"use client";

import React from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Hero() {
  const handleShopNow = () => {
    toast.success("Redirecting to product collection...");
  };

  const handleExplore = () => {
    toast("Welcome to TechMart AI! Scroll down to explore categories.", {
      icon: "⚡",
    });
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-32">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-400 mb-6 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              The Future of Shopping is AI-Powered
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Next-Gen Tech, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Curated by Intelligence.
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              Explore the absolute peak of hardware innovation. From AI-optimized wearables to smart home devices, we deliver high-performance gear tailored exactly to your lifestyle.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={handleShopNow}
                className="group relative flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8 py-4 text-sm font-bold text-slate-900 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                Shop Now
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              
              <button
                onClick={handleExplore}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/40 hover:bg-slate-800 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 backdrop-blur-sm"
              >
                Explore Innovations
              </button>
            </div>

            {/* Stats badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8 max-w-lg">
              <div>
                <p className="text-2xl font-bold text-white">50k+</p>
                <p className="text-xs text-slate-400 mt-1">Happy Techies</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">99.8%</p>
                <p className="text-xs text-slate-400 mt-1">CSAT Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p className="text-xs text-slate-400 mt-1">Avg. Delivery Time</p>
              </div>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative h-[320px] w-[320px] sm:h-[450px] sm:w-[450px] lg:h-[500px] lg:w-[500px] transition-transform hover:scale-105 duration-700">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-emerald-500/10 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-teal-500/15 animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Main Image Container */}
              <div className="absolute inset-10 rounded-2xl bg-gradient-to-tr from-slate-800/80 to-slate-900/80 p-3 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                <Image
                  src="/hero-gadget.png"
                  alt="Futuristic AI-powered headset product"
                  fill
                  sizes="(max-width: 768px) 320px, (max-width: 1200px) 450px, 500px"
                  priority
                  className="object-cover rounded-xl transition-all duration-500 hover:scale-110"
                />
              </div>

              {/* Floating micro badges */}
              <div className="absolute top-1/4 -left-4 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-xl backdrop-blur-sm animate-bounce [animation-duration:4s]">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Smart Engine</p>
                    <p className="text-[10px] text-emerald-400">Active v2.4</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 -right-4 rounded-2xl border border-slate-700 bg-slate-900/90 p-4 shadow-xl backdrop-blur-sm animate-bounce [animation-duration:5s]">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-teal-500/10 p-2 text-teal-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Guaranteed</p>
                    <p className="text-[10px] text-teal-400">2-Year Warranty</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
