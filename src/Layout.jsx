import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, User, Heart } from 'lucide-react';
import useCartCount from '@/hooks/useCartCount';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = currentPageName === 'Home';
  const headerBg = scrolled || !isHomePage ? 'bg-white/95 shadow-sm border-b border-orange-100' : 'bg-transparent';
  const textColor = scrolled || !isHomePage ? 'text-neutral-900' : 'text-white';
  const iconColor = scrolled || !isHomePage ? 'text-orange-500' : 'text-white';

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Shop', page: 'Shop' },
    { name: 'New Arrivals', page: 'Shop', query: '?new=true' },
    { name: 'About', page: 'About' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2 -ml-2 ${iconColor}`}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Nav - Left */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page) + (link.query || '')}
                  className={`text-sm tracking-wider hover:opacity-70 transition-opacity ${textColor}`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link to={createPageUrl('Home')} className="absolute left-1/2 -translate-x-1/2">
              <div className={`px-3 py-1.5 rounded-full border text-sm md:text-base font-semibold tracking-[0.35em] ${scrolled || !isHomePage ? 'bg-white border-orange-200 text-orange-500' : 'bg-white/10 border-white/30 text-white backdrop-blur'}`}>
                FRIENEMIES
              </div>
            </Link>

            {/* Desktop Nav - Right */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page) + (link.query || '')}
                  className={`text-sm tracking-wider hover:opacity-70 transition-opacity ${textColor}`}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSearchOpen(true)}
                className={`p-2 hover:opacity-70 transition-opacity ${iconColor}`}
              >
                <Search className="w-5 h-5" />
              </button>
              <Link 
                to={createPageUrl('Cart')}
                className={`p-2 hover:opacity-70 transition-opacity relative ${iconColor}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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
                <h2 
                  className="text-lg tracking-[0.2em]"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  MENU
                </h2>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={createPageUrl(link.page) + (link.query || '')}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg tracking-wider text-neutral-700 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-start justify-center pt-32"
          >
            <div className="w-full max-w-2xl px-6">
              <button 
                onClick={() => setSearchOpen(false)}
                className="absolute top-6 right-6"
              >
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

      {/* Main Content */}
      <main>{children}</main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-neutral-100 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 
                className="text-xl tracking-[0.2em] mb-4"
                style={{ fontFamily: "'Times New Roman', serif" }}
              >
                FRIENEMIES
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Bold streetwear for the ones who stand out naturally.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-sm tracking-wider font-medium mb-4">SHOP</h4>
              <ul className="space-y-3 hidden">
                {['New Drop', 'T-Shirts', 'Hoodies', 'Accessories'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-sm tracking-wider font-medium mb-4">HELP</h4>
              <ul className="space-y-3 hidden">
                {['Contact Us', 'Shipping', 'Returns', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm tracking-wider font-medium mb-4">CONNECT</h4>
              <ul className="space-y-3 hidden">
                {['Instagram', 'Twitter', 'Facebook', 'Pinterest'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-500">
              © 2026 FRIENEMIES. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-neutral-500 hover:text-black">Privacy Policy</a>
              <a href="#" className="text-xs text-neutral-500 hover:text-black">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}