import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, Filter, Calendar, MessageSquare, Award } from 'lucide-react';
import { Tribute } from '../types';

export default function TributesTab() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState<'Children' | 'Sibling' | 'Extended Family' | 'Friend' | 'Grandchild'>('Children');
  const [message, setMessage] = useState('');
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);

  const initialTributes: Tribute[] = [
    {
      id: '1',
      author: "Dr. Chidi Obi",
      relation: "Children",
      message: "Growing up, our house in Lagos was always bustling, yet mother maintained absolute sanctuary. She has this quiet strength that anchors everyone. Father, you are her absolute match. Your mutual respect has been the absolute blueprint of how I raise my own home. Fifty years of grace and honor. We salute you! Ya gazie!",
      createdAt: "2026-06-07",
      avatarColor: "bg-[#a43c12]"
    },
    {
      id: '2',
      author: "Ambassador Nneka Bello",
      relation: "Children",
      message: "To the couple whose love crossed hemispheres! Writing this from Washington DC, my heart is full. I remember how our kitchen in Enugu always smelled of fresh Nigerian spices, traditional soup, and grandfather's storybooks. You both raised us to be global citizens without forgetting the red soil of our heritage. We celebrate you!",
      createdAt: "2026-06-06",
      avatarColor: "bg-[#735c00]"
    },
    {
      id: '3',
      author: "Aka-Aka Grandchildren Circle",
      relation: "Grandchild",
      message: "Dearest Grandma and Grandpa, thank you for teaching us Igbo proverbs, for always hiding sweet chin-chin in your handbags, and for showing us that true love doesn't fight, but listens. Happy 50th Anniversary! We love you so much!",
      createdAt: "2026-06-05",
      avatarColor: "bg-[#d4af37]"
    },
    {
      id: '4',
      author: "Chief (Mrs.) Joyce Chukwu",
      relation: "Friend",
      message: "I have known Onyinye since we were young maidens in Enugu. She has always possessed a golden heart. When she married her husband fifty years ago, we knew it was a matching ordained in heaven. Seeing you both today, shimmering in Coral and Gold, brings tears of pure joy to my old eyes. Cheers, my dearest friends.",
      createdAt: "2026-06-04",
      avatarColor: "bg-[#fe7e4f]"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('golden-jubilee-tributes');
    if (saved) {
      try {
        setTributes(JSON.parse(saved));
      } catch (e) {
        setTributes(initialTributes);
      }
    } else {
      setTributes(initialTributes);
      localStorage.setItem('golden-jubilee-tributes', JSON.stringify(initialTributes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      setErrorText("Please complete your name and write a beautiful tribute.");
      return;
    }
    setErrorText('');

    const colors = ['bg-[#a43c12]', 'bg-[#735c00]', 'bg-[#d4af37]', 'bg-[#fe7e4f]', 'bg-zinc-800'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTribute: Tribute = {
      id: Date.now().toString(),
      author: author.trim(),
      relation,
      message: message.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      avatarColor: randomColor
    };

    const updated = [newTribute, ...tributes];
    setTributes(updated);
    localStorage.setItem('golden-jubilee-tributes', JSON.stringify(updated));

    setAuthor('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const filteredTributes = filter === 'All' 
    ? tributes 
    : tributes.filter(t => t.relation === filter);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#a43c12] font-sans font-bold text-xs uppercase tracking-widest bg-[#a43c12]/10 px-4 py-1.5 rounded-full">
          The Living Wall
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#735c00] font-bold tracking-tight">
          Heartfelt Tributes
        </h2>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
          Honoring a fifty-year legacy of unconditional love. Browse messages from children, sisterhood, friends, and seal your own blessing on our digital wall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive write form on left side */}
        <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#735c00] to-[#fe7e4f]"></div>

          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#a43c12]" /> Seal Your Tribute
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-sans font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Obinna and Sarah"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                Relationship to Couple
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value as any)}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-[#d4af37]"
              >
                <option value="Children">Daughters / Sons (Children)</option>
                <option value="Grandchild">Grandchildren</option>
                <option value="Sibling">Siblings</option>
                <option value="Extended Family">Extended Cousins / Family</option>
                <option value="Friend">Dear Friend</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                Anniversary Message / Blessing
              </label>
              <textarea
                placeholder="Write your heartwarming message or Igbo blessing here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full text-sm p-3 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
              ></textarea>
            </div>

            {errorText && (
              <p className="text-xs text-red-500 font-sans font-medium">{errorText}</p>
            )}

            {success && (
              <p className="text-xs text-green-500 font-sans font-medium">Tribute published beautifully to the wall! Ya gazie!</p>
            )}

            <button
              type="submit"
              className="w-full py-3 text-xs uppercase tracking-widest font-sans font-bold btn-gold-laced rounded cursor-pointer"
            >
              Post Tribute Card
            </button>
          </form>
        </div>

        {/* Tributs masonry display card wall on the right side */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Filtering row */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-zinc-200/60 dark:border-zinc-8003">
            <span className="text-xs uppercase font-sans font-bold tracking-wider text-zinc-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            {['All', 'Children', 'Grandchild', 'Sibling', 'Extended Family', 'Friend'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`py-1.5 px-3.5 rounded-full font-sans text-xs font-semibold border transition-all ${
                  filter === cat 
                    ? 'bg-[#735c00] border-[#735c00] text-white shadow-md' 
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat === 'All' ? 'View All Wall' : cat}
              </button>
            ))}
          </div>

          {/* Wall cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTributes.map((tr) => {
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 p-6 rounded-xl shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between"
                    key={tr.id}
                  >
                    <div>
                      {/* Top ribbon of the card */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${tr.avatarColor} text-white font-sans font-bold flex items-center justify-center text-sm shadow-sm`}>
                            {tr.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-serif font-bold text-sm text-zinc-900 dark:text-white">{tr.author}</p>
                            <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#a43c12] dark:text-[#fe7e4f]">
                              {tr.relation}
                            </span>
                          </div>
                        </div>

                        <div className="text-zinc-300 dark:text-zinc-750">
                          <MessageSquare className="w-5 h-5 fill-current" />
                        </div>
                      </div>

                      <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light mb-6 italic">
                        "{tr.message}"
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs font-sans font-semibold text-zinc-400">
                      <span className="flex items-center gap-1 uppercase">
                        <Calendar className="w-3 h-3 text-[#735c00]" /> {tr.createdAt}
                      </span>
                      <button 
                        onClick={() => {
                          const loved = localStorage.getItem(`tribute-loved-${tr.id}`);
                          if (!loved) {
                            localStorage.setItem(`tribute-loved-${tr.id}`, 'true');
                            // We can just pulse alert briefly
                          }
                        }}
                        className="flex items-center gap-1 hover:text-[#a43c12] transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 fill-[#a43c12]/10" /> Heart Blessing
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
