"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ChickenItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  footerText: string;
  image: string;
  // Extended Details for Popup Modal
  origin: string;
  weightRange: string;
  age: string;
  characterDetail: string;
}

interface ChickenCatalogProps {
  initialItems?: ChickenItem[];
}

export default function ChickenCatalog({ initialItems = [] }: ChickenCatalogProps) {
  const [selectedChicken, setSelectedChicken] = useState<ChickenItem | null>(null);
  const [items, setItems] = useState<ChickenItem[]>(initialItems);

  // Close modal on ESC press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedChicken(null);
      }
    };
    if (selectedChicken) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedChicken]);

  // Sync state if initialItems change
  useEffect(() => {
    if (initialItems) {
      setItems(initialItems);
    }
  }, [initialItems]);

  return (
    <section id="katalog" className="py-20 px-4 bg-[#FDFBF7] border-t border-farm-green/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-farm-orange bg-farm-orange/10 px-3 py-1">
            GARIS KETURUNAN TERJAGA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wider text-farm-green uppercase">
            KATALOG RAS PILIHAN
          </h2>
          <p className="max-w-md text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
            Koleksi premium dengan garis keturunan terjaga dan karakter khas. Klik kartu untuk melihat detail ras.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedChicken(item)}
              className="group flex flex-col bg-white border border-farm-green/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-farm-green/20 cursor-pointer"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-farm-grey">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={item.id === "pama-coklat"}
                />
              </div>

              {/* Info Frame */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* Tag */}
                  <span className="inline-block px-2 py-0.5 border border-farm-green/10 text-[9px] font-bold tracking-widest text-farm-green/60 bg-farm-grey/40 uppercase mb-3">
                    {item.tag}
                  </span>
                  
                  {/* Title */}
                  <h3 className="font-display text-lg font-bold tracking-wide text-farm-green uppercase mb-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-500 leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="pt-4 border-t border-farm-grey flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-wider text-farm-green/50 uppercase">
                    {item.footerText}
                  </span>
                  
                  {/* Interactive Plus Icon */}
                  <div className="w-6 h-6 border border-farm-green/15 flex items-center justify-center text-farm-green group-hover:bg-farm-green group-hover:text-white transition-all duration-300">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal Dialog */}
      {selectedChicken && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-dark/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedChicken(null)}
        >
          {/* Modal Content Box */}
          <div 
            className="relative bg-white border border-farm-green/15 w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto sm:overflow-visible transition-all duration-300 transform scale-100 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedChicken(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 border border-farm-green/10 flex items-center justify-center text-farm-green hover:bg-farm-orange hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Column */}
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full w-full min-h-[250px] bg-farm-grey">
                <Image
                  src={selectedChicken.image}
                  alt={selectedChicken.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Detail Column */}
              <div className="p-8 flex flex-col justify-between">
                <div>
                  {/* Category Tag */}
                  <span className="inline-block px-2.5 py-0.5 border border-farm-orange/20 text-[9px] font-bold tracking-widest text-farm-orange bg-farm-orange/5 uppercase mb-3">
                    {selectedChicken.tag}
                  </span>

                  {/* Header Title */}
                  <h3 className="font-display text-2xl font-bold tracking-wider text-farm-green uppercase mb-4">
                    {selectedChicken.name}
                  </h3>

                  {/* Characteristic Spec Tags */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-farm-grey mb-6">
                    <div className="text-center">
                      <span className="block text-[8px] uppercase tracking-widest text-zinc-400 font-semibold mb-0.5">Asal</span>
                      <span className="block text-[10px] font-bold text-farm-green truncate">{selectedChicken.origin}</span>
                    </div>
                    <div className="text-center border-x border-farm-grey">
                      <span className="block text-[8px] uppercase tracking-widest text-zinc-400 font-semibold mb-0.5">Bobot</span>
                      <span className="block text-[10px] font-bold text-farm-green truncate">{selectedChicken.weightRange}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[8px] uppercase tracking-widest text-zinc-400 font-semibold mb-0.5">Usia</span>
                      <span className="block text-[10px] font-bold text-farm-green truncate">{selectedChicken.age}</span>
                    </div>
                  </div>

                  {/* Full Character Paragraph */}
                  <p className="text-xs text-zinc-500 leading-relaxed font-light mb-6">
                    {selectedChicken.characterDetail}
                  </p>
                </div>

                {/* Footer Interactive Actions */}
                <div className="pt-4 border-t border-farm-grey flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-farm-green/60">
                    <span>STATUS PERAWATAN</span>
                    <span className="text-farm-orange">{selectedChicken.footerText}</span>
                  </div>
                  
                  {/* WhatsApp Contact CTA */}
                  <a
                    href={`https://wa.me/6285101526243?text=Halo%20JAGOER ROOSTER FARM,%20saya%20tertarik%20mengenal%20lebih%20jauh%20tentang%20koleksi%20${encodeURIComponent(selectedChicken.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center px-4 py-2.5 text-xs uppercase tracking-widest font-bold bg-farm-green text-white hover:bg-farm-orange transition-all duration-300"
                  >
                    Tanya Tentang Ras Ini
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
