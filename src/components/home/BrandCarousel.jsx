import { motion } from "framer-motion";

const brands = [
  { name: "Chains", abbrev: "C", subtitle: "STATEMENT CHAINS" },
  { name: "Rings", abbrev: "R", subtitle: "STACKED RINGS" },
  { name: "Bracelets", abbrev: "B", subtitle: "ICED BRACELETS" },
  { name: "Pendants", abbrev: "P", subtitle: "SIGNATURE PENDANTS" },
  { name: "Daily Wear", abbrev: "D", subtitle: "EVERYDAY SHINE" },
  { name: "Gift Picks", abbrev: "G", subtitle: "GIFT READY" },
];

export default function BrandCarousel() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-6 md:px-12 min-w-max md:justify-center">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="w-[180px] h-[180px] md:w-[210px] md:h-[210px] rounded-full border border-primary/15 bg-gradient-to-br from-white to-orange-50 flex flex-col items-center justify-center text-center hover:border-primary transition-colors cursor-default shadow-[0_14px_35px_rgba(255,107,53,0.08)]"
            >
              <div className="text-3xl md:text-4xl font-semibold text-primary leading-none">
                {brand.abbrev}
              </div>

              <div className="mt-4 text-[11px] md:text-xs tracking-[0.18em] text-neutral-600 uppercase px-5">
                {brand.subtitle}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
