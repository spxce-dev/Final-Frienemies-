import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] md:min-h-screen w-full overflow-hidden flex items-end">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
        style={{ backgroundImage: 'url("/hero-banner.jpg")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />

      <div className="relative z-10 w-full px-6 md:px-12 pb-14 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs md:text-sm uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
            Frienemies Jewelry
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] text-white leading-[0.95] mb-5">
            Built to shine.
          </h1>
          <p className="max-w-xl text-sm md:text-lg text-white/80 leading-relaxed mb-8">
            Bold pieces. Clean presence. Everyday luxury for the ones who like their jewelry loud and their style effortless.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={createPageUrl('Shop')} className="frienemies-button">
              Shop Now
            </Link>
            <Link to={createPageUrl('About')} className="frienemies-outline-button bg-white/90 backdrop-blur-sm">
              Our Story
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
