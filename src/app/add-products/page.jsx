"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

const AddProductForm = () => {
    const { data: session, isPending } = authClient.useSession();
    const [loading, setLoading] = useState(false);
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user) {
            toast.error("You must be logged in to add a product.");
            return;
        }

        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const productData = Object.fromEntries(formData.entries());

        // সংখ্যায় রূপান্তর (price এবং rating)
        productData.price = parseFloat(productData.price);
        productData.rating = parseFloat(productData.rating);
        productData.ownerId = session.user.id;

        try {
            const tokenRes = await fetch("/api/token");
            if (!tokenRes.ok) {
                toast.error("Authentication expired. Please log in again.");
                setLoading(false);
                return;
            }
            const { token } = await tokenRes.json();

            const response = await fetch(`${baseURL}/products`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                toast.success("Product added successfully!");
                e.target.reset();
            } else {
                toast.error("Failed to add product.");
            }
        } catch (err) {
            toast.error("Server connection error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-12 px-4">
            {isPending ? (
                <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 animate-pulse">
                    <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        ))}
                    </div>
                </div>
            ) : !session?.user ? (
                <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                    <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Authentication Required</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">You need to log in to create and manage products on TechMart AI.</p>
                    <Link href="/login" className="inline-block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition">
                        Log In
                    </Link>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Add New Product</h2>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input name="name" required placeholder="Product Name" className="p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white" />
                        <input name="price" type="number" step="0.01" required placeholder="Price" className="p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white" />
                        <input name="rating" type="number" step="0.1" max="5" required placeholder="Rating (0-5)" className="p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white" />
                        <input name="category" required placeholder="Category" className="p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white" />
                        <input name="badge" placeholder="Badge (e.g. New, Sale)" className="p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white" />
                        <input name="img" required placeholder="Image URL" className="md:col-span-2 p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white" />
                        <textarea name="description" required placeholder="Product Description" className="md:col-span-2 p-3 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 h-24 bg-transparent dark:text-white" />

                        <button
                            disabled={loading}
                            className="md:col-span-2 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Add Product"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddProductForm;