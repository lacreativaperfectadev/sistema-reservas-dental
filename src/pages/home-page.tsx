import { HeroSection } from "../components/info/hero-section";
import { DifferentiatorsSection } from "../components/info/differentiators-section";
import { TreatmentsSection } from "../components/info/treatments-section";
import { FinalCtaSection } from "../components/info/final-cta-section";
import { ServicesOverview } from "../components/info/services-overview";
import { LocationHours } from "../components/info/location-hours";
import { BookingSection } from "../components/booking/booking-section";
import { Footer } from "../components/shared/footer";
import { useClinicInfo } from "../hooks/use-clinic-info";
import { useServices } from "../hooks/use-services";

export function HomePage() {
  const { clinicInfo } = useClinicInfo();
  const { services } = useServices();

  return (
    <main className="flex flex-col">
      <HeroSection clinicInfo={clinicInfo} />
      <TreatmentsSection clinicInfo={clinicInfo} />
      <DifferentiatorsSection clinicInfo={clinicInfo} />
      <FinalCtaSection clinicInfo={clinicInfo} />
      <section id="servicios">
        <ServicesOverview services={services} clinicInfo={clinicInfo} />
      </section>
      <section id="reservar">
        <BookingSection />
      </section>
      <LocationHours clinicInfo={clinicInfo} />
      <Footer clinicInfo={clinicInfo} />
    </main>
  );
}
