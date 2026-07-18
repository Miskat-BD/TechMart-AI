"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";


export default function ProductDetailsPage(props) {
    // Unwrapping params using React 19's use() hook to match Next.js 16 requirements
    const params = use(props.params);
    const { id } = params;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseURL}/products/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Product not found");
                    }
                    throw new Error("Failed to load product details");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "An error occurred while loading details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors duration-300">

            <main className="flex-grow py-12 px-4">
                <div className="mx-auto max-w-5xl">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Innovations
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
                            <div className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-900"></div>
                            <div className="flex flex-col gap-6 py-4">
                                <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-12 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mt-6"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border dark:border-slate-800">
                            <svg className="mx-auto h-16 w-16 text-rose-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Product Not Found</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
                            <Link href="/" className="inline-block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition">
                                Go Home
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Product Visual */}
                            <div className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-center p-8">
                                {product.badge && (
                                    <span className="absolute top-6 left-6 z-10 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950">
                                        {product.badge}
                                    </span>
                                )}
                                {product.img ? (
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="h-full w-full object-cover rounded-2xl shadow-lg"
                                    />
                                ) : (
                                    <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 opacity-90 shadow-lg">
                                        <span className="text-white text-6xl font-extrabold">{product.name.substring(0, 2).toUpperCase()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Information */}
                            <div className="flex flex-col justify-center">
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
                                    {product.category}
                                </span>

                                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                    {product.name}
                                </h1>

                                {/* Rating */}
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "fill-current" : "text-slate-200 dark:text-slate-700"}`}
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                        {parseFloat(product.rating || 0).toFixed(1)} / 5.0 Rating
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <span className="text-xs text-slate-400 font-medium">Special TechMart Price</span>
                                    <p className="text-3xl font-extrabold text-slate-950 dark:text-white mt-1">
                                        ${parseFloat(product.price || 0).toFixed(2)}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="mt-8">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                        Description
                                    </h3>
                                    <p className="mt-3 text-base text-slate-600 dark:text-slate-450 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-10 flex gap-4">
                                    <button
                                        className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 text-center text-sm"
                                        onClick={() => alert(`Purchasing ${product.name} simulated!`)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
}
