import { Star } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import { business, photos } from '../data';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book', href: '#book' },
  { label: 'Contact', href: '#contact' },
];

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="nav" delay={0} y={-20} className="px-6 pt-6 md:px-10 md:pt-8">
        <ul className="flex justify-between">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 min-[380px]:text-sm md:text-lg lg:text-[1.4rem]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[18.5vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[19vw] md:-mt-5 md:text-[19.5vw] lg:text-[20vw]"
        >
          Certified
        </FadeIn>
      </div>

      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="relative z-20">
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Port Chester&apos;s muffler, exhaust &amp; auto repair shop
          </p>
          <a
            href={business.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[#D7E2EA]/80 transition-opacity duration-200 hover:opacity-70"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 1.1rem)' }}
          >
            <Star className="h-[1em] w-[1em] fill-[#F5B400] text-[#F5B400]" />
            <span className="font-medium">{business.rating}</span>
            <span className="font-light">({business.reviewCount} Google reviews)</span>
          </a>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="relative z-20">
          <ContactButton />
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-[220px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[300px] sm:translate-y-0 md:w-[340px] lg:w-[400px]">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full"
            innerClassName="w-full"
          >
            <div className="relative overflow-hidden rounded-[40px] border-2 border-[#D7E2EA]/40 sm:rounded-b-none sm:rounded-t-[60px] sm:border-b-0">
              <img
                src={photos.weldingExhaust.src}
                alt={photos.weldingExhaust.alt}
                className="block aspect-[3/4] max-h-[62vh] w-full object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0C0C]/80 to-transparent" />
            </div>
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
