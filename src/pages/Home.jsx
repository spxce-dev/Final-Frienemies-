import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { getProducts } from "@/api/wooClient";

export default function Home() {
  const { data: displayProducts = [], isLoading, error } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const products = await getProducts({ perPage: 8, page: 1 });
      return products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image_url: p.image,
        permalink: p.link,
      }));
    },
  });

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BrandCarousel />

      {isLoading ? <div className="text-center text-sm text-neutral-500 py-6">Loading products…</div> : null}
      {error ? <div className="text-center text-sm text-red-600 py-6">Failed to load products: {String(error?.message || error)}</div> : null}

      <FeaturedProducts
        products={displayProducts}
        title="NEW DROPS"
        subtitle="Fresh Frienemies pieces, ready to wear."
      />

      <section className="py-20 md:py-28 px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-primary/10 shadow-[0_20px_60px_rgba(255,107,53,0.08)] bg-white">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.28em] text-primary mb-4">Frienemies Edit</p>
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.08em] text-neutral-900 mb-4">Wear the edge.</h2>
              <p className="text-neutral-600 leading-relaxed">
                From subtle shine to full statement pieces, Frienemies is built for styling that feels sharp, easy, and unapologetically bold.
              </p>
            </div>
            <div className="min-h-[340px] md:min-h-full">
              <img src="/hero-banner.jpg" alt="Frienemies jewelry editorial" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
