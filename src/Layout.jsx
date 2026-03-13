import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import useCartCount from '@/hooks/useCartCount';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = currentPageName === 'Home';
  const headerBg = scrolled || !isHomePage ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-transparent';
  const textColor = scrolled || !isHomePage ? 'text-neutral-900' : 'text-white';
  const iconColor = scrolled || !isHomePage ? 'text-neutral-800' : 'text-white';

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Shop', page: 'Shop' },
    { name: 'New Drops', page: 'Shop', query: '?new=true' },
    { name: 'About', page: 'About' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button onClick={() => setMobileMenuOpen(true)} className={`md:hidden p-2 -ml-2 ${iconColor}`}>
              <Menu className="w-6 h-6" />
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page) + (link.query || '')}
                  className={`text-sm tracking-[0.18em] hover:text-primary transition-colors ${textColor}`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </nav>

            <Link to={createPageUrl('Home')} className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <img
                src="/toplogo.png"
                alt="Frienemies"
                className="frienemies-logo h-10 md:h-12 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page) + (link.query || '')}
                  className={`text-sm tracking-[0.18em] hover:text-primary transition-colors ${textColor}`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={() => setSearchOpen(true)} className={`p-2 hover:text-primary transition-colors ${iconColor}`}>
                <Search className="w-5 h-5" />
              </button>
              <Link to={createPageUrl('Cart')} className={`p-2 hover:text-primary transition-colors relative ${iconColor}`}>
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg tracking-[0.2em] font-semibold text-neutral-900">MENU</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-900 hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={createPageUrl(link.page) + (link.query || '')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg tracking-[0.08em] text-neutral-700 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-start justify-center pt-32"
          >
            <div className="w-full max-w-2xl px-6">
              <button onClick={() => setSearchOpen(false)} className="absolute top-6 right-6 text-neutral-900 hover:text-primary transition-colors">
                <X className="w-6 h-6" />
              </button>
              <input
                type="text"
                placeholder="Search Frienemies pieces..."
                autoFocus
                className="w-full text-3xl md:text-4xl font-light border-b-2 border-neutral-200 pb-4 outline-none placeholder:text-neutral-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>{children}</main>

      <footer className="bg-neutral-100 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <img src="/toplogo.png" alt="Frienemies" className="h-12 w-auto mb-4 frienemies-logo" />
              <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
                Bold jewelry, clean presence, everyday shine. Frienemies blends edge and polish for statement pieces that wear easy.
              </p>
            </div>

            <div>
              <h4 className="text-sm tracking-wider font-medium mb-4">SHOP</h4>
              <ul className="space-y-3">
                {['New Drops', 'Chains', 'Rings', 'Bracelets'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-neutral-600 hover:text-primary transition-colors cursor-default">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm tracking-wider font-medium mb-4">HELP</h4>
              <ul className="space-y-3">
                {['Contact', 'Shipping', 'Returns', 'FAQ'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-neutral-600 hover:text-primary transition-colors cursor-default">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm tracking-wider font-medium mb-4">CONNECT</h4>
              <ul className="space-y-3">
                {['Instagram', 'TikTok', 'WhatsApp', 'Email'].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-neutral-600 hover:text-primary transition-colors cursor-default">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-500">© 2026 Frienemies. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-neutral-500 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-xs text-neutral-500 hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
