"use client";

import React from "react";

const features = [
  {
    id: 1,
    title: "Instant Free Shipping",
    description: "Enjoy zero delivery fees on orders above $50. Track your items in real time with our live AI tracking dashboard.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/5",
  },
  {
    id: 2,
    title: "AI-Powered Curation",
    description: "Receive product suggestions uniquely customized to your usage, workspace size, and functional demands.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-500/5",
  },
  {
    id: 3,
    title: "Ultra-Secure Checkout",
    description: "All transactions are encrypted with quantum-safe standards. We process payments securely and instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 dark:bg-cyan-500/5",
  },
  {
    id: 4,
    title: "24/7 Expert Support",
    description: "Get immediate answers from specialized AI advisors and human agents whenever you need tech troubleshooting.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 dark:bg-purple-500/5",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Why Shop at TechMart AI?
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            We are redefining e-commerce with smart solutions, secure infrastructures, and a premium customer-centric ecosystem.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group flex flex-col p-8 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-500/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
