import { motion } from 'framer-motion';

const brands = [
  { name: 'T-Shirts', abbrev: 'TEES', subtitle: 'ESSENTIAL FITS' },
  { name: 'Hoodies', abbrev: 'HD', subtitle: 'HEAVYWEIGHT' },
  { name: 'Jackets', abbrev: 'JKT', subtitle: 'OUTER LAYER' },
  { name: 'Pants', abbrev: 'PNT', subtitle: 'CLEAN CUTS' },
  { name: 'Caps', abbrev: 'CAP', subtitle: 'ACCESSORIES' },
  { name: 'Drop', abbrev: 'NEW', subtitle: 'LATEST PIECES' },
];

export default function BrandCarousel() {
  return (
    <section className="py-16 bg-orange-50">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-6 md:px-12 min-w-max md:justify-center">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-full border border-orange-200 bg-white flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 transition-all duration-300 shadow-sm"
            >
              <span className="text-lg md:text-xl font-semibold tracking-wide text-orange-500">
                {brand.abbrev}
              </span>
              {brand.subtitle && (
                <span className="text-[8px] tracking-widest text-neutral-500 mt-1 text-center px-2">
                  {brand.subtitle}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
