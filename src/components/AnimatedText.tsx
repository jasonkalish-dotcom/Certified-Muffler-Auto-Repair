import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Fully lit by the time the paragraph's last line is ~60% down the screen.
    offset: ['start 0.95', 'end 0.6'],
  });

  const words = text.split(' ');
  const total = text.length;
  let index = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, w) => {
        const chars = word.split('').map((char) => {
          const start = index / total;
          const end = start + 1 / total;
          index += 1;
          return { char, range: [start, end] as [number, number] };
        });
        index += 1; // account for the space
        return (
          // Words stay together so lines only break between words.
          <span key={w} className="inline-block whitespace-nowrap">
            {chars.map(({ char, range }, c) => (
              <Char key={c} char={char} progress={scrollYProgress} range={range} />
            ))}
            {w < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}
