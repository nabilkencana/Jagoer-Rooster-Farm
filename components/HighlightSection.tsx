"use client";
import React from "react";
export default function HighlightSection() {
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
    <section id="highlight" className="relative w-full py-16 px-4 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-farm-green/15 divide-y md:divide-y-0 md:divide-x divide-farm-green/15 overflow-hidden bg-white shadow-sm">
          
          {/* Card 1: Tentang Farm */}
          <div id="tentang" className="group flex flex-col justify-between p-8 md:p-12 bg-white transition-all duration-300 hover:bg-farm-grey/30">
            <div className="flex flex-col gap-4">
              {/* Icon */}
              <div className="text-farm-green group-hover:text-farm-orange transition-colors duration-300">
                <svg
                  className="w-8 h-8 stroke-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              
              {/* Heading */}
              <h3 className="font-display text-xl font-bold tracking-wider text-farm-green uppercase">
                TENTANG FARM
              </h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                Konten kami fokus bersih, karakter, dan kenyamanan ayam unggas di lingkungan farm yang alami.
              </p>
            </div>
            
            {/* Button */}
            <div className="mt-8">
              <button
                onClick={() => handleScrollTo("perawatan")}
                className="text-[10px] uppercase font-bold tracking-widest text-farm-green hover:text-farm-orange border-b border-farm-green/20 hover:border-farm-orange pb-1 transition-all duration-300"
              >
                OUR STORY
              </button>
            </div>
          </div>
          {/* Card 2: Ras Pilihan */}
          <div className="group flex flex-col justify-between p-8 md:p-12 bg-farm-orange text-white transition-all duration-300 hover:opacity-95">
            <div className="flex flex-col gap-4">
              {/* Icon */}
              <div>
                <svg
                  className="w-8 h-8 stroke-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 8 8 12 12 16" />
                  <line x1="16" y1="12" x2="8" y2="12" />
                </svg>
              </div>
              
              {/* Heading */}
              <h3 className="font-display text-xl font-bold tracking-wider uppercase">
                RAS PILIHAN
              </h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                Koleksi ayam mulai dari Pama, Mangon, hingga persilangan unik dengan postur dan karakter terbaik.
              </p>
            </div>
            
            {/* Button */}
            <div className="mt-8">
              <button
                onClick={() => handleScrollTo("katalog")}
                className="text-[10px] uppercase font-bold tracking-widest bg-white text-farm-orange px-4 py-2 hover:bg-farm-green hover:text-white transition-all duration-300"
              >
                LIHAT KATALOG
              </button>
            </div>
          </div>
          {/* Card 3: Kunjungi Farm */}
          <div className="group flex flex-col justify-between p-8 md:p-12 bg-white transition-all duration-300 hover:bg-farm-grey/30">
            <div className="flex flex-col gap-4">
              {/* Icon */}
              <div className="text-farm-green group-hover:text-farm-orange transition-colors duration-300">
                <svg
                  className="w-8 h-8 stroke-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              
              {/* Heading */}
              <h3 className="font-display text-xl font-bold tracking-wider text-farm-green uppercase">
                KUNJUNGI FARM
              </h3>
              
              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                Rasakan pengalaman edukasi tentang farm modern dan lihat langsung perawatan koleksi kami.
              </p>
            </div>
            
            {/* Button */}
            <div className="mt-8">
              <button
                onClick={() => handleScrollTo("footer")}
                className="text-[10px] uppercase font-bold tracking-widest text-farm-green hover:text-farm-orange border-b border-farm-green/20 hover:border-farm-orange pb-1 transition-all duration-300"
              >
                ALAMAT KAMI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
