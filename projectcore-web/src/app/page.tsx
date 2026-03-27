"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollHero from "@/components/ScrollHero";
import SocialProof from "@/components/SocialProof";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import ForWhom from "@/components/ForWhom";
import LeadMagnet from "@/components/LeadMagnet";
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
      <ScrollHero onOpenModal={openModal} />
      <SocialProof />
      <Problem />
      <Services onOpenModal={openModal} />
      <HowItWorks onOpenModal={openModal} />
      <ForWhom />
      <LeadMagnet />
      <CTAFinal onOpenModal={openModal} />
      <Footer />
      <DiagnosticModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  );
}
