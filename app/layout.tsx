import type { Metadata } from "next";
import { Oswald, Outfit } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
    variable: "--font-oswald",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "JAGOER ROOSTER FARM | Peternakan Ayam Lokal Premium",
    description: "Peternakan ayam lokal dengan koleksi ras pilihan, perawatan sehat, dan edukasi farm modern.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="id"
            className={`${oswald.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
        >

            <body className="min-h-full flex flex-col font-sans bg-[#FDFBF7] text-zinc-900 selection:bg-[#ECA83D]/30">
                {children}
            </body>
        </html>
    );
}
