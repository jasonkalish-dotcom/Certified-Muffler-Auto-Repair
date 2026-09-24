import FadeIn from '../components/FadeIn';

const services = [
  {
    name: 'Mufflers & Exhaust',
    description:
      'Repair and replacement of mufflers, pipes, hangers, and gaskets. We track down leaks, rattles, and drones so your car runs quiet again.',
  },
  {
    name: 'Custom & Performance Exhaust',
    description:
      'Cat-back systems, dual exhaust conversions, and polished tips, bent and welded in-house to fit your car and the sound you want.',
  },
  {
    name: 'Catalytic Converters',
    description:
      'Diagnosis and replacement of failed or stolen converters, with heat shields and O2 sensors checked so you pass emissions.',
  },
  {
    name: 'Diagnostics',
    description:
      'Check-engine lights, strange noises, and drivability problems found fast, with a straight explanation before any work starts.',
  },
  {
    name: 'General Auto Repair',
    description:
      'Brakes, suspension, and everyday maintenance handled by the same team that already knows your car from the bottom up.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </FadeIn>

      <ul className="mx-auto max-w-5xl">
        {services.map((service, i) => (
          <FadeIn
            as="li"
            key={service.name}
            delay={i * 0.1}
            className="flex items-center gap-6 py-8 text-[#0C0C0C] sm:gap-10 sm:py-10 md:gap-14 md:py-12"
            style={{
              borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : undefined,
              borderBottom: '1px solid rgba(12, 12, 12, 0.15)',
            }}
          >
            <span
              className="w-[1.3em] shrink-0 font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2 md:gap-3">
              <h3
                className="font-medium uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
