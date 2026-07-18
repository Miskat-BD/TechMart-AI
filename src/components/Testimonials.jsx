"use client";

import React from "react";

const reviews = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "AI Research Fellow",
    avatar: "MV",
    rating: 5,
    text: "The AeroSound Max AI headphones have completely changed my deep-focus coding blocks. The adaptive AI noise-canceling block out everything perfectly. Best purchase I've made all year!",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "Lead Hardware Engineer",
    avatar: "ER",
    rating: 5,
    text: "TechMart AI delivers exactly what tech enthusiasts want: sleek, high-performing gear and lightning-fast customer support. The CortexHub mini controls all of my lab's smart gear flawlessly.",
  },
  {
    id: 3,
    name: "Devon Miller",
    role: "Digital Nomad & Producer",
    avatar: "DM",
    rating: 4.8,
    text: "Ultra-fast delivery and a super polished purchasing experience. The OmniCharge AI adapter works incredibly well on international train rides. High-quality products and premium checkout.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            What Our Tech Community Says
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Read authentic reviews from researchers, developers, and creators worldwide who depend on our hardware.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative flex flex-col justify-between p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl hover:shadow-xl transition-all duration-300 hover:border-emerald-500/20"
            >
              <div>
                {/* Stars */}
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-current" : "text-slate-300 dark:text-slate-700"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Text content */}
                <blockquote className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{review.text}"
                </blockquote>
              </div>

              {/* User Bio */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-200/60 pt-4 dark:border-slate-800/80">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-xs font-bold text-slate-950">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
