import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ products, title = "NEW DROPS", subtitle = "Fresh Frienemies pieces, ready to wear." }) {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl tracking-[0.2em] font-light text-neutral-900 mb-3"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-sm text-neutral-500"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {(products ?? []).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {(!products || products.length === 0) && (
        <div className="text-center text-sm text-neutral-500 mt-8">No products found.</div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <Link to={createPageUrl('Shop')}>
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 text-sm tracking-[0.15em] text-primary hover:text-orange-700 transition-colors group"
          >
            VIEW ALL PRODUCTS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
