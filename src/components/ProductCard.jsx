"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { name, price, rating, category, badge, gradient, icon, img } = product;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success(`${name} added to cart!`, {
      icon: "🛒",
    });
  };

  const displayPrice = typeof price === "number" ? price : parseFloat(price || 0);
  const displayRating = typeof rating === "number" ? rating : parseFloat(rating || 0);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-300">
      
      {/* Product Image / Gradient Visual Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-8">
        
        {/* Badge */}
        {badge && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
            {badge}
          </span>
        )}

        {img ? (
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-850">
            {/* Background subtle glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-600/5 opacity-50" />
            <img
              src={img}
              alt={name}
              className="h-full w-full object-cover transition-all duration-500 scale-100 group-hover:scale-105"
            />
          </div>
        ) : (
          /* Dynamic Glassmorphic Tech Visual */
          <div className={`relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-tr ${gradient || "from-emerald-400 to-teal-600"} opacity-85 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105 group-hover:rotate-1 shadow-inner border border-white/5`}>
            <div className="absolute inset-0 bg-slate-950/5 dark:bg-slate-950/15 mix-blend-overlay rounded-2xl" />
            
            {/* Neon back glow */}
            <div className="absolute h-1/2 w-1/2 rounded-full bg-white/20 blur-2xl group-hover:bg-white/30 transition-all duration-300" />
            
            {/* Custom SVG Icon representing product shape */}
            <div className="relative z-10 text-white transform group-hover:scale-110 duration-300 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
              {icon || (
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
          {category}
        </span>

        {/* Title */}
        <h3 className="mt-2 text-base font-bold text-slate-950 dark:text-white line-clamp-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200">
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(displayRating) ? "fill-current" : "text-slate-300 dark:text-slate-700"}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-1">
            {displayRating.toFixed(1)}
          </span>
        </div>

        {/* Bottom row: Price & Buy */}
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800/80">
          <div>
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <p className="text-lg font-extrabold text-slate-950 dark:text-white">
              ${displayPrice.toFixed(2)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              href={`/items/${product._id || product.id}`}
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-emerald-600 hover:text-slate-950 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-500 dark:hover:text-slate-950 transition-all duration-300 hover:scale-105"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
