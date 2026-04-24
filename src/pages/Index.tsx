import { Hero } from "@/components/landing/Hero";
import { Products } from "@/components/landing/Products";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Brands } from "@/components/landing/Brands";
import { SocialProof } from "@/components/landing/SocialProof";
import { Differential } from "@/components/landing/Differential";
import { Logistics } from "@/components/landing/Logistics";
import { VideoSection } from "@/components/landing/VideoSection";
import { Conditions } from "@/components/landing/Conditions";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";

const Index = () => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rio Piranhas",
    description:
      "Distribuidora de fraldas, cosméticos e produtos de giro para empresas no Maranhão e Piauí. Entrega em até 48h, frete grátis e atendimento via WhatsApp.",
    areaServed: ["Maranhão", "Piauí"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1200" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Hero />
      <Products />
      <Problem />
      <HowItWorks />
      <Brands />
      <SocialProof />
      <Differential />
      <Logistics />
      <VideoSection />
      <Conditions />
      <FinalCTA />
      <Footer />
      <StickyCTA />
    </main>
  );
};

export default Index;
