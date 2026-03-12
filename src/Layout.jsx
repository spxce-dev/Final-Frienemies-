import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: "T-Shirts", href: createPageUrl("Products") + "?category=tshirts" },
    { name: "Hoodies", href: createPageUrl("Products") + "?category=hoodies" },
    { name: "Jackets", href: createPageUrl("Products") + "?category=jackets" },
    { name: "Accessories", href: createPageUrl("Products") + "?category=accessories" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1 text-orange-500 hover:opacity-70 transition-opacity"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to={createPageUrl("Home")} className="absolute left-1/2 -translate-x-1/2">
            <h1
              className="text-2xl md:text-3xl tracking-[0.18em] text-orange-500 font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              FRIENEMIES
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1 text-orange-500 hover:opacity-70 transition-opacity"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to={createPageUrl("Cart")}
              className="relative p-1 text-orange-500 hover:opacity-70 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 text-orange-500"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>

                <h2
                  className="text-2xl text-orange-500 mb-8 mt-4 font-bold"
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
                      className="block text-lg text-orange-500 hover:opacity-70 transition-opacity py-2 border-b border-orange-100"
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

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 bg-white z-50 p-4 shadow-lg"
          >
            <div className="max-w-2xl mx-auto flex items-center gap-4">
              <Search className="w-5 h-5 text-orange-300" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 py-3 text-lg outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-orange-500"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
