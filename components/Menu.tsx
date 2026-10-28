'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { urlFor } from '@/lib/sanity/image';
import { CATEGORIES, type MenuItem } from '@/lib/menu';
import { useCart } from './CartProvider';

export default function Menu({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]['value']>('all');
  const { add, count, total, lines } = useCart();

  const visible = useMemo(
    () => (active === 'all' ? items : items.filter((i) => i.category === active)),
    [items, active],
  );

  return (
    <section id="menu" className="relative bg-char py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gold">The menu</p>
          <h2 className="font-display text-5xl uppercase text-cream md:text-6xl">Pick your bird</h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active === c.value
                  ? 'border-gold bg-gold text-ink'
                  : 'border-white/15 text-cream/70 hover:border-gold/60 hover:text-gold'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.article
                key={item._id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col rounded-3xl border border-white/10 bg-ink/60 p-5 backdrop-blur-sm transition hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(228,87,46,0.18)]"
              >
                <div className="relative mb-5 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-ember/20 via-char to-ink">
                  {item.image ? (
                    <Image
                      src={urlFor(item.image as never).width(600).url()}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 90vw, 360px"
                      className="object-contain p-4 transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-7xl transition duration-500 group-hover:scale-110">{item.emoji ?? '🍔'}</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl uppercase leading-tight text-cream">{item.name}</h3>
                    <span className="text-lg font-semibold text-gold">₹{item.price}</span>
                  </div>
                  {item.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/60">{item.description}</p>
                  )}
                  <button
                    onClick={() => add({ id: item._id, name: item.name, price: item.price })}
                    className="mt-5 w-full rounded-full border border-gold/60 py-2.5 text-sm font-semibold uppercase tracking-wide text-gold transition hover:bg-gold hover:text-ink active:scale-95"
                  >
                    Add to order
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-cream/50">Nothing here yet. Check back soon.</p>
        )}

        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 120, opacity: 0 }}
              className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center justify-between rounded-2xl bg-gold px-5 py-4 text-ink shadow-2xl"
            >
              <div>
                <p className="text-sm font-semibold">
                  {count} item{count > 1 ? 's' : ''} · ₹{total}
                </p>
                <p className="truncate text-xs opacity-70">{lines.map((l) => `${l.qty}× ${l.name}`).join(', ')}</p>
              </div>
              <a href="#visit" className="rounded-full bg-ink px-5 py-2 text-sm font-semibold text-gold">
                Checkout
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
