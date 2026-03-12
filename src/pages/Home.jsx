import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import FeaturedProducts from "@/components/home/FeaturedProducts";

import { getProducts } from "@/api/wooClient";

export default function Home() {
  const {
    data: displayProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const products = await getProducts({ perPage: 8, page: 1 });

      // Proxy returns simplified products already.
      // Normalize to a shape ProductCard can use safely.
      return products.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image_url: p.image,     // so ProductCard works without changes
  permalink: p.link,
}));
    },
  });

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BrandCarousel />

      {isLoading ? (
        <div className="text-center text-sm text-neutral-500 py-6">
          Loading products…
        </div>
      ) : null}

      {error ? (
        <div className="text-center text-sm text-red-600 py-6">
          Failed to load products: {String(error?.message || error)}
        </div>
      ) : null}

      <FeaturedProducts
        products={displayProducts}
        title="NEW DROP"
        subtitle="Fresh Frienemies pieces built for clean everyday impact"
      />

      <section className="py-20 md:py-32 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto flex justify-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69960d5955e8e646c7dfd706/401adc7f7_IMG_7184.png"
            alt="Frienemies campaign"
            className="w-full max-w-2xl h-auto"
          />
        </div>
      </section>
    </main>
  );
}