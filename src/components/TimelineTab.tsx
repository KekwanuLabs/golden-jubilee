import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Star, MapPin, Sparkles, BookOpen, Heart, Award } from 'lucide-react';
import { TimelineMilestone } from '../types';

export default function TimelineTab() {
  const [selectedMilestone, setSelectedMilestone] = useState<TimelineMilestone | null>(null);

  const milestones: TimelineMilestone[] = [
    {
      id: '1',
      year: 1974,
      title: "First Gaze in Surulere",
      igboTitle: "Mkpakọrịta mbụ (First Meet)",
      description: "A chance meeting on a sunny Surulere street in Lagos initiates a beautiful, endless conversation. His quiet confidence matches her regal presence instantly.",
      location: "Surulere, Lagos",
    },
    {
      id: '2',
      year: 1976,
      title: "Igba Nkwu Ceremonials",
      igboTitle: "Igba Nkwu (Traditional Nuptials)",
      description: "A gorgeous Igbo traditional wedding wrapped in cultural tapestry (Okanga drums and palm-wine drinking), followed by a solemn cathedral service.",
      location: "Enugu, Nigeria",
    },
    {
      id: '3',
      year: 1981,
      title: "Arrival of a Daughter",
      igboTitle: "Nwa nwa mbụ (First child harvest)",
      description: "The arrival of Nneka, a magnificent daughter who brought immense light. This is followed by four more brilliant daughters and a son in subsequent years.",
      location: "Lagos, Nigeria",
    },
    {
      id: '4',
      year: 1989,
      title: "The Jubilee Enterprise",
      igboTitle: "Azụmahịa Ezinụlọ (Co-founding)",
      description: "They launch their family textile and trading firm in Balogun Market, Lagos. His sharp business intellect paired with her financial organizational genius leads to massive success.",
      location: "Balogun Market, Lagos",
    },
    {
      id: '5',
      year: 1999,
      title: "Silver Anniversary",
      igboTitle: "Ememme Afọ Iri Abụọ na ise",
      description: "Celebrating 25 years of marriage, they returned to Enugu for a vast thanksgiving feast. They distributed wrappers to over a hundred widows in honor of their blessings.",
      location: "Enugu, Nigeria",
    },
    {
      id: '6',
      year: 2012,
      title: "The First Grandson",
      igboTitle: "Amụrụ Nwa-nwa (The Harvest)",
      description: "The joy of grandparent-hood begins. A bright boy named Chineke-Ogo (God's Grace) is born, marking the beginning of a booming generation of grandchildren.",
      location: "Lagos, Nigeria",
    },
    {
      id: '7',
      year: 2024,
      title: "Golden Jubilee Heritage",
      igboTitle: "Afọ Iri Ise nke Ịhụnanya",
      description: "The peak harvest! Fifty years of unbroken love, resilience, and family legacy. Surrounded by children, grandchildren, and global wells of blessings.",
      location: "Heritage Hall, Lagos",
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#a43c12] font-sans font-bold text-xs uppercase tracking-widest bg-[#a43c12]/10 px-4 py-1.5 rounded-full">
          The Anniversary Line
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#735c00] font-bold tracking-tight">
          Golden Milestones
        </h2>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
          Fifty years of historical landmarks represented by gold connections and coral bead nodes. Click any milestone to unpack the full story.
        </p>
      </div>

      {/* Main Timeline graphic layout */}
      <div className="relative max-w-3xl mx-auto px-4 md:px-0 pt-10">
        
        {/* Continuous Golden vertical line representing the timeline path */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#735c00] via-[#d4af37] to-[#fe7e4f] transform -translate-x-1/2"></div>

        <div className="space-y-12">
          {milestones.map((ms, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={ms.id} 
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                
                {/* Node circle styled as a Coral Bead */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-25">
                  <button
                    onClick={() => setSelectedMilestone(ms)}
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a43c12] to-[#fe7e4f] border-2 border-white dark:border-zinc-900 shadow-lg flex items-center justify-center hover:scale-125 hover:rotate-12 transition-transform duration-300"
                    id={`timeline-node-${ms.year}`}
                    title="Click for details"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  </button>
                </div>

                {/* Left/Right content boxes */}
                <div className={`pl-12 md:pl-0 w-full md:w-[45%] ${isLeft ? 'md:text-right' : 'md:text-left order-last md:order-none'}`}>
                  <div 
                    onClick={() => setSelectedMilestone(ms)}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-md hover:shadow-xl border border-zinc-200/50 dark:border-zinc-800/80 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                      <span className="font-serif text-2xl font-bold text-[#a43c12] bg-[#a43c12]/10 dark:bg-[#a43c12]/25 px-3 py-1 rounded">
                        {ms.year}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white group-hover:text-[#735c00] dark:group-hover:text-[#ffe088] transition-colors">
                      {ms.title}
                    </h4>
                    <p className="font-sans italic text-[#735c00]/80 dark:text-[#ffe088]/80 text-xs font-medium mb-2 block">
                      {ms.igboTitle}
                    </p>

                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-2">
                      {ms.description}
                    </p>

                    <div className={`mt-3 flex items-center gap-1 text-xs uppercase font-sans font-bold tracking-widest text-zinc-400 dark:text-zinc-550 ${isLeft ? 'md:justify-end' : 'justify-start'}`}>
                      <MapPin className="w-3 h-3 text-[#a43c12]" /> {ms.location}
                    </div>
                  </div>
                </div>

                {/* Empty spacing block in grid layout */}
                <div className="hidden md:block w-[45%]"></div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Popover Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMilestone(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-8 max-w-md w-full overflow-hidden"
            >
              <button 
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                &times;
              </button>

              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-3xl font-extrabold text-[#a43c12]">
                  {selectedMilestone.year}
                </span>
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                  <MapPin className="text-[#a43c12] w-3.5 h-3.5" />
                  {selectedMilestone.location}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-[#735c00] dark:text-[#ffe088] font-bold mb-1">
                {selectedMilestone.title}
              </h3>
              <p className="font-sans italic text-sm text-zinc-450 dark:text-zinc-400 mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                {selectedMilestone.igboTitle}
              </p>

              <p className="font-sans text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-6">
                {selectedMilestone.description}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="flex-1 py-3 text-xs font-sans font-bold tracking-wider uppercase btn-gold-laced rounded-md transition-all text-center"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
