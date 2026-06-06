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
export default function Home() {
    return (
        <>
            <Navbar />
            <main className="flex-grow pt-14">
                <HeroSection />
                <HighlightSection />
                <ChickenCatalog />
                <CareStandard />
                <Testimonial />
                <GallerySection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
