'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from './CartProvider';

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Our Story' },
  { href: '#visit', label: 'Visit' },
];

export default function Navbar() {
  const { count, total } = useCart();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-display text-2xl tracking-wider text-cream">
          ANGRY<span className="text-ember"> BIRDS</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-cream/80 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-gold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#menu"
          className="flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:scale-105"
        >
          <span>Order</span>
          <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs">
            {count > 0 ? `${count} · ₹${total}` : 'Cart'}
          </span>
        </a>
      </nav>
    </motion.header>
  );
}
