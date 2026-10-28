import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Story from '@/components/Story';
import Footer from '@/components/Footer';
import { getMenu } from '@/lib/menu';

// Re-render at most once a minute so Sanity edits appear quickly.
export const revalidate = 60;

export default async function HomePage() {
  const items = await getMenu();
  const featured = items.find((i) => i.isFeatured) ?? items[0];

  return (
    <>
      <Navbar />
      <main>
        <Hero featured={featured} />
        <Menu items={items} />
        <Story />
      </main>
      <Footer />
    </>
  );
}
