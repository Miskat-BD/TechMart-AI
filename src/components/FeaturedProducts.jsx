"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";

const productsData = [
  {
    id: 1,
    name: "AeroSound Max AI",
    price: 299.99,
    rating: 4.9,
    category: "Premium Audio",
    badge: "Best Seller",
    gradient: "from-cyan-500 to-blue-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "NeuraWatch Pro",
    price: 199.99,
    rating: 4.8,
    category: "Wearables",
    badge: "New",
    gradient: "from-purple-500 to-indigo-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "VisionGlass Lite",
    price: 499.99,
    rating: 4.7,
    category: "AR / VR Gear",
    badge: null,
    gradient: "from-pink-500 to-rose-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "KeyBoard Matrix",
    price: 149.99,
    rating: 4.6,
    category: "Smart Devices",
    badge: null,
    gradient: "from-amber-400 to-orange-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-4-8v8m8-8v8M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "CortexHub mini",
    price: 89.99,
    rating: 4.5,
    category: "Smart Home",
    badge: null,
    gradient: "from-emerald-400 to-teal-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "LuminaDesk Pro",
    price: 129.99,
    rating: 4.7,
    category: "Smart Home",
    badge: null,
    gradient: "from-teal-400 to-cyan-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 7,
    name: "OmniCharge AI",
    price: 59.99,
    rating: 4.8,
    category: "Power & Chargers",
    badge: "Trending",
    gradient: "from-rose-400 to-red-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 8,
    name: "AeroDrone X1",
    price: 399.99,
    rating: 4.9,
    category: "Smart Devices",
    badge: "Trending",
    gradient: "from-blue-400 to-indigo-600",
    icon: (
      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

const categories = ["All", "Smart Devices", "Premium Audio", "Wearables", "AR / VR Gear", "Smart Home", "Power & Chargers"];

export default function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All"
    ? productsData
    : productsData.filter((p) => p.category === selectedCategory);

  return (
    <section className="bg-white py-20 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Featured Innovations
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Equip yourself with the best-selling, top-rated intelligence gadgets of the season. Handpicked, AI-verified performance.
            </p>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/10"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No products found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
