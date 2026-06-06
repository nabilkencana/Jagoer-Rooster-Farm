"use client";
import React, { useState, useEffect } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Tentang Farm", href: "#tentang" },
    { name: "Ras Pilihan", href: "#highlight" },
    { name: "Jenis Ayam", href: "#katalog" },
    { name: "Perawatan", href: "#perawatan" },
    { name: "Galeri", href: "#galeri" },
  ];
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 56, // offset for fixed navbar
        behavior: "smooth",
      });
    }
  };
  return (
    <nav
      className={`fixed top-0 left-0 w-full h-14 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-farm-cream/90 backdrop-blur-md border-farm-green/10 shadow-sm"
          : "bg-farm-cream border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display text-xl font-bold tracking-wider text-farm-green select-none"
          >
            JAGOER ROOSTER FARM
          </a>
        </div>
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs uppercase font-medium tracking-widest text-farm-green/70 hover:text-farm-green transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#footer"
            onClick={(e) => handleScrollTo(e, "#footer")}
            className="inline-flex items-center justify-center px-4 py-1.5 border border-transparent text-xs uppercase tracking-widest font-semibold text-white bg-farm-green hover:bg-farm-orange transition-all duration-300 hover:scale-105"
          >
            KUNJUNGI FARM
          </a>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 text-farm-green hover:text-farm-orange transition-colors duration-200 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-14 left-0 w-full bg-farm-cream border-b border-farm-green/10 shadow-lg transition-all duration-300 transform ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block text-sm uppercase font-semibold tracking-wider text-farm-green/80 hover:text-farm-green py-1 border-b border-farm-green/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#footer"
              onClick={(e) => handleScrollTo(e, "#footer")}
              className="block w-full text-center px-4 py-2.5 text-xs uppercase tracking-widest font-bold text-white bg-farm-green hover:bg-farm-orange transition-all duration-300"
            >
              KUNJUNGI FARM
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
