import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import FadeIn from '../components/FadeIn';
import { gallery } from '../data';

export default function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  return (
    <section
      id="gallery"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-28 md:pt-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-10 text-center font-black uppercase leading-none tracking-tight sm:mb-14 md:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Gallery
      </FadeIn>

      <div className="mx-auto max-w-6xl columns-2 gap-3 sm:gap-4 md:columns-3">
        {gallery.map((photo, i) => (
          <FadeIn key={photo.src} delay={(i % 3) * 0.1} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-[28px] border-2 border-[#D7E2EA]/20 sm:rounded-[40px]"
              aria-label={`Open photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="block w-full transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </FadeIn>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0C0C0C]/95 p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={gallery[open].src}
              src={gallery[open].src}
              alt={gallery[open].alt}
              className="h-full w-full object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            {[
              { label: 'Close', icon: X, onClick: close, className: 'right-4 top-4 sm:right-8 sm:top-8' },
              { label: 'Previous photo', icon: ChevronLeft, onClick: () => step(-1), className: 'left-2 top-1/2 -translate-y-1/2 sm:left-6' },
              { label: 'Next photo', icon: ChevronRight, onClick: () => step(1), className: 'right-2 top-1/2 -translate-y-1/2 sm:right-6' },
            ].map(({ label, icon: Icon, onClick, className }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className={`absolute rounded-full border-2 border-[#D7E2EA] p-2 text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:p-3 ${className}`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
