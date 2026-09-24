import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { business, photos, type Photo } from '../data';

interface Project {
  category: string;
  name: string;
  col1: [Photo, Photo];
  col2: Photo;
}

const projects: Project[] = [
  {
    category: 'Sports Car',
    name: 'GR Supra Exhaust',
    col1: [photos.supraOnLift, photos.catHeatShield],
    col2: photos.exhaustUnderside,
  },
  {
    category: 'SUV',
    name: 'Durango Quad Tips',
    col1: [photos.exhaustUnderside, photos.mufflerWall],
    col2: photos.durangoQuadTips,
  },
  {
    category: 'In the Shop',
    name: 'Custom Fabrication',
    col1: [photos.durangoQuadTips, photos.catHeatShield],
    col2: photos.mufflerWall,
  },
];

const imageRadius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      <motion.article
        className="relative w-full max-w-6xl origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: `${index * 28}px` }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 px-2 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.2rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton label="Book Online" href={business.website} external />
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            <img
              src={project.col1[0].src}
              alt={project.col1[0].alt}
              loading="lazy"
              className={`w-full object-cover ${imageRadius}`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.col1[1].src}
              alt={project.col1[1].alt}
              loading="lazy"
              className={`w-full object-cover ${imageRadius}`}
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <div className="relative w-[60%]">
            <img
              src={project.col2.src}
              alt={project.col2.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover ${imageRadius}`}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-28 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-40 md:pt-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </FadeIn>

      <div ref={containerRef}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
