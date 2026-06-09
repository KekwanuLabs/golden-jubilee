import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flame, Shield, Award } from 'lucide-react';

const chapters = [
  {
    year: '1970s',
    title: 'The First Gaze',
    subtitle: 'A Destined Encounter',
    description:
      'It was a sunlit afternoon in the bustling city of Lagos. A brilliant, ambitious young engineer noticed a young woman of remarkable grace and composure. Her laughter was warm, her spirit radiant — a true Lolo in the making. With the quiet confidence of a man who recognised his blessing, he introduced himself. The elders would later say: "Onye ahụ ọchịchọ, Chineke na-enye ya." — He who seeks with a pure heart, God grants his desire.',
    igbo: 'Ifeoma — beautiful beginnings destined by heaven',
    quote: 'I knew from the very first moment. She was my answered prayer.',
    icon: Heart,
    accent: '#d4af37',
  },
  {
    year: '1976',
    title: 'The Wedding Feast',
    subtitle: 'Traditional & Cathedral Nuptials',
    description:
      'Before God and their two families, they made the sacred covenant. At the traditional *Igba Nkwu* ceremony, she carried the cup of palm wine across the dancing ground and placed it in his hands — a gesture that sealed their union before the ancestors. Then, dressed in all their finery, they exchanged vows at the altar of the Church, witnessed by Heaven and their entire community.',
    igbo: 'Igba Nkwu — the pouring of wine to seal a lifetime union',
    quote: 'Taking that cup from her hands was the greatest honour of my life.',
    icon: Sparkles,
    accent: '#d4af37',
  },
  {
    year: '1980s – 1990s',
    title: 'Building the Pillars',
    subtitle: 'Industry, Faith & Family',
    description:
      'With engineering precision and maternal devotion, they constructed a home that became a sanctuary. Six children filled its rooms with laughter, questions, and the sweet chaos of life. He worked tirelessly — providing, building, dreaming. She anchored the home — nurturing, praying, sacrificing. Together they made a vow they never broke: never let the sun set on unresolved anger between them.',
    igbo: 'Obi Oma — a peaceful home built on unconditional trust',
    quote: 'We had challenges, but we resolved never to sleep with anger in our home.',
    icon: Shield,
    accent: '#d4af37',
  },
  {
    year: '2000s – 2015',
    title: 'The Harvest Season',
    subtitle: 'A Generation of Legacy',
    description:
      'One by one, the children rose. Degrees were framed on walls, businesses were born, and then came the sound of the most joyful feet of all: grandchildren. The home that was once filled with their six children now overflowed with a third generation. Every holiday gathering became a testament to the seeds they had patiently sown over three decades.',
    igbo: 'Nmadụ bụ ụba — human beings are the truest wealth',
    quote: 'We look at our children and grandchildren, and we know how truly rich we are.',
    icon: Award,
    accent: '#d4af37',
  },
  {
    year: '2026',
    title: 'The Golden Crown',
    subtitle: '50 Years of God\'s Faithfulness',
    description:
      'Fifty years. The same hands that clasped in 1976 hold tighter today — worn by life, strengthened by love. Every morning of shared prayer, every meal prepared with care, every child guided through the storms of growing up — all of it has built this moment. They stand before us not as they were, but as they have become: a living testament that *nwanne di na mba* — a true partner is indeed a priceless treasure.',
    igbo: 'Aluba m Ọhụrụ — returning to the altar with golden crowns',
    quote: 'Fifty years passed like fifty beautiful days because you are my constant home.',
    icon: Flame,
    accent: '#d4af37',
  },
];

export default function OurStory() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];
  const Icon = chapter.icon;

  return (
    <section id="story" className="cream-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-tag mb-5 block mx-auto w-fit">The Chronicles</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">
            A Fifty-Year <span className="gold-text-static">Love Story</span>
          </h2>
          <div className="ornament-divider mx-auto">
            <span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span>
          </div>
          <p className="font-serif text-[#3d2800] text-lg md:text-xl max-w-2xl mx-auto mt-4 italic font-light leading-relaxed">
            Five decades of faith, devotion, and the quiet heroism of two people who chose each other — every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Chapter navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <p className="font-sans text-sm uppercase tracking-[0.25em] text-amber-700 font-semibold mb-4 pl-1">
              Chapters of Love
            </p>

            {/* Mobile: horizontal scrollable chip tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4">
              {chapters.map((ch, idx) => {
                const ChIcon = ch.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-heading font-bold uppercase tracking-wide cursor-pointer transition-all ${
                      active === idx
                        ? 'bg-[#2d1f00] border-[#d4af37] text-amber-300'
                        : 'bg-white/70 border-amber-200/50 text-[#2d1f00]'
                    }`}
                  >
                    <ChIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{ch.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col space-y-2">
              {chapters.map((ch, idx) => {
                const ChIcon = ch.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                      active === idx
                        ? 'bg-[#2d1f00] border-[#d4af37] shadow-lg'
                        : 'bg-white/70 border-amber-200/40 hover:border-amber-400/50 hover:bg-amber-50/50'
                    }`}
                  >
                    <div className={`p-2 rounded flex-shrink-0 ${
                      active === idx ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <ChIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className={`font-heading font-bold text-sm leading-tight ${
                        active === idx ? 'text-amber-200' : 'text-[#2d1f00]'
                      }`}>{ch.title}</p>
                      <p className={`font-sans text-sm font-light mt-0.5 ${
                        active === idx ? 'text-amber-600' : 'text-amber-800/60'
                      }`}>{ch.year}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Chapter detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="gold-card rounded-2xl overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full"
                  style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }}
                />

                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="jubilee-badge rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-sans text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold mb-1">
                        {chapter.igbo}
                      </p>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#2d1f00]">
                        {chapter.title}
                      </h3>
                      <p className="font-serif text-amber-700/70 italic">{chapter.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-serif text-[#3d2e00]/85 text-lg leading-relaxed mb-8 font-light">
                    {chapter.description}
                  </p>

                  {/* Quote */}
                  <div className="relative bg-[#fdf6e3] border-l-4 border-[#d4af37] p-6 rounded-r-xl">
                    <div className="absolute -top-1 -left-0.5 text-4xl text-amber-300/40 font-serif leading-none select-none">"</div>
                    <p className="font-serif italic text-[#2d1f00] text-base md:text-lg leading-relaxed pl-4">
                      {chapter.quote}
                    </p>
                    <p className="font-sans text-sm uppercase tracking-widest text-amber-700 mt-3 pl-4">
                      — A Shared Family Memory
                    </p>
                  </div>

                  {/* Progress + navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-amber-200/30">
                    <div className="flex gap-1.5">
                      {chapters.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            active === i ? 'w-8 bg-[#d4af37]' : 'w-2 bg-amber-200/50'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {active > 0 && (
                        <button
                          onClick={() => setActive(active - 1)}
                          className="font-heading text-sm uppercase tracking-widest text-amber-700 hover:text-[#d4af37] transition-colors cursor-pointer"
                        >
                          ← Previous
                        </button>
                      )}
                      {active < chapters.length - 1 && (
                        <button
                          onClick={() => setActive(active + 1)}
                          className="font-heading text-sm uppercase tracking-widest text-amber-700 hover:text-[#d4af37] transition-colors cursor-pointer"
                        >
                          Next Chapter →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
