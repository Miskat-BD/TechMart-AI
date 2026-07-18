"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const AddProductForm = () => {
    const [loading, setLoading] = useState(false);
    const baseURL = process.env.NEXT_PUBLIC_API_URL

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const productData = Object.fromEntries(formData.entries());

        // সংখ্যায় রূপান্তর (price এবং rating)
        productData.price = parseFloat(productData.price);
        productData.rating = parseFloat(productData.rating);

        try {
            const response = await fetch(`${baseURL}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
        <div className="max-w-2xl mx-auto my-12 p-8 bg-white shadow-lg rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Add New Product</h2>
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input name="name" required placeholder="Product Name" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="price" type="number" step="0.01" required placeholder="Price" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="rating" type="number" step="0.1" max="5" required placeholder="Rating (0-5)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="category" required placeholder="Category" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="badge" placeholder="Badge (e.g. New, Sale)" className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="img" required placeholder="Image URL" className="md:col-span-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" />
                <textarea name="description" required placeholder="Product Description" className="md:col-span-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 h-24" />

                <button
                    disabled={loading}
                    className="md:col-span-2 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition"
                >
                    {loading ? "Saving..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;