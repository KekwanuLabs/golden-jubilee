import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../gallery-config';

function GalleryCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const showImage = item.src && !imageError;

  return (
    <motion.div
      className="rounded-xl overflow-hidden cursor-pointer group relative h-full"
      style={{ minHeight: item.span === 'tall' ? '380px' : '200px' }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Gradient placeholder — always rendered, hidden by image once loaded */}
      <div
        className="absolute inset-0"
        style={{ background: item.placeholderGradient }}
      />

      {/* Real image — renders on top of gradient */}
      {showImage && (
        <img
          src={item.src}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,224,130,0.14) 0%, transparent 70%)' }}
      />

      {/* Bottom gradient for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ZoomIn className="w-4 h-4 text-white/90" />
      </div>

      {/* Year badge */}
      <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-amber-500/30 text-amber-200 font-heading text-sm font-bold tracking-widest uppercase px-2.5 py-1 rounded">
        {item.year}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-10">
        <p className="font-heading font-bold text-base leading-tight text-white">{item.title}</p>
        <p className="font-serif text-sm text-white/70 italic mt-0.5">{item.caption}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const showImage = item.src && !imageError;

  // Reset image state when item changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onPrev, onNext, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Image area */}
          <div
            className="w-full h-72 md:h-[480px] relative flex items-center justify-center overflow-hidden"
            style={{ background: item.placeholderGradient }}
          >
            {showImage ? (
              <>
                <img
                  key={item.id}
                  src={item.src}
                  alt={item.title}
                  className={`w-full h-full object-contain transition-opacity duration-400 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 border-2 border-amber-400/40 border-t-amber-400 rounded-full animate-spin" />
                    <p className="font-sans text-xs text-amber-300/60 uppercase tracking-widest">Loading…</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <ImageIcon className="w-12 h-12 text-amber-300/40 mx-auto mb-3" />
                <p className="font-serif italic text-amber-300/60 text-sm">
                  {item.src
                    ? `Add photo: public${item.src}`
                    : 'Photo coming soon'}
                </p>
              </div>
            )}
          </div>

          {/* Caption bar */}
          <div className="bg-[#1a1200] border-t border-amber-700/30 px-6 py-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-heading font-bold text-amber-100 text-base">{item.title}</p>
              <p className="font-serif italic text-amber-600 text-sm mt-0.5">{item.caption}</p>
            </div>
            <span className="font-heading text-xs uppercase tracking-widest text-amber-700 whitespace-nowrap pt-1">
              {item.year}
            </span>
          </div>

          {/* Counter */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
            <span className="font-sans text-xs text-white/40 tracking-widest">
              {index + 1} / {items.length}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Prev arrow */}
          {index > 0 && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-8 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Next arrow */}
          {index < items.length - 1 && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-8 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex(i => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex(i => (i !== null && i < GALLERY_ITEMS.length - 1 ? i + 1 : i));
  }, []);

  return (
    <section id="gallery" className="cream-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-5 block mx-auto w-fit">Memories</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">
            A <span className="gold-text-static">Golden Gallery</span>
          </h2>
          <div className="ornament-divider mx-auto">
            <span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span>
          </div>
          <p className="font-serif text-[#3d2800] text-lg italic max-w-xl mx-auto mt-4 font-light">
            Five decades of captured moments — each frame a testament to love that grows richer with time.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gridAutoRows: '200px',
            gridAutoFlow: 'dense',
          }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={[
                item.span === 'wide' ? 'md:col-span-2' : '',
                item.span === 'tall' ? 'md:row-span-2' : '',
              ].filter(Boolean).join(' ')}
            >
              <GalleryCard item={item} onClick={() => setSelectedIndex(i)} />
            </motion.div>
          ))}
        </div>

        {/* Upload instruction note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block gold-card rounded-xl px-8 py-4">
            <p className="font-heading text-amber-800 text-xs font-bold uppercase tracking-widest mb-1">
              Adding Your Photos
            </p>
            <p className="font-serif italic text-[#6b4c00] text-sm">
              Drop photos into <code className="font-sans text-xs bg-amber-100 px-1 py-0.5 rounded">public/images/gallery/photo-01.jpg</code> through <code className="font-sans text-xs bg-amber-100 px-1 py-0.5 rounded">photo-12.jpg</code>
            </p>
          </div>
        </motion.div>

      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
