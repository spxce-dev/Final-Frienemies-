import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/layout/Footer';

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: 'T-Shirts', href: createPageUrl('Products') + '?category=tshirts' },
    { name: 'Hoodies', href: createPageUrl('Products') + '?category=hoodies' },
    { name: 'Jackets', href: createPageUrl('Products') + '?category=jackets' },
    { name: 'Caps', href: createPageUrl('Products') + '?category=caps' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7ED]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        :root {
          --color-primary: #F97316;
          --color-bg: #FFF7ED;
          --color-accent: #EA580C;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-1 text-[#F97316] hover:opacity-70 transition-opacity"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link 
            to={createPageUrl('Home')}
            className="absolute left-1/2 -translate-x-1/2"
          >
            <h1 
              className="text-2xl md:text-3xl tracking-[0.15em] text-[#F97316] font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              FRIENEMIES
            </h1>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-1 text-[#F97316] hover:opacity-70 transition-opacity"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link 
              to={createPageUrl('Cart')}
              className="relative p-1 text-[#F97316] hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] text-white text-[10px] rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto"
            >
              <div className="p-6">
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-[#F97316]"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2 
                  className="text-2xl text-[#F97316] mb-8 mt-4 font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  FRIENEMIES
                </h2>

                <nav className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-lg text-[#F97316] hover:opacity-70 transition-opacity py-2 border-b border-gray-100"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bg-white z-50 p-4 shadow-lg"
          >
            <div className="max-w-2xl mx-auto flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for pieces..."
                className="flex-1 py-3 text-lg outline-none"
                autoFocus
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#F97316]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}