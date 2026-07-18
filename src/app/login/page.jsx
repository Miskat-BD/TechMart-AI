"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Invalid email or password");
            } else if (data) {
                toast.success("Login Successful!");
                router.push("/");
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({ provider: "google" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Log in to your TechMart AI account</p>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />

                    <button
                        disabled={loading}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account? <Link href="/register" className="text-emerald-600 font-semibold">Sign Up</Link>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center text-xs text-slate-400 uppercase"><span className="bg-white px-2">Or</span></div>
                </div>

                <button onClick={handleGoogle} className="w-full py-3 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;