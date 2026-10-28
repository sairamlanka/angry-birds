import { client, sanityConfigured } from './sanity/client';

export type Category = 'burgers' | 'sides' | 'drinks' | 'specials';

export type MenuItem = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category: Category;
  description?: string;
  isFeatured?: boolean;
  image?: unknown; // Sanity image object (preferred)
  photo?: string; // direct image URL, used by demo data
};

export const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'burgers', label: 'Burgers' },
  { value: 'sides', label: 'Sides' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'specials', label: 'Specials' },
];

/** Free-to-use Unsplash photos (Unsplash License). Replace with your own in Sanity. */
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

/** Shown when Sanity is not configured yet, so the site still works. */
export const DEMO_MENU: MenuItem[] = [
  { _id: 'demo-1', name: 'Red Bird Burger', slug: 'red-bird', price: 249, category: 'burgers', isFeatured: true, photo: photo('photo-1543339469-94ba2391431f'), description: 'Double smash patty, melted cheddar, crispy onion and our fiery red sauce.' },
  { _id: 'demo-2', name: 'Chuck Bomb Double', slug: 'chuck-bomb', price: 349, category: 'burgers', isFeatured: true, photo: photo('photo-1688246780164-00c01647e78c'), description: 'Two beef smashes, smoked bacon, gooey cheese and a pickle slingshot.' },
  { _id: 'demo-3', name: 'Pig Smash Stack', slug: 'pig-smash', price: 299, category: 'burgers', photo: photo('photo-1549611016-3a70d82b5040'), description: 'Smoked pork belly, caramelised onion and BBQ glaze on a toasted brioche.' },
  { _id: 'demo-4', name: 'Feather Fries', slug: 'feather-fries', price: 129, category: 'sides', photo: photo('photo-1615485290836-4ebcebf44aaf'), description: 'Hand-cut fries dusted with our secret flock seasoning.' },
  { _id: 'demo-5', name: 'Slingshot Shake', slug: 'slingshot-shake', price: 179, category: 'drinks', photo: photo('photo-1579954115545-a95591f28bfc'), description: 'Thick strawberry shake with a whipped cream top.' },
  { _id: 'demo-6', name: 'Egg Bomb Melt', slug: 'egg-bomb', price: 399, category: 'specials', photo: photo('photo-1688246780164-00c01647e78c'), description: 'Limited weekend special: fried egg, truffle mayo and aged cheddar.' },
];

const MENU_QUERY = `*[_type == "product" && isAvailable == true] | order(sortOrder asc, name asc){
  _id,
  name,
  "slug": slug.current,
  price,
  category,
  description,
  isFeatured,
  image
}`;

/** Fetches the menu from Sanity (cached 60s). Falls back to demo data on any problem. */
export async function getMenu(): Promise<MenuItem[]> {
  if (!client || !sanityConfigured) return DEMO_MENU;
  try {
    const items = await client.fetch<MenuItem[]>(MENU_QUERY, {}, { next: { revalidate: 60 } });
    return items.length ? items : DEMO_MENU;
  } catch (err) {
    console.error('Sanity fetch failed, using demo menu:', err);
    return DEMO_MENU;
  }
}
