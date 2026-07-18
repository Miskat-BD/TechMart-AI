"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function ManageProductsPage() {
    const { data: session, isPending } = authClient.useSession();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const fetchMyProducts = async () => {
        if (!session?.user) return;
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/products?ownerId=${session.user.id}`);
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError("Could not load your products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending) {
            fetchMyProducts();
        }
    }, [session, isPending]);

    const handleDelete = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const tokenRes = await fetch("/api/token");
            if (!tokenRes.ok) {
                toast.error("Authentication expired. Please log in again.");
                return;
            }
            const { token } = await tokenRes.json();

            const response = await fetch(`${baseURL}/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success("Product deleted successfully!");
                setProducts(products.filter(p => p._id !== productId));
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to delete product.");
            }
        } catch (err) {
            toast.error("Error connecting to server.");
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const updatedData = Object.fromEntries(formData.entries());
        updatedData.price = parseFloat(updatedData.price);
        updatedData.rating = parseFloat(updatedData.rating);

        try {
            const tokenRes = await fetch("/api/token");
            if (!tokenRes.ok) {
                toast.error("Authentication expired. Please log in again.");
                setSubmitting(false);
                return;
            }
            const { token } = await tokenRes.json();

            const response = await fetch(`${baseURL}/products/${editingProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                toast.success("Product updated successfully!");
                setEditingProduct(null);
                fetchMyProducts();
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to update product.");
            }
        } catch (err) {
            toast.error("Error connecting to server.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-12 px-4">
            <div className="mx-auto max-w-7xl">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent sm:text-5xl">
                        Manage Your Products
                    </h1>
                    <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
                        Create, update, and manage your dynamic inventory on TechMart AI.
                    </p>
                </div>

                {isPending || loading && products.length === 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-96 bg-slate-100 dark:bg-slate-900 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : !session?.user ? (
                    <div className="max-w-md mx-auto my-12 p-8 bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Authentication Required</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">Log in to view and manage your own products list.</p>
                        <Link href="/login" className="inline-block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition">
                            Log In
                        </Link>
                    </div>
                ) : error ? (
                    <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border dark:border-slate-800">
                        <p className="text-rose-500 font-semibold mb-4">{error}</p>
                        <button onClick={fetchMyProducts} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition">
                            Retry
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800/80">
                        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <p className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-300">You haven't added any products yet.</p>
                        <Link href="/add-products" className="mt-6 inline-block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition">
                            Add Your First Product
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <div key={product._id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-300">
                                <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-8">
                                    {product.badge && (
                                        <span className="absolute top-4 left-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-950">
                                            {product.badge}
                                        </span>
                                    )}
                                    {product.img ? (
                                        <img src={product.img} alt={product.name} className="h-full w-full object-cover rounded-2xl transition-all duration-500 scale-100 group-hover:scale-105" />
                                    ) : (
                                        <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 opacity-85">
                                            <span className="text-white text-3xl font-extrabold">{product.name.substring(0, 2).toUpperCase()}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">{product.category}</span>
                                    <h3 className="mt-2 text-base font-bold text-slate-950 dark:text-white line-clamp-1">{product.name}</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{product.description}</p>
                                    
                                    <div className="mt-6 flex gap-3 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                                        <button 
                                            onClick={() => setEditingProduct(product)} 
                                            className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-xl transition"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product._id)} 
                                            className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-xl transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {editingProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
                        <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Edit Product Details</h2>
                                <button 
                                    onClick={() => setEditingProduct(null)} 
                                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Product Name</label>
                                    <input name="name" required defaultValue={editingProduct.name} className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Price ($)</label>
                                    <input name="price" type="number" step="0.01" required defaultValue={editingProduct.price} className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rating (0-5)</label>
                                    <input name="rating" type="number" step="0.1" max="5" required defaultValue={editingProduct.rating} className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Category</label>
                                    <input name="category" required defaultValue={editingProduct.category} className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Badge</label>
                                    <input name="badge" defaultValue={editingProduct.badge || ""} placeholder="e.g. Sale, New, Trending" className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Image URL</label>
                                    <input name="img" required defaultValue={editingProduct.img} className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                </div>
                                <div className="flex flex-col gap-1.5 md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Description</label>
                                    <textarea name="description" required defaultValue={editingProduct.description} className="p-3 border dark:border-slate-800 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none h-24 text-sm" />
                                </div>

                                <div className="md:col-span-2 flex gap-3 mt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setEditingProduct(null)} 
                                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={submitting} 
                                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition disabled:opacity-50 text-sm"
                                    >
                                        {submitting ? "Updating..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
