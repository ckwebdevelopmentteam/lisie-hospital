import HeroSection from "@/components/hero/HeroSection";
import LegacyStorySection from "@/components/landing/LegacyStorySection";
import CareEcosystemSection from "@/components/landing/CareEcosystemSection";
import PatientStoriesSection from "@/components/landing/PatientStoriesSection";
import PatientExperienceSection from "@/components/landing/PatientExperienceSection";
import BookingConsultationSection from "@/components/landing/BookingConsultationSection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-white">
      <HeroSection />
      <LegacyStorySection />
      <CareEcosystemSection />
      <PatientExperienceSection />
      <PatientStoriesSection />
      <BookingConsultationSection />
    </main>
  );
}
