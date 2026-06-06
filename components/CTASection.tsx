"use client";
import React from "react";
export default function CTASection() {
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
    <section className="relative py-24 px-4 bg-farm-green text-white text-center overflow-hidden">
      {/* Decorative subtle vintage pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Subtitle */}
        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-farm-orange bg-white/10 px-4 py-1.5 rounded-none">
          KONTAK KAMI
        </span>
        {/* Big Heading */}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider uppercase leading-none max-w-2xl">
          TERTARIK MENGENAL KOLEKSI JAGOER ROOSTER FARM?
        </h2>
        {/* Description */}
        <p className="max-w-xl text-xs sm:text-sm text-white/80 font-light leading-relaxed tracking-wide">
          Hubungi kami untuk informasi farm, kunjungan edukasi, atau mengenal lebih jauh karakter koleksi ayam kami.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a
            href="https://wa.me/6285101526243" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3.5 text-xs uppercase tracking-widest font-bold bg-[#ECA83D] text-white hover:bg-white hover:text-farm-green transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Hubungi WhatsApp
          </a>
          <button
            onClick={() => handleScrollTo("galeri")}
            className="px-6 py-3.5 text-xs uppercase tracking-widest font-bold border border-white/30 text-white hover:bg-white hover:text-farm-green transition-all duration-300 transform hover:scale-105"
          >
            Lihat Galeri
          </button>
        </div>
      </div>
    </section>
  );
}
