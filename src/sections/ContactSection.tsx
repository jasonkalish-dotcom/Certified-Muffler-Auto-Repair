import { Clock, Globe, MapPin, Navigation, Phone, Star } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import LiveProjectButton from '../components/LiveProjectButton';
import { business } from '../data';

const details = [
  {
    icon: MapPin,
    label: 'Address',
    value: business.address,
    sub: business.plusCode,
    href: business.mapsHref,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: business.phoneDisplay,
    sub: 'Call to book or ask a question',
    href: business.phoneHref,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: `Closes ${business.closesAt}`,
    sub: 'Call ahead to confirm today’s hours',
  },
  {
    icon: Globe,
    label: 'Website',
    value: business.websiteDisplay,
    sub: 'Our main website',
    href: business.website,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-16 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-20 md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn
          as="h2"
          y={40}
          className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Visit us
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn className="flex flex-col gap-6 rounded-[40px] border-2 border-[#D7E2EA] p-6 sm:p-8 md:rounded-[60px] md:p-10">
            <div>
              <p className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {business.category}
              </p>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.2rem, 2.4vw, 2rem)' }}
              >
                {business.name}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-[#D7E2EA]">
                <span className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#F5B400] text-[#F5B400]" />
                  ))}
                </span>
                <span className="font-medium">{business.rating}</span>
                <span className="font-light text-[#D7E2EA]/60">
                  ({business.reviewCount} Google reviews)
                </span>
              </p>
            </div>

            <ul className="flex flex-col">
              {details.map(({ icon: Icon, label, value, sub, href }) => {
                const content = (
                  <>
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-[#D7E2EA]/70" />
                    <span className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/50">
                        {label}
                      </span>
                      <span className="text-lg font-medium text-[#D7E2EA] md:text-xl">{value}</span>
                      <span className="text-sm font-light text-[#D7E2EA]/60">{sub}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label} className="border-t border-[#D7E2EA]/15 py-4 first:border-t-0">
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="flex gap-4 transition-opacity duration-200 hover:opacity-70"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-wrap gap-4">
              <ContactButton label={`Call ${business.phoneDisplay}`} />
              <a
                href={business.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:text-base"
              >
                <Navigation className="h-4 w-4" />
                Directions
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="flex min-h-[360px] flex-col overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] md:rounded-[60px]">
            <iframe
              title="Map to Certified Muffler and Auto Repair"
              src="https://maps.google.com/maps?q=Certified%20Muffler%20and%20Auto%20Repair%2C%209%20Mill%20St%2C%20Port%20Chester%2C%20NY%2010573&z=16&output=embed"
              className="min-h-[360px] w-full flex-1 grayscale invert-[0.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FadeIn>
        </div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#D7E2EA]/15 pt-8 text-sm font-light text-[#D7E2EA]/50 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {business.name}
          </span>
          <LiveProjectButton label="Book Online" href="#book" />
        </footer>
      </div>
    </section>
  );
}
