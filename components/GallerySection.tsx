"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  // Close modal on ESC press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const allImages = [
    { src: "/images/gallery-1.jpg", alt: "Galeri Foto 1 - Perawatan Pama Coklat" },
    { src: "/images/gallery-2.jpg", alt: "Galeri Foto 2 - Kondisi Kandang Mangon" },
    { src: "/images/gallery-3.jpg", alt: "Galeri Foto 3 - Ras Silangan Pama Saingon" },
    { src: "/images/ayam-hitam-karakter.jpg", alt: "Galeri Foto 4 - Postur Ayam Hitam Karakter" },
    { src: "/images/bangkok-blorok-madu.jpg", alt: "Galeri Foto 5 - Bangkok Blorok Madu Berdiri Tegap" },
    { src: "/images/pama-coklat.jpg", alt: "Galeri Foto 6 - Ayam Pama Coklat Aktif" },
    { src: "/images/pama-saingon.jpg", alt: "Galeri Foto 7 - Pama Saingon Ekor Indah" },
  ];

  // If showAll is false, show 3 images. If true, show all 7.
  const visibleImages = showAll ? allImages : allImages.slice(0, 3);

  return (
    <section id="galeri" className="py-20 px-4 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-farm-orange block mb-2">
              DOKUMENTASI
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wider text-farm-green uppercase">
              GALERI FARM
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed mt-1">
              Momen keseharian di JAGOER ROOSTER FARM. Klik foto untuk memperbesar.
            </p>
          </div>
          
          <div>
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[10px] uppercase font-bold tracking-widest text-farm-green border-b border-farm-green/20 hover:border-farm-orange hover:text-farm-orange pb-1 transition-all duration-300 focus:outline-none cursor-pointer"
            >
              {showAll ? "LIHAT LEBIH SEDIKIT" : "LIHAT SEMUA"}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
          {visibleImages.map((img, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(img.src);
                setSelectedAlt(img.alt);
              }}
              className="group relative aspect-square w-full border border-farm-green/10 bg-farm-grey overflow-hidden shadow-sm cursor-pointer animate-zoom-in"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-farm-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/95 text-farm-green flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}

          {/* Dynamic Last Card */}
          {!showAll ? (
            /* More Pictures Card */
            <button
              onClick={() => setShowAll(true)}
              className="group aspect-square w-full border border-dashed border-farm-green/20 bg-farm-grey/40 hover:bg-farm-grey flex flex-col items-center justify-center text-center p-6 transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
            >
              <div className="w-12 h-12 border border-farm-green/10 bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-farm-green/60 group-hover:text-farm-orange transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-farm-green/70 group-hover:text-farm-green uppercase">
                MORE PICTURES
              </span>
              <span className="text-[10px] text-zinc-400 font-light mt-1">
                Tampilkan 4 foto lainnya
              </span>
            </button>
          ) : (
            /* Show Less Card */
            <button
              onClick={() => setShowAll(false)}
              className="group aspect-square w-full border border-dashed border-farm-orange/30 bg-farm-orange/5 hover:bg-farm-orange/10 flex flex-col items-center justify-center text-center p-6 transition-all duration-300 shadow-sm focus:outline-none cursor-pointer animate-zoom-in"
            >
              <div className="w-12 h-12 border border-farm-orange/20 bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-farm-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="font-display text-sm font-bold tracking-widest text-farm-orange group-hover:text-farm-orange/90 uppercase">
                SHOW LESS
              </span>
              <span className="text-[10px] text-zinc-400 font-light mt-1">
                Tampilkan lebih sedikit foto
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-dark/90 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Lightbox Content Container */}
          <div 
            className="relative w-full max-w-4xl max-h-[85vh] aspect-[4/3] sm:aspect-video bg-farm-dark border border-white/10 overflow-hidden shadow-2xl p-1 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-farm-orange hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Close image lightbox"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Large Image Frame */}
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt={selectedAlt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Caption Overlay */}
            {selectedAlt && (
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white/95 text-[10px] sm:text-xs px-4 py-3 uppercase tracking-widest text-center font-display border-t border-white/5">
                {selectedAlt}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
