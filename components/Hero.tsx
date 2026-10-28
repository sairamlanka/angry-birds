'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMemo, type MouseEvent } from 'react';
import { urlFor } from '@/lib/sanity/image';
import type { MenuItem } from '@/lib/menu';

type Props = { featured?: MenuItem };

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3) % 100}%`,
  delay: `${(i * 0.37) % 4}s`,
  size: 3 + (i % 4) * 2,
}));

export default function Hero({ featured }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 14 });

  const imageSrc = useMemo(() => {
    if (featured?.image) return urlFor(featured.image as never).width(900).url();
    return featured?.photo ?? null;
  }, [featured]);
  const isCutout = Boolean(featured?.image);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-20"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* Rising embers */}
      <div className="pointer-events-none absolute inset-0">
        {EMBERS.map((e) => (
          <span
            key={e.id}
            className="absolute bottom-0 animate-rise rounded-full bg-flame"
            style={{ left: e.left, width: e.size, height: e.size, animationDelay: e.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center md:text-left"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">Smash burgers · Since day one</p>
          <h1 className="font-display text-[clamp(3.5rem,11vw,8rem)] uppercase leading-[0.9] text-cream">
            Smash &amp; <br />
            <span className="text-ember">Fly Away</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-cream/70 md:mx-0 md:text-lg">
            Big flavor. Zero compromise. Crispy edges, melted cheese and sauce that hits like a slingshot.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="#menu"
              className="rounded-full bg-gold px-7 py-3 font-semibold uppercase tracking-wide text-ink transition hover:scale-105 hover:shadow-[0_0_40px_rgba(242,179,90,0.45)]"
            >
              Order now
            </a>
            <a href="#story" className="text-sm text-cream/70 underline-offset-4 hover:text-gold hover:underline">
              See our story →
            </a>
          </div>
        </motion.div>

        <motion.div
          style={{ perspective: 900 }}
          className="relative mx-auto aspect-square w-[min(85vw,460px)]"
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="h-full w-full">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="h-full w-full animate-drift"
            >
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={featured?.name ?? 'Featured burger'}
                  fill
                  priority
                  sizes="(max-width: 768px) 85vw, 460px"
                  className={
                    isCutout
                      ? 'object-contain drop-shadow-[0_30px_60px_rgba(228,87,46,0.35)]'
                      : 'rounded-[2rem] border border-white/10 object-cover shadow-[0_30px_60px_rgba(228,87,46,0.35)]'
                  }
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[10rem] drop-shadow-[0_30px_60px_rgba(228,87,46,0.35)]">
                  🍔
                </div>
              )}
            </motion.div>
          </motion.div>

          {featured && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-4 right-0 rounded-2xl border border-white/10 bg-char/80 p-4 backdrop-blur-md md:-right-6"
            >
              <p className="font-display text-xl uppercase text-cream">{featured.name}</p>
              <p className="text-sm text-gold">₹{featured.price}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
