import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';
import { business, photos, type Photo } from '../data';

const aboutText = `Certified Muffler and Auto Repair has been Port Chester's go-to shop for quiet rides and strong engines. From a rattling muffler to a full custom exhaust, our team treats every car like our own, with honest diagnostics, straight answers, and work done right the first time. That's why ${business.reviewCount} drivers rate us ${business.rating} stars. Pull in and let's get you back on the road!`;

const corners: {
  photo: Photo;
  className: string;
  rotate: string;
  delay: number;
  x: number;
}[] = [
  {
    photo: photos.mufflerWall,
    className:
      'top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    rotate: '-rotate-6',
    delay: 0.1,
    x: -80,
  },
  {
    photo: photos.catHeatShield,
    className:
      'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    rotate: 'rotate-6',
    delay: 0.25,
    x: -80,
  },
  {
    photo: photos.exhaustUnderside,
    className:
      'top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    rotate: 'rotate-6',
    delay: 0.15,
    x: 80,
  },
  {
    photo: photos.durangoQuadTips,
    className:
      'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    rotate: '-rotate-6',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      {corners.map(({ photo, className, rotate, delay, x }) => (
        <FadeIn
          key={photo.src}
          delay={delay}
          x={x}
          y={0}
          duration={0.9}
          className={`pointer-events-none absolute ${className}`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className={`aspect-square w-full rounded-[28px] border-2 border-[#D7E2EA]/30 object-cover opacity-60 shadow-2xl shadow-black md:rounded-[36px] ${rotate}`}
          />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About us
          </FadeIn>
          <AnimatedText
            text={aboutText}
            className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>
        <ContactButton />
      </div>
    </section>
  );
}
