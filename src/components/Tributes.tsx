import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

const CHILD_TRIBUTES = [
  { name: 'Chinedu', message: "Growing up, our home was always filled with the sound of your laughter and the smell of Mama's cooking. Papa, you showed us what it means to work hard and walk with integrity. Mama, you showed us what it means to love unconditionally. Together, you are the reason we know what a family should feel like. Fifty years of this? We are the most blessed children on earth. Daalu unu! Ya gazie!" },
  { name: 'Chukwuma', message: "I have watched you both navigate life's storms with grace and faith. Not once did we see you falter in your love for each other or for us. Papa, your quiet strength is a mountain. Mama, your gentle wisdom is an ocean. Together, you are the bedrock of this family. Thank you for giving us 50 years of the most beautiful blueprint for love. We honour you today and always." },
  { name: 'Ijeoma', message: "Dear Papa and Mama, I kept deleting drafts because no words feel adequate. So I will simply say this: every good thing in my life traces back to the foundation you laid. Your love is not just a story we tell — it is the air we breathe. Here is to 50 years and to many more golden seasons ahead. Chineke gozie unu!" },
  { name: 'Kelechukwu', message: "Fifty years is a testimony. I have watched Mama and Papa teach us that marriage is not a feeling — it is a decision made fresh every morning. A decision to show up, to forgive, to laugh, to hold on. Thank you for making that decision for fifty years running. We, your children, are the living proof of your legacy." },
  { name: 'Okechukwu', message: "The thing I am most grateful for is that you gave us an example. In a world where love is treated as temporary, you showed us it can be permanent — that it deepens and shines brighter with time. Happy Golden Jubilee, my dearest Papa and Mama. You are our greatest treasure." },
  { name: 'Chukwunonso', message: "Being the last child, I grew up watching you both through grown-up eyes from the very beginning. I saw a partnership built on faith, sacrifice, and an unshakeable bond. You never needed to teach me about love — I simply watched the two of you. Fifty years down, and you still make each other laugh. That is everything. Daalu. I love you both beyond words." },
];

export default function Tributes() {
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <section id="tributes" className="parchment-bg py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12 md:mb-16">
          <span className="section-tag mb-5 block mx-auto w-fit">From Their Children</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#2d1f00] mb-4">Six Voices, <span className="gold-text-static">One Legacy</span></h2>
          <div className="ornament-divider mx-auto"><span className="text-amber-600 text-base tracking-widest">✦ ❖ ✦</span></div>
          <p className="font-serif text-[#3d2800] text-lg md:text-xl italic max-w-2xl mx-auto mt-4">Six children. Six memories. One shared gratitude for the love that made their family.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {CHILD_TRIBUTES.map((tribute, index) => (
            <motion.article key={tribute.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }} className="gold-card rounded-2xl overflow-hidden h-[430px] md:h-[390px] flex flex-col">
              <div className="h-1 flex-shrink-0" style={{ background: 'linear-gradient(to right, #8b6914, #d4af37, #ffe082, #d4af37, #8b6914)' }} />
              <div className="p-6 md:p-8 flex flex-col min-h-0 flex-1">
                <div className="flex items-center gap-4 mb-5 flex-shrink-0">
                  <button type="button" aria-label={`Enlarge placeholder portrait for ${tribute.name}`} onClick={() => setPhoto(tribute.name)} className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d4af37] ring-4 ring-[#d4af37]/15 flex-shrink-0 group">
                    <img src={index % 2 === 0 ? '/images/couple.jpg' : '/images/gallery/portrait.jpg'} alt="" className="w-full h-full object-cover object-top" />
                    <span className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><ZoomIn className="w-4 h-4 text-white" /></span>
                  </button>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-[#2d1f00]">{tribute.name}</h3>
                </div>
                <div className="overflow-y-auto pr-1 scrollbar-thin">
                  <p className="font-serif text-[#3d2e00]/90 text-lg leading-relaxed italic">“{tribute.message}”</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {photo && <div role="dialog" aria-modal="true" className="fixed inset-0 z-[65] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setPhoto(null)}><div className="relative max-w-lg w-full rounded-2xl bg-[#fdf6e3] p-3 border-2 border-[#d4af37]" onClick={event => event.stopPropagation()}><img src={CHILD_TRIBUTES.find(child => child.name === photo) && (CHILD_TRIBUTES.findIndex(child => child.name === photo) % 2 === 0 ? '/images/couple.jpg' : '/images/gallery/portrait.jpg')} alt={`${photo} placeholder portrait`} className="w-full max-h-[72vh] object-cover object-top rounded-xl" /><p className="font-heading text-center text-[#2d1f00] text-lg mt-3">{photo}</p><button type="button" aria-label="Close portrait" onClick={() => setPhoto(null)} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#2d1f00]/85 text-white flex items-center justify-center"><X className="w-5 h-5" /></button></div></div>}
    </section>
  );
}
