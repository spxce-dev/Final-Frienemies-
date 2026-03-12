import React from "react";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3
              className="text-lg font-bold tracking-[0.18em] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              FRIENEMIES
            </h3>
            <p className="text-white/85 text-sm leading-6">
              Bold streetwear for the ones who stand out naturally.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li>T-Shirts</li>
              <li>Hoodies</li>
              <li>Jackets</li>
              <li>Accessories</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li>Contact</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-white/85 mb-3">
              Get updates on new drops and offers.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-full px-4 py-2 text-black outline-none"
              />
              <button className="rounded-full bg-white text-orange-500 px-4 py-2 font-semibold">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-sm text-white/80 text-center">
          © 2026 Frienemies Official
        </div>
      </div>
    </footer>
  );
} React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Instagram, Facebook, Twitter } from 'lucide-react'
import { toast } from 'sonner'

const FooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/20 md:border-none">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-4 md:py-0 md:cursor-default">
        <h3 className="text-white text-lg tracking-[0.15em] uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {title}
        </h3>
        <ChevronDown className={`w-5 h-5 text-white md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:overflow-visible md:mt-4"
          >
            <div className="pb-4 md:pb-0 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    toast.success(`Subscribed: ${email}`)
    setEmail('')
  }

  return (
    <footer className="bg-orange-500 pt-10 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-0 md:gap-8">
          <FooterSection title="About">
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Our Story</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Lookbook</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Campaigns</a>
          </FooterSection>

          <FooterSection title="Help">
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Contact Us</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Shipping & Returns</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Size Guide</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">FAQs</a>
          </FooterSection>

          <FooterSection title="More">
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Gift Cards</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Press</a>
            <a href="#" className="block text-white/70 hover:text-white text-sm transition-colors">Privacy Policy</a>
          </FooterSection>

          <div className="mt-6 md:mt-0">
            <h3 className="text-white text-lg tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Newsletter
            </h3>

            <div className="flex gap-4 mb-6">
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:opacity-70 transition-opacity"><Twitter className="w-5 h-5" /></a>
            </div>

            <form onSubmit={handleSubscribe} className="flex border-b border-white/50">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your E-mail"
                className="flex-1 bg-transparent text-white placeholder-white/50 text-sm py-2 outline-none"
              />
              <button type="submit" className="text-white text-sm tracking-[0.1em] uppercase hover:opacity-70 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 text-lg font-semibold tracking-[0.2em]">FRIENEMIES</p>
          <p className="text-white/50 text-sm mt-3">© 2026 Frienemies Official</p>
        </div>
      </div>
    </footer>
  )
}
