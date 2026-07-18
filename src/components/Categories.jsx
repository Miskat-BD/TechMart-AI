"use client";

import React from "react";
import toast from "react-hot-toast";

const categoriesData = [
  {
    id: 1,
    title: "Smart Devices",
    count: "42 Products",
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Premium Audio",
    count: "28 Products",
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Wearables",
    count: "19 Products",
    color: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "AR / VR Gear",
    count: "15 Products",
    color: "from-cyan-500/10 to-teal-500/10 text-cyan-600 dark:text-cyan-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Smart Home",
    count: "31 Products",
    color: "from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Power & Chargers",
    count: "22 Products",
    color: "from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Categories() {
  const handleCategoryClick = (title) => {
    toast.success(`Opening ${title} collection`);
  };

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Browse by Intelligent Category
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Dive into specialized hardware ecosystems designed to seamlessly sync, empower, and optimize your workflows.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categoriesData.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.title)}
              className="group flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 focus:outline-none"
            >
              {/* Icon Container */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {category.icon}
              </div>

              {/* Title & Count */}
              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200">
                {category.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 font-medium">
                {category.count}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
