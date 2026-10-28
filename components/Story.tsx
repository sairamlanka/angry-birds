'use client';

import { motion } from 'framer-motion';

const pillars = [
  { title: 'Smashed to order', body: 'Every patty hits a hot plancha for 12 seconds, then gets its crust.' },
  { title: 'Fresh every morning', body: 'Buns baked at dawn, sauces made in-house, no shortcuts.' },
  { title: 'Built for sharing', body: 'Big flavor, zero compromise, and a fries bowl big enough for the flock.' },
];

export default function Story() {
  return (
    <section id="story" className="bg-ink py-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 md:px-8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-char/60 p-8"
          >
            <p className="font-display text-5xl text-ember">0{i + 1}</p>
            <h3 className="mt-4 font-display text-2xl uppercase text-cream">{p.title}</h3>
            <p className="mt-3 text-cream/60">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
