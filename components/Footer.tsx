export default function Footer() {
  return (
    <footer id="visit" className="border-t border-white/5 bg-char py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 text-cream/70 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl uppercase text-cream">Angry Birds</p>
          <p className="mt-2 text-sm">Smash burgers, big flavor.</p>
        </div>
        <div>
          <p className="mb-2 text-sm uppercase tracking-widest text-gold">Hours</p>
          <p className="text-sm">Mon–Thu · 11:00 – 23:00</p>
          <p className="text-sm">Fri–Sun · 11:00 – 00:00</p>
        </div>
        <div>
          <p className="mb-2 text-sm uppercase tracking-widest text-gold">Find us</p>
          <p className="text-sm">Update your address in the code or add it to Sanity later.</p>
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-cream/40">© {new Date().getFullYear()} Angry Birds. All rights reserved.</p>
    </footer>
  );
}
