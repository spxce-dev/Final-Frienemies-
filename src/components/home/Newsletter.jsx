import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 px-6 bg-neutral-900">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto rounded-full border border-neutral-700 flex items-center justify-center">
              <span className="text-2xl text-neutral-400">✦</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl tracking-[0.2em] font-light text-white mb-4">
            JOIN THE CLUB
          </h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Subscribe to receive exclusive access to new arrivals, special offers, and member-only events.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-neutral-700 text-white placeholder:text-neutral-500 h-12 px-4 focus:border-neutral-500 rounded-none"
            />
            <Button
              type="submit"
              disabled={isSubmitted}
              className={`h-12 px-8 rounded-none tracking-wider text-sm transition-all ${
                isSubmitted 
                  ? 'bg-green-600 hover:bg-green-600' 
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              {isSubmitted ? (
                <Check className="w-5 h-5" />
              ) : (
                <>
                  SUBSCRIBE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-neutral-600 mt-6">
            By subscribing, you agree to our Privacy Policy
          </p>
        </motion.div>
      </div>
    </section>
  );
}