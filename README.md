# Angry Birds Restaurant Website

Next.js (App Router) + Tailwind + Framer Motion + Sanity CMS. The menu is managed in Sanity Studio, so the owner can add or change products and prices without touching code.

## 1. Create the Sanity project (free)

1. Go to https://www.sanity.io and sign up.
2. Run `npx sanity@latest init` in this folder, or create a project at https://www.sanity.io/manage.
3. Note the **Project ID**.
4. In the Sanity dashboard, open **API → CORS origins** and add:
   - `http://localhost:3000` (with credentials allowed)
   - your Vercel domain, e.g. `https://angry-birds.vercel.app` (with credentials allowed)

## 2. Configure environment

```bash
cp .env.example .env.local
# then set NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
```

If the project ID is empty, the site shows the built-in demo menu so it still runs.

## 3. Run locally

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Menu editor (Sanity Studio): http://localhost:3000/studio

Log in to the studio with the same account you used for Sanity. Add menu items under **Menu Item**, and set **Available to order** and **Show in hero** as needed.

## 4. Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy. Every Sanity change appears on the site within about 60 seconds (ISR revalidation).

For instant updates, you can add a Sanity webhook that calls a revalidation route. That is a small addition if you need it.

## Project structure

```
app/                  Pages, layout, Sanity Studio route (/studio)
components/           Hero, Menu, Navbar, Story, Footer, CartProvider
lib/menu.ts           Menu fetching from Sanity with demo fallback
lib/sanity/           Sanity client and image URL builder
sanity/schemaTypes/   Menu Item schema (name, slug, price, category, image, flags)
sanity.config.ts      Studio configuration
```

## Notes

- Prices are in ₹ (INR). Change the currency symbol in `components/Menu.tsx` and `components/Hero.tsx` if needed.
- The cart is client-side only. Adding real checkout or payments (Razorpay, Stripe) is the next step.
- Respects `prefers-reduced-motion`. Layout is mobile-first and tested by breakpoint in Tailwind.
