"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Services from "@/components/Services";
import VideoDemo from "@/components/VideoDemo";
import HowItWorks from "@/components/HowItWorks";
import Metrics from "@/components/Metrics";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import DiagnosticModal from "@/components/DiagnosticModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <main style={{ backgroundColor: "#0A0F1C" }}>
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <SocialProof />
      <Services onOpenModal={openModal} />
      <VideoDemo />
      <HowItWorks onOpenModal={openModal} />
      <Metrics />
      <Pricing onOpenModal={openModal} />
      <FAQ />
      <CTAFinal onOpenModal={openModal} />
      <Footer />
      <DiagnosticModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  );
}
