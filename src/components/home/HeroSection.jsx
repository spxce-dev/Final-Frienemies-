import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.28), rgba(0,0,0,.45)), url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69960d5955e8e646c7dfd706/d41ff633c_IMG_7364.jpg")`,
        }}
      />

      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-3xl">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-4 text-sm md:text-base tracking-[0.35em] uppercase text-orange-200">
            Frienemies
          </motion.p>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.7}} className="text-4xl md:text-6xl font-semibold tracking-[0.08em] mb-5">
            Bold streetwear for the ones who stand out naturally.
          </motion.h1>
          <motion.p initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.7}} className="text-sm md:text-lg text-white/85 mb-8">
            Clean fits. Sharp energy. New drop pieces built for everyday impact.
          </motion.p>
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.7}}>
            <Link to={createPageUrl('Shop')} className="inline-flex items-center rounded-full bg-orange-500 px-8 py-3 text-sm font-medium tracking-[0.22em] text-white hover:bg-orange-600 transition-colors">
              SHOP NOW
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
