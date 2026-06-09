import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flame, Shield, Award, Map, Quote } from 'lucide-react';

export default function JourneyTab() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: "1974: The First Gaze",
      subtitle: "A Chance Encounter in Lagos",
      description: "It was a breezy afternoon in Surulere, Lagos. A brilliant, ambitious young gentleman saw a young lady of absolute grace walking with her sister. Her smile was like sunshine, and her calm demeanor captured him instantly. With deep respect and conversational eloquence (which Igbo elders call 'Okomu'), he approached her. This marked the very beginning of a conversation that would stand the seasons of five decades.",
      igboConcept: "Ifeoma - beautiful beginnings destined by heaven.",
      icon: Heart,
      quote: "I knew immediately that she was the prize. A gift sent directly, Onyinye Chineke."
    },
    {
      id: 1,
      title: "1976: The Wedding Feast",
      subtitle: "Traditional & Cathedral Nuptials",
      description: "Surrounded by families from across Igboland, they tied the double ceremonial knot. Under the canopy of palm fronds and to the rhythmic beat of woodblocks and traditional flutes, she offered him the ceremonial cup of palm wine. When he drank, the elders cheered: 'Chineke emego ya!' (God has done it). They swore absolute loyalty, promising to weave their paths together into a tapestry of strength.",
      igboConcept: "Igba Nkwu - the pouring of wine to seal a lifetime union.",
      icon: Sparkles,
      quote: "Taking that cup and drinking before our families was the easiest decision of my life."
    },
    {
      id: 2,
      title: "1980s - 1990s: The Pillars",
      subtitle: "Industry, Resilience and Family",
      description: "They built their home with the foundations of prayers, diligence, and academic pride. Together, they navigated the complexities of life in busy Nigerian cities (Lagos and Enugu), establishing successful businesses and creating a warm, safe sanctuary for their children. She managed the home with pristine organization and tenderness, while he worked tirelessly, always returning with laughter and stories.",
      igboConcept: "Obi Oma - a peaceful, joyful home built on unconditional trust.",
      icon: Shield,
      quote: "We had challenges, but we resolved never to go to sleep with any anger in our house."
    },
    {
      id: 3,
      title: "2000s - 2015: Harvesting Joy",
      subtitle: "A Generation of Legacy",
      description: "The children grew into giants—professionals, leaders, and creative minds carrying on their family names. Then came the sweet sound of tiny running feet. Grandchildren arrived, filling the family home during holidays with laughter, storytelling, and wisdom circles. They watched their family tree branch into beautiful canopies, a direct consequence of their enduring dedication.",
      igboConcept: "Nmadu bu Legacy - human beings are the ultimate wealth.",
      icon: Award,
      quote: "We look at our children and grandchildren, and we recognize how rich we truly are."
    },
    {
      id: 4,
      title: "2024: The Golden Crown",
      subtitle: "A Legacy of 50 Enduring Years",
      description: "Fifty years of holding hands. Fifty years of morning tea, shared sacrifices, and silent nods of understanding. Today, we stand in absolute awe. Wrapped in the rich colors of Coral & Gold, they resemble royal royalty. Their love continues to instruct us that commitment is a continuous flow of grace, and family remains the absolute anchor of life.",
      igboConcept: "Aluba m Ohụrụ - returning to the altar with golden pearls.",
      icon: Flame,
      quote: "Fifty years passed like fifty days because you are my constant companion."
    }
  ];

  const CurrentIcon = chapters[activeChapter].icon;

  return (
    <div className="space-y-12">
      {/* Introduction text */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#a43c12] font-sans font-bold text-xs uppercase tracking-widest bg-[#a43c12]/10 px-4 py-1.5 rounded-full">
          The Chronicles
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#735c00] font-bold tracking-tight">
          A Fifty-Year Love Story
        </h2>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
          Explore the milestones, values, and triumphs that defined half a century of the Golden Jubilee union of our parents, Onyinye Chineke and her beloved.
        </p>
      </div>

      {/* Grid of Chapter Navigation & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation list in left pane */}
        <div className="lg:col-span-4 space-y-3">
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2">Chapters of Love</p>
          {chapters.map((ch, idx) => {
            const IconComponent = ch.icon;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(idx)}
                className={`w-full text-left p-5 rounded-lg border transition-all flex items-center gap-4 group ${
                  activeChapter === idx 
                    ? 'bg-zinc-900 border-[#d4af37] text-white shadow-lg' 
                    : 'bg-white dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-[#d4af37]/50'
                }`}
              >
                <div className={`p-2.5 rounded-md ${
                  activeChapter === idx 
                    ? 'bg-[#d4af37]/20 text-[#ffe088]' 
                    : 'bg-[#fcf9f8] dark:bg-zinc-800 text-[#735c00]'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-serif font-bold text-sm">{ch.title}</p>
                  <p className={`font-sans text-xs font-light ${
                    activeChapter === idx ? 'text-zinc-300' : 'text-zinc-450 dark:text-zinc-400'
                  }`}>
                    {ch.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Chapter Card in right pane */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-xl p-8 md:p-10 shadow-xl relative overflow-hidden"
            >
              {/* Igbo background watermark accent */}
              <div className="absolute right-0 bottom-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none transform translate-x-12 translate-y-12">
                <CurrentIcon className="w-96 h-96" />
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                  <span className="text-[#a43c12] dark:text-[#fe7e4f] font-sans font-bold text-xs uppercase tracking-wider block mb-1">
                    {chapters[activeChapter].igboConcept}
                  </span>
                  <h3 className="font-serif text-3xl text-[#735c00] dark:text-[#ffe088] font-bold tracking-tight">
                    {chapters[activeChapter].title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light">
                    {chapters[activeChapter].subtitle}
                  </p>
                </div>
                <div className="bg-[#fcf9f8] dark:bg-zinc-800 text-[#a43c12] border border-[#d4af37]/30 w-16 h-16 rounded-full flex items-center justify-center self-start md:self-center">
                  <CurrentIcon className="w-8 h-8 fill-transparent" />
                </div>
              </div>

              <div className="space-y-6">
                <p className="font-sans text-zinc-700 dark:text-zinc-300 leading-relaxed text-base font-light">
                  {chapters[activeChapter].description}
                </p>

                {/* Styled Quote Box */}
                <div className="border-l-4 border-[#d4af37] bg-zinc-50/80 dark:bg-zinc-950 p-6 rounded-r-lg relative">
                  <div className="absolute top-2 right-4 text-zinc-200/80 dark:text-zinc-800">
                    <Quote className="w-8 h-8 rotate-180" />
                  </div>
                  <p className="font-serif italic text-[#4d4635] dark:text-zinc-300 text-base leading-relaxed relative">
                    "{chapters[activeChapter].quote}"
                  </p>
                  <p className="font-sans text-xs font-bold text-zinc-400 mt-2 uppercase tracking-wide">
                    — A Shared Family Memory
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-zinc-100 dark:border-zinc-800/85">
                  <div className="flex gap-1">
                    {chapters.map((_, i) => (
                      <span 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all ${
                          activeChapter === i ? 'w-6 bg-[#a43c12]' : 'w-2 bg-zinc-200 dark:bg-zinc-750'
                        }`}
                      ></span>
                    ))}
                  </div>

                  {activeChapter < chapters.length - 1 && (
                    <button 
                      onClick={() => setActiveChapter(activeChapter + 1)}
                      className="text-[#735c00] hover:text-[#a43c12] font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      Next Chapter &rarr;
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
