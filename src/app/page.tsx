import HeroSection from "@/components/landing/HeroSection";
import LegacyStorySection from "@/components/landing/LegacyStorySection";
import CareEcosystemSection from "@/components/landing/CareEcosystemSection";
import PatientStoriesSection from "@/components/landing/PatientStoriesSection";
import BookingConsultationSection from "@/components/landing/BookingConsultationSection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />
      <LegacyStorySection />
      <CareEcosystemSection />
      <PatientStoriesSection />
      <BookingConsultationSection />
    </main>
  );
}
