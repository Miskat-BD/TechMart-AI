"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

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

export default function AllProductsPage() {
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
        setError("Unable to load products. Please check if backend api is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            All Innovations
          </h1>
          <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
            Browse through our complete catalog of AI-enhanced devices and gadgets.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
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

        {/* Loading View */}
        {loading && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error View */}
        {!loading && error && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800/80">
            <p className="text-rose-500 font-semibold mb-4 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition font-semibold shadow-sm shadow-emerald-500/15"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800/80">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="mt-4 text-base font-medium">No products found in this category.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
