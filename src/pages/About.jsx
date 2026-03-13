import { motion } from 'framer-motion';
import Newsletter from '@/components/home/Newsletter';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/hero-banner.jpg)' }} />
        <div className="absolute inset-0 bg-black/55" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-5xl tracking-[0.3em] font-light mb-4">OUR STORY</h1>
          <p className="text-sm tracking-[0.2em] text-white/80">BOLD JEWELRY. CLEAN PRESENCE.</p>
        </motion.div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl tracking-[0.15em] font-light mb-6">FRIENDS. RIVALS. ICONS.</h2>
            <p className="text-neutral-600 leading-relaxed">
              Frienemies is built for people who want their jewelry to do more than accessorize. Our pieces are made to stand out,
              layer easily, and bring polished energy to everyday looks. Sharp silhouettes, iced textures, and confident styling sit at the heart of the brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="aspect-square bg-neutral-100 mb-6 overflow-hidden rounded-3xl">
                <img src="/hero-banner.jpg" alt="Signature style" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg tracking-wider font-medium mb-3">SIGNATURE STYLE</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We focus on pieces that feel bold without becoming difficult to wear. The goal is impact with clean styling.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="aspect-square bg-neutral-100 mb-6 overflow-hidden rounded-3xl">
                <img src="/toplogo.png" alt="Frienemies logo" className="w-full h-full object-contain p-10 bg-white" />
              </div>
              <h3 className="text-lg tracking-wider font-medium mb-3">BUILT TO SHINE</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Frienemies combines luxury cues and street influence into a brand language that feels premium, direct, and memorable.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 border-y border-neutral-200"
          >
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-light mb-2 text-primary">01</p>
                <p className="text-xs tracking-wider text-neutral-500">BOLD DESIGN</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-light mb-2 text-primary">02</p>
                <p className="text-xs tracking-wider text-neutral-500">EASY TO STYLE</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-light mb-2 text-primary">03</p>
                <p className="text-xs tracking-wider text-neutral-500">MADE TO POP</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
