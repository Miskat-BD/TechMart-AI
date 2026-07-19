"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const categories = ["All", "Smart Devices", "Premium Audio", "Wearables", "AR / VR Gear", "Smart Home", "Power & Chargers"];

const SkeletonCard = () => (
  <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 p-6 gap-4 animate-pulse">
    <div className="aspect-square w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
    <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
    <div className="h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
    <div className="h-4 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
    <div className="flex justify-between items-center mt-4">
      <div className="h-6 w-1/4 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  </div>
);

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${baseURL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load featured products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Limit to show only the first 6 products for the Featured section
  const displayedProducts = filteredProducts.slice(0, 6);

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
                className={`rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/10"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-rose-500 font-semibold mb-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition font-medium text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid Display */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayedProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                No products found in this category.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
