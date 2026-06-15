import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HighlightSection from "@/components/HighlightSection";
import ChickenCatalog from "@/components/ChickenCatalog";
import CareStandard from "@/components/CareStandard";
import Testimonial from "@/components/Testimonial";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
    const catalogItems = await prisma.chickenItem.findMany({
        orderBy: { createdAt: "asc" },
    });

    return (
        <>
            <Navbar />
            <main className="flex-grow pt-14">
                <HeroSection />
                <HighlightSection />
                <ChickenCatalog initialItems={catalogItems} />
                <CareStandard />
                <Testimonial />
                <GallerySection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
