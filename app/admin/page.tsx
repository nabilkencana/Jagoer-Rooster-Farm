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
  origin: string;
  weightRange: string;
  age: string;
  characterDetail: string;
}

const emptyForm = {
  id: "",
  name: "",
  tag: "PAMA",
  description: "",
  footerText: "Kondisi sehat",
  image: "",
  origin: "",
  weightRange: "",
  age: "",
  characterDetail: "",
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [items, setItems] = useState<ChickenItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ChickenItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  // Check auth on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth");
        if (res.ok) {
          setIsAuthenticated(true);
          loadItems();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoadingItems(false);
      }
    }
    checkAuth();
  }, []);

  async function loadItems() {
    setLoadingItems(true);
    try {
      const res = await fetch("/api/catalog");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        setErrorMessage("Gagal memuat katalog ayam.");
      }
    } catch (err) {
      setErrorMessage("Koneksi gagal saat memuat katalog.");
    } finally {
      setLoadingItems(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;

    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadItems();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Password salah");
      }
    } catch (err) {
      setLoginError("Terjadi kesalahan jaringan.");
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth", { method: "DELETE" });
      if (res.ok) {
        setIsAuthenticated(false);
        setItems([]);
      }
    } catch (err) {
      setErrorMessage("Gagal logout.");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.url }));
        setSuccessMessage("Gambar berhasil diunggah.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(data.error || "Gagal mengunggah gambar");
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan jaringan saat mengunggah.");
    } finally {
      setUploading(false);
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    setForm(emptyForm);
    setErrorMessage("");
    setShowModal(true);
  }

  function openEditModal(item: ChickenItem) {
    setEditingItem(item);
    setForm({
      id: item.id,
      name: item.name,
      tag: item.tag,
      description: item.description,
      footerText: item.footerText,
      image: item.image,
      origin: item.origin,
      weightRange: item.weightRange,
      age: item.age,
      characterDetail: item.characterDetail,
    });
    setErrorMessage("");
    setShowModal(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading(true);
    setErrorMessage("");

    const isEdit = !!editingItem;
    const url = isEdit ? `/api/catalog/${editingItem.id}` : "/api/catalog";
    const method = isEdit ? "PUT" : "POST";

    // Client-side auto-generate ID (slug) if empty and creating
    let finalForm = { ...form };
    if (!isEdit && !finalForm.id) {
      finalForm.id = finalForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalForm),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(isEdit ? "Katalog berhasil diperbarui!" : "Ayam baru berhasil ditambahkan!");
        setShowModal(false);
        loadItems();
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        setErrorMessage(data.error || "Gagal menyimpan data.");
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${name} dari katalog?`)) return;

    setActionLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch(`/api/catalog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSuccessMessage("Ayam berhasil dihapus.");
        loadItems();
        setTimeout(() => setSuccessMessage(""), 4000);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Gagal menghapus data.");
      }
    } catch (err) {
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setActionLoading(false);
    }
  }

  // Loading Splash
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-farm-green border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest text-farm-green font-bold">Memuat Otentikasi...</p>
        </div>
      </div>
    );
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 font-sans selection:bg-[#ECA83D]/30">
        <div className="w-full max-w-md bg-white border border-farm-green/10 p-8 shadow-md">
          {/* Logo Brand */}
          <div className="text-center mb-8 flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-farm-orange bg-farm-orange/10 px-3 py-1">
              PANEL KENDALI
            </span>
            <h1 className="font-display text-2xl font-bold tracking-wider text-farm-green uppercase">
              JAGOER ROOSTER FARM
            </h1>
            <p className="text-xs text-zinc-500 font-light">
              Masukkan password untuk mengelola katalog ayam
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-farm-green/80 mb-2">
                PASSWORD ADMIN
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-farm-grey border border-farm-green/10 text-sm focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                required
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-semibold">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-farm-green hover:bg-farm-orange text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Memproses...
                </>
              ) : (
                "MASUK"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#ECA83D]/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#142B1F] text-[#FDFBF7] border-b border-white/5 py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-farm-orange border border-farm-orange/30 px-2 py-0.5">
            ADMIN
          </span>
          <h1 className="font-display text-lg sm:text-xl font-bold tracking-wider uppercase">
            JAGOER ROOSTER FARM
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-[10px] uppercase font-bold tracking-widest text-[#FDFBF7]/80 hover:text-farm-orange transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            LIHAT SITUS ↗
          </a>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-white/20 text-[9px] uppercase tracking-widest font-bold hover:bg-red-700 hover:border-red-700 transition-all cursor-pointer"
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        {/* Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium uppercase tracking-wide">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-medium uppercase tracking-wide">
            {errorMessage}
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-farm-green tracking-wide">
              KELOLA KATALOG AYAM
            </h2>
            <p className="text-xs text-zinc-500 font-light mt-1">
              Tambahkan, ubah, atau hapus koleksi ayam ras pilihan di peternakan Anda.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-5 py-3 bg-farm-green hover:bg-farm-orange text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            TAMBAH AYAM BARU
          </button>
        </div>

        {/* Catalog Table list */}
        {loadingItems ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-farm-green border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-zinc-400 uppercase tracking-widest">Memuat data...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-farm-green/10 bg-white p-8">
            <p className="text-sm text-zinc-400 font-light">Belum ada koleksi ayam di katalog Anda.</p>
            <button
              onClick={openCreateModal}
              className="mt-4 text-xs font-bold text-farm-green uppercase tracking-widest border-b border-farm-green/20 hover:border-farm-orange hover:text-farm-orange pb-0.5"
            >
              Buat Item Pertama Anda
            </button>
          </div>
        ) : (
          <div className="bg-white border border-farm-green/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-farm-grey border-b border-farm-green/10 text-[10px] uppercase font-bold tracking-wider text-farm-green/70">
                    <th className="py-4 px-6">Gambar</th>
                    <th className="py-4 px-6">Nama & Ras</th>
                    <th className="py-4 px-6">Bobot & Usia</th>
                    <th className="py-4 px-6">Asal</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-farm-grey text-xs text-zinc-700">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-farm-grey/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="relative w-16 h-12 bg-farm-grey border border-farm-green/5 overflow-hidden">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-zinc-400">
                              No image
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-farm-green uppercase tracking-wide">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[8px] font-bold px-1.5 py-0.5 border border-farm-green/10 text-farm-green/70 bg-farm-grey uppercase">
                            {item.tag}
                          </span>
                          <span className="text-[9px] text-zinc-400 font-light italic">
                            ID: {item.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-light">
                        <div>{item.weightRange}</div>
                        <div className="text-[10px] text-zinc-400">{item.age}</div>
                      </td>
                      <td className="py-4 px-6 font-light">{item.origin}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => openEditModal(item)}
                            className="px-3 py-1.5 border border-farm-green/10 text-[9px] font-bold text-farm-green uppercase tracking-widest hover:bg-farm-green hover:text-white transition-all cursor-pointer"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            disabled={actionLoading}
                            className="px-3 py-1.5 border border-red-100 text-[9px] font-bold text-red-600 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
                          >
                            HAPUS
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-farm-grey/25 py-3 px-6 text-[10px] text-zinc-400 uppercase font-medium tracking-wider border-t border-farm-green/5">
              Total Katalog: {items.length} Ras Ayam
            </div>
          </div>
        )}
      </main>

      {/* Modal Dialog Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-dark/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-farm-green/15 w-full max-w-2xl shadow-2xl my-8 animate-zoom-in">
            {/* Modal Header */}
            <div className="bg-farm-green text-white py-4 px-6 flex justify-between items-center">
              <h3 className="font-display text-sm sm:text-base font-bold tracking-wider uppercase">
                {editingItem ? `EDIT KATALOG: ${editingItem.name}` : "TAMBAH AYAM BARU"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-6 h-6 flex items-center justify-center hover:text-farm-orange transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ID Field (Only editable on create) */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    ID / SLUG {!editingItem && "(Auto-Generated jika dikosongkan)"}
                  </label>
                  <input
                    type="text"
                    value={form.id}
                    onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                    placeholder="Contoh: pama-coklat"
                    disabled={!!editingItem}
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    NAMA AYAM
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Contoh: PAMA COKLAT"
                    required
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                  />
                </div>

                {/* Tag Field */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    RAS / KATEGORI
                  </label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                    placeholder="Contoh: PAMA / MANGON / SILANGAN"
                    required
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                  />
                </div>

                {/* Footer text field */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    STATUS / LABEL FOOTER
                  </label>
                  <input
                    type="text"
                    value={form.footerText}
                    onChange={(e) => setForm((p) => ({ ...p, footerText: e.target.value }))}
                    placeholder="Contoh: Kondisi sehat / Perawatan intensif"
                    required
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                  />
                </div>

                {/* Origin Field */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    ASAL NEGARA / KOTA
                  </label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => setForm((p) => ({ ...p, origin: e.target.value }))}
                    placeholder="Contoh: Thailand (Pama)"
                    required
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                  />
                </div>

                {/* Weight Range */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    RENTANG BOBOT
                  </label>
                  <input
                    type="text"
                    value={form.weightRange}
                    onChange={(e) => setForm((p) => ({ ...p, weightRange: e.target.value }))}
                    placeholder="Contoh: 2.5 - 2.8 kg"
                    required
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                  />
                </div>

                {/* Age Field */}
                <div>
                  <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                    USIA AYAM
                  </label>
                  <input
                    type="text"
                    value={form.age}
                    onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                    placeholder="Contoh: 8 Bulan"
                    required
                    className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                  />
                </div>
              </div>

              {/* Image Input Container */}
              <div className="border-t border-farm-grey pt-4">
                <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-2">
                  FOTO KATALOG AYAM
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="relative w-36 h-28 bg-farm-grey border border-farm-green/10 overflow-hidden flex items-center justify-center">
                    {form.image ? (
                      <Image
                        src={form.image}
                        alt="Preview upload"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-zinc-400">Belum ada foto</span>
                    )}
                  </div>

                  <div className="flex-1 w-full flex flex-col gap-2">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
                      placeholder="Atau masukkan path / URL gambar manual"
                      required
                      className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                    />
                    
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-file-input"
                        disabled={uploading}
                      />
                      <label
                        htmlFor="image-file-input"
                        className="inline-block px-4 py-2 border border-farm-green text-farm-green hover:bg-farm-green hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
                      >
                        {uploading ? "MENGUNGGAH..." : "UNGGAH DARI COMPUTER"}
                      </label>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-light">
                      Format didukung: JPG, PNG, WEBP. Maksimal ukuran file 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="border-t border-farm-grey pt-4">
                <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                  DESKRIPSI SINGKAT
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Contoh: Karakter aktif dengan postur tubuh yang ramping dan cepat."
                  required
                  className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green transition-all"
                />
              </div>

              {/* Character Detail Field */}
              <div>
                <label className="block text-[9px] uppercase tracking-widest font-bold text-farm-green/80 mb-1">
                  DETAIL KARAKTER LENGKAP (TAMPIL DI POPUP MODAL)
                </label>
                <textarea
                  value={form.characterDetail}
                  onChange={(e) => setForm((p) => ({ ...p, characterDetail: e.target.value }))}
                  placeholder="Jelaskan detail fisik, gaya tarung, atau kelebihan keturunan ini..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 bg-farm-grey border border-farm-green/10 text-xs focus:outline-none focus:border-farm-orange text-farm-green resize-y transition-all"
                />
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-farm-grey pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 border border-farm-green/10 text-farm-green/70 hover:bg-farm-grey text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || uploading}
                  className="px-5 py-2.5 bg-farm-green hover:bg-farm-orange text-white text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-sm disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {actionLoading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      MENYIMPAN...
                    </>
                  ) : (
                    "SIMPAN DATA"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
