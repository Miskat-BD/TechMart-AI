"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Use session client from better-auth
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out!");
            router.push("/login");
            router.refresh();
          }
        }
      });
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent transition-transform hover:scale-105 duration-300">
                TechMart AI
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Home
            </Link>
            <Link
              href="/all-products"
              className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              All Products
            </Link>
            <Link
              href="/add-products"
              className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Add Products
            </Link>
            <Link
              href="/manage-products"
              className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 dark:text-slate-300 dark:hover:text-emerald-400"
            >
              Manage Products
            </Link>
          </nav>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            ) : session?.user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Hi, {session.user.name.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2 text-xs font-semibold text-white transition-all duration-200 shadow-sm shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-72 border-t border-slate-100 dark:border-slate-800" : "max-h-0"
          }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-4 pt-3 bg-white dark:bg-slate-900">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          >
            Dashboard
          </Link>
          <Link
            href="/checkout"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-emerald-400"
          >
            Checkout
          </Link>

          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800 flex flex-col gap-2">
            {isPending ? (
              <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            ) : session?.user ? (
              <>
                <div className="px-3 py-1 text-sm text-slate-500 dark:text-slate-400">
                  Logged in as <span className="font-semibold text-slate-700 dark:text-slate-300">{session.user.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center rounded-lg bg-slate-100 hover:bg-slate-200 py-2.5 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-lg bg-emerald-600 hover:bg-emerald-700 py-2.5 text-sm font-semibold text-white shadow-sm transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
