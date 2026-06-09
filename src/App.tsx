import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Timeline from './components/Timeline';
import EventSection from './components/EventSection';
import Gallery from './components/Gallery';
import Tributes from './components/Tributes';
import Guestbook from './components/Guestbook';

const NAV_LINKS = [
  { href: '#story',     label: 'Our Story'  },
  { href: '#timeline',  label: 'Timeline'   },
  { href: '#event',     label: 'The Event'  },
  { href: '#gallery',   label: 'Gallery'    },
  { href: '#tributes',  label: 'Tributes'   },
  { href: '#guestbook', label: 'RSVP'       },
];

function Navigation() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href) as HTMLElement | null);
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(253,246,227,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.3)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(139,105,20,0.08)' : 'none',
      }}
    >
      {scrolled && (
        <div className="h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, #d4af37 30%, #ffe082 50%, #d4af37 70%, transparent)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between py-3 md:py-4">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-start cursor-pointer group">
          <span className="font-heading font-bold text-lg md:text-xl tracking-[0.12em] uppercase text-[#7a5c00] group-hover:text-[#b8860b] transition-colors">
            Onwuneme
          </span>
          <span className="font-serif italic text-[#8b6914] text-sm">Golden Jubilee · 2026</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`font-heading font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer pb-0.5 ${
                active === link.href
                  ? 'text-[#7a5c00] border-b-2 border-[#d4af37]'
                  : 'text-[#4a3500] hover:text-[#7a5c00]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <a
          href="#guestbook"
          className="hidden md:flex items-center gap-2 btn-gold px-5 py-2.5 rounded text-sm cursor-pointer"
        >
          RSVP
        </a>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[#7a5c00] p-1 cursor-pointer">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#fdf6e3] border-t border-amber-300/40 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left font-heading font-semibold text-base uppercase tracking-[0.12em] border-l-4 pl-4 py-2 transition-all cursor-pointer ${
                    active === link.href
                      ? 'text-[#7a5c00] border-[#d4af37]'
                      : 'text-[#4a3500] border-transparent hover:border-amber-300'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#guestbook"
                onClick={() => setMobileOpen(false)}
                className="btn-gold flex items-center justify-center gap-2 py-3.5 rounded text-sm cursor-pointer mt-2"
              >
                RSVP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f5e6c8] border-t-2 border-[#d4af37]/40 py-20 px-4 relative">
      <div className="h-[3px] absolute top-0 left-0 right-0"
        style={{ background: 'linear-gradient(to right, transparent, #d4af37 25%, #ffe082 50%, #d4af37 75%, transparent)' }}
      />

      <div className="max-w-5xl mx-auto">

        {/* Center emblem */}
        <div className="text-center mb-12">
          <div
            className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto mb-6"
            style={{
              background: '#1a1000',
              border: '3px solid #d4af37',
              boxShadow: '0 0 0 8px rgba(212,175,55,0.12), 0 8px 32px rgba(139,105,20,0.3)',
            }}
          >
            <span className="font-heading font-black text-[#d4af37] text-4xl leading-none">50</span>
            <span className="font-heading text-[#ffe082]/80 text-[10px] tracking-widest uppercase mt-0.5">Years</span>
          </div>

          <h3 className="font-display mb-3" style={{ color: '#b8860b', fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}>
            Golden Jubilee
          </h3>

          <p className="font-heading text-[#3d2800] text-base md:text-lg uppercase tracking-[0.25em] font-bold mb-3">
            Chief Engr &amp; Lolo Cosmas Onwuneme
          </p>

          <p className="font-serif italic text-[#7a5c00] text-base md:text-lg">
            50 Years of God's Faithfulness, Love &amp; Grace
          </p>
        </div>

        {/* Gold divider */}
        <div className="flex items-center gap-4 mb-12 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
          <span className="text-[#d4af37] text-lg tracking-widest">✦ ❖ ✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Event info block */}
        <div className="text-center mb-12 bg-white/50 border border-[#d4af37]/30 rounded-2xl py-7 px-6 max-w-2xl mx-auto">
          <p className="font-heading text-[#3d2800] text-sm md:text-base uppercase tracking-[0.2em] font-bold mb-2">
            Tuesday, 29th December 2026
          </p>
          <p className="font-serif text-[#5c4500] text-base md:text-lg leading-relaxed">
            Thanksgiving Mass · 8:00 AM<br />
            <span className="text-sm text-[#7a5c00]">Queen of Apostles Catholic Church, Umuago Urualla, Imo State</span>
          </p>
          <div className="my-3 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
          <p className="font-serif text-[#5c4500] text-base md:text-lg leading-relaxed">
            Reception · 1:00 PM<br />
            <span className="text-sm text-[#7a5c00]">Onwuneme's Compound, Umuago-Urualla, Imo State</span>
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm md:text-base uppercase tracking-[0.14em] text-[#5c4500] hover:text-[#8b6914] transition-colors font-semibold"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="text-center border-t border-[#d4af37]/25 pt-8">
          <p className="font-serif italic text-[#5c4500] text-sm md:text-base leading-relaxed mb-2">
            Made with love by the Onwuneme children —<br className="hidden md:block" /> six siblings, one family, infinite gratitude.
          </p>
          <p className="font-sans text-[#7a5c00]/70 text-sm mt-2">
            Onyinye Chineke — A Gift of God &nbsp;·&nbsp; © 2026
          </p>
        </div>

      </div>
    </footer>
  );
}

export default function App() {
  const scrollToEvent = useCallback(() => {
    document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <Hero onScrollToEvent={scrollToEvent} />
      <OurStory />
      <Timeline />
      <EventSection />
      <Gallery />
      <Tributes />
      <Guestbook />
      <Footer />
    </div>
  );
}
