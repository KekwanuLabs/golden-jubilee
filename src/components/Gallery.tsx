import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, ImageIcon, X } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../gallery-config';

function GalleryImage({ item, contain = false }: { item: GalleryItem; contain?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="absolute inset-0 flex items-center justify-center" style={{ background: item.placeholderGradient }}><ImageIcon className="w-12 h-12 text-amber-200/60" /></div>;
  return <img src={item.src} alt={item.title} onError={() => setFailed(true)} className={`absolute inset-0 w-full h-full ${contain ? 'object-contain' : 'object-cover'}`} />;
}

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const item = GALLERY_ITEMS[active];
  const next = useCallback(() => setActive(i => (i + 1) % GALLERY_ITEMS.length), []);
  const previous = useCallback(() => setActive(i => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, previous]);

  return (
    <section id="gallery" className="cream-bg py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="section-tag mb-5 block mx-auto w-fit">Memories</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">A <span className="gold-text-static">Golden Gallery</span></h2>
          <div className="ornament-divider mx-auto"><span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span></div>
          <p className="font-serif text-[#3d2800] text-lg md:text-xl italic max-w-2xl mx-auto mt-4">A growing collection of the people, places and moments that make this family story shine.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 shadow-[0_18px_60px_rgba(139,105,20,0.22)] bg-[#2d1f00]">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
                <GalleryImage item={item} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 text-white">
              <p className="font-sans text-xs md:text-sm uppercase tracking-[0.22em] text-amber-200 mb-2">{item.year}</p>
              <h3 className="font-heading font-bold text-2xl md:text-4xl">{item.title}</h3>
              <p className="font-serif italic text-base md:text-xl text-white/80 mt-1">{item.caption}</p>
            </div>
            <button aria-label="Previous photo" onClick={previous} className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 border border-white/20 flex items-center justify-center text-white transition-colors"><ChevronLeft /></button>
            <button aria-label="Next photo" onClick={next} className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 border border-white/20 flex items-center justify-center text-white transition-colors"><ChevronRight /></button>
            <button aria-label="Expand photo" onClick={() => setLightbox(true)} className="absolute right-4 top-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/65 border border-white/20 flex items-center justify-center text-white transition-colors"><Expand className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-2 snap-x" aria-label="Choose a photo">
          {GALLERY_ITEMS.map((photo, index) => (
            <button key={photo.id} onClick={() => setActive(index)} aria-label={`Show ${photo.title}`} className={`relative snap-start flex-shrink-0 w-24 h-20 md:w-32 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${active === index ? 'border-[#d4af37] ring-2 ring-[#d4af37]/30' : 'border-transparent opacity-70 hover:opacity-100'}`}><GalleryImage item={photo} /></button>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-3 md:hidden">
          {GALLERY_ITEMS.map((photo, index) => <button key={photo.id} aria-label={`Go to photo ${index + 1}`} onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? 'w-7 bg-[#d4af37]' : 'w-2 bg-amber-300'}`} />)}
        </div>
      </div>

      {lightbox && <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(false)}><div className="relative w-full max-w-5xl h-[82vh]" onClick={event => event.stopPropagation()}><GalleryImage item={item} contain /><button aria-label="Close photo" onClick={() => setLightbox(false)} className="absolute top-3 right-3 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center"><X /></button><button aria-label="Previous photo" onClick={previous} className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center"><ChevronLeft /></button><button aria-label="Next photo" onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center"><ChevronRight /></button></div></div>}
    </section>
  );
}
