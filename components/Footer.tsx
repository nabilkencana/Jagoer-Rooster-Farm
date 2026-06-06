"use client";
import React from "react";
export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 56,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <footer id="footer" className="bg-farm-grey border-t border-farm-green/10 pt-16 pb-8 px-4 text-farm-green">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold tracking-wider uppercase">
              JAGOER ROOSTER FARM
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-sm">
              Peternakan ayam lokal dengan fokus pada kualitas, karakter, dan perawatan unggas. Kami berkomitmen untuk melestarikan dan mengedukasi keunikan ras pilihan secara profesional.
            </p>
          </div>
          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-farm-orange">
              NAVIGASI
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleScrollTo(e, "")}
                  className="text-xs text-zinc-500 hover:text-farm-orange transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  onClick={(e) => handleScrollTo(e, "tentang")}
                  className="text-xs text-zinc-500 hover:text-farm-orange transition-colors duration-200"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="#katalog"
                  onClick={(e) => handleScrollTo(e, "katalog")}
                  className="text-xs text-zinc-500 hover:text-farm-orange transition-colors duration-200"
                >
                  Ras Pilihan
                </a>
              </li>
              <li>
                <a
                  href="#galeri"
                  onClick={(e) => handleScrollTo(e, "galeri")}
                  className="text-xs text-zinc-500 hover:text-farm-orange transition-colors duration-200"
                >
                  Galeri
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3: Legal Policy Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-farm-orange">
              LEGAL
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#footer"
                  className="text-xs text-zinc-500 hover:text-farm-orange transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#footer"
                  className="text-xs text-zinc-500 hover:text-farm-orange transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Column 4: Contact Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-farm-orange">
              KONTAK
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs text-zinc-500">
                <svg
                  className="w-4 h-4 text-farm-green/60 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Tulungagung, Jawa Timur, Indonesia</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-zinc-500">
                <svg
                  className="w-4 h-4 text-farm-green/60 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+62 851-0152-6243</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-zinc-500">
                <svg
                  className="w-4 h-4 text-farm-green/60 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>jagoerrosterfarm@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright Bar */}
        <div className="pt-8 border-t border-farm-green/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-zinc-400 font-light">
            &copy; 2026 JAGOER ROOSTER FARM. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-400 font-light flex items-center gap-1">
            <span>Dibuat dengan</span>
            <span className="text-farm-orange">❤</span>
            <span>untuk Komunitas Ayam Lokal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
