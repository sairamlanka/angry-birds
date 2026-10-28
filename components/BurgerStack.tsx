'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = { layers: string[]; alt: string };

// Fixed values (not Math.random) so server and client render the same markup.
const DUST = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  angle: (i / 18) * Math.PI * 2,
  dist: 120 + ((i * 37) % 90),
  size: 3 + (i % 4) * 2,
}));

export default function BurgerStack({ layers, alt }: Props) {
  const [split, setSplit] = useState(false);
  const [burst, setBurst] = useState(0);

  // Loop: assembled (hold) -> split apart (burst of dust) -> reassemble.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let open = false;
    const tick = () => {
      open = !open;
      setSplit(open);
      if (open) setBurst((b) => b + 1);
      timer = setTimeout(tick, open ? 2000 : 2800);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, []);

  const n = layers.length;

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative h-full w-full"
      role="img"
      aria-label={alt}
    >
      <AnimatePresence>
        {split && (
          <div key={burst} className="pointer-events-none absolute inset-0">
            {DUST.map((d) => (
              <motion.span
                key={d.id}
                className="absolute left-1/2 top-1/2 rounded-full bg-gold/70"
                style={{ width: d.size, height: d.size }}
                initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
                animate={{
                  x: Math.cos(d.angle) * d.dist,
                  y: Math.sin(d.angle) * d.dist - 40,
                  opacity: 0,
                  scale: 0.3,
                }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {layers.map((src, i) => {
        // Bottom layers drop down, top layers lift up, middle ones spread slightly.
        const offset = (i - (n - 1) / 2) * 52;
        const tilt = i % 2 === 0 ? -4 : 4;
        return (
          <motion.div
            key={src}
            className="absolute inset-0"
            style={{ zIndex: i }}
            animate={
              split
                ? { y: offset, rotate: tilt, opacity: 1 }
                : { y: 0, rotate: 0, opacity: 1 }
            }
            transition={{ type: 'spring', stiffness: 150, damping: 17, delay: split ? i * 0.04 : (n - i) * 0.03 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 85vw, 460px"
              className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
