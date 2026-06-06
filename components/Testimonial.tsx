import React from "react";
export default function Testimonial() {
  return (
    <section className="py-24 px-4 bg-white border-y border-farm-green/5">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Minimalist Paw/Animal Icon */}
        <div className="mb-6 text-farm-orange">
          <svg
            className="w-8 h-8 opacity-80"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Paw Icon design */}
            <circle cx="12" cy="14" r="4" />
            <circle cx="6.5" cy="8.5" r="2" />
            <circle cx="10" cy="5" r="2" />
            <circle cx="14" cy="5" r="2" />
            <circle cx="17.5" cy="8.5" r="2" />
          </svg>
        </div>
        {/* Heading */}
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-farm-green/50 block mb-2">
          REVIEWS
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-farm-green uppercase mb-10">
          APA KATA PENGUNJUNG
        </h2>
        {/* Quote */}
        <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-farm-green italic leading-relaxed tracking-wide mb-8 px-4 text-zinc-700">
          &ldquo;Farm-nya rapi, ayam-ayamnya unik dan terawat sangat baik. Edukasinya nyaman dan membantu untuk mengenal karakter ayam lokal.&rdquo;
        </blockquote>
        {/* Citation */}
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-6 bg-farm-green/20"></span>
          <span className="text-xs uppercase font-semibold tracking-widest text-farm-green">
            Reza
          </span>
          <span className="text-xs text-zinc-400 font-light">|</span>
          <span className="text-xs uppercase font-medium tracking-widest text-farm-orange">
            Komunitas Ayam Lokal
          </span>
          <span className="h-[1px] w-6 bg-farm-green/20"></span>
        </div>
      </div>
    </section>
  );
}
