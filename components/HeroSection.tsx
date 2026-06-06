"use client";
import React from "react";
export default function HeroSection() {
  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 56,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="relative w-full h-[680px] flex items-center justify-center overflow-hidden bg-farm-dark">
      {/* Background Image with Zoom Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 scale-105 animate-zoom-in"
        style={{ backgroundImage: `url('/images/hero.jpg')` }}
      />
      
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-farm-dark via-farm-dark/50 to-farm-dark/40" />
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center gap-6">
        
        {/* Vintage Top Badge */}
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-8 bg-white/40"></span>
          <span className="text-xs uppercase font-medium tracking-[0.25em] text-farm-orange">
            SEJAK 2025
          </span>
          <span className="h-[1px] w-8 bg-white/40"></span>
        </div>
        {/* Big Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider text-white uppercase leading-none drop-shadow-md">
          JAGOER ROOSTER FARM
        </h1>
        {/* Description */}
        <p className="max-w-xl text-sm sm:text-base font-light tracking-wide text-white/80 leading-relaxed">
          Peternakan ayam lokal dengan koleksi ras pilihan, perawatan sehat, dan edukasi farm modern.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => handleScrollTo("katalog")}
            className="px-6 py-3 text-xs uppercase tracking-widest font-bold bg-farm-green text-white hover:bg-farm-orange transition-all duration-300 transform hover:scale-105 shadow-md shadow-farm-dark/50"
          >
            Lihat Jenis Ayam
          </button>
          <button
            onClick={() => handleScrollTo("footer")}
            className="px-6 py-3 text-xs uppercase tracking-widest font-bold border border-white/40 text-white hover:bg-white hover:text-farm-dark transition-all duration-300 transform hover:scale-105"
          >
            Hubungi Kami
          </button>
        </div>
      </div>
      {/* Subtle bottom divider/line decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
