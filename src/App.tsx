import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import GallerySection from './sections/GallerySection';
import BookingSection from './sections/BookingSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  return (
    <main className="bg-[#0C0C0C] font-kanit" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <BookingSection />
      <ContactSection />
    </main>
  );
}
