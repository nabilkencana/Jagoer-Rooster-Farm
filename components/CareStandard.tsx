import React from "react";
import Image from "next/image";
export default function CareStandard() {
  const standards = [
    {
      title: "PAKAN TERATUR",
      description: "Nutrisi sesuai dengan kebutuhan pertumbuhan dan kondisi ayam.",
      icon: (
        <svg
          className="w-5 h-5 text-farm-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Bowl/Food Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ),
    },
    {
      title: "KANDANG BERSIH",
      description: "Kandang dijaga agar tetap kering, bersih, dan memiliki sirkulasi udara baik.",
      icon: (
        <svg
          className="w-5 h-5 text-farm-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Clean House/Shield Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      title: "PEMANTAUAN KESEHATAN",
      description: "Cek kesehatan dan pemantauan aktivitas dilakukan secara rutin.",
      icon: (
        <svg
          className="w-5 h-5 text-farm-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Heart/Check/Activity Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "SELEKSI RAS",
      description: "Pemilihan berdasarkan postur, warna, karakter, dan garis keturunan.",
      icon: (
        <svg
          className="w-5 h-5 text-farm-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Ribbon/Star Icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
    },
  ];
  return (
    <section id="perawatan" className="py-20 px-4 bg-farm-grey/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Standards List */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-farm-orange block mb-2">
                MANAJEMEN KUALITAS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wider text-farm-green uppercase mb-4">
                STANDAR PERAWATAN FARM
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed max-w-xl">
                Kami menerapkan standar perawatan teratur untuk memastikan kualitas ayam tetap sehat, aktif, dan memiliki karakter terbaik.
              </p>
            </div>
            {/* List */}
            <div className="space-y-6">
              {standards.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white border border-farm-green/5 shadow-sm">
                  {/* Icon Box */}
                  <div className="flex-shrink-0 w-10 h-10 border border-farm-green/10 bg-farm-grey flex items-center justify-center">
                    {item.icon}
                  </div>
                  {/* Info */}
                  <div>
                    <h4 className="font-display text-sm font-bold tracking-wider text-farm-green uppercase mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Column: Image */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame */}
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto border border-farm-green/15 p-3 bg-white shadow-sm hover:scale-[1.02] transition-transform duration-300">
              <div className="relative w-full h-full bg-farm-grey">
                <Image
                  src="/images/ayam-hitam-karakter.jpg"
                  alt="Ayam Standar Perawatan"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Decorative rustic badge overlay */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-farm-green/10 bg-[#FDFBF7] p-2 hidden sm:block">
              <div className="w-full h-full border border-dashed border-farm-green/20 flex flex-col items-center justify-center text-center p-1">
                <span className="text-[8px] uppercase tracking-widest text-farm-green/60 font-semibold block">
                  FARM
                </span>
                <span className="text-[10px] font-bold text-farm-orange">
                  100%
                </span>
                <span className="text-[8px] uppercase tracking-widest text-farm-green/60 font-semibold block">
                  ALAMI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
