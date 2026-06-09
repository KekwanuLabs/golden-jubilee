import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Diamond, Calendar, MapPin, Phone, Check, Scissors, X, HelpCircle, Star, Ruler } from 'lucide-react';

interface EventDetailsTabProps {
  onConfirmSize: (size: string) => void;
  guestSize?: string;
}

export default function EventDetailsTab({ onConfirmSize, guestSize }: EventDetailsTabProps) {
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(guestSize || 'L');
  const [tailorNotes, setTailorNotes] = useState('');
  const [confirmed, setConfirmed] = useState(!!guestSize);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'Custom'];

  const guideSteps = [
    { title: "Ladies' Wrapper (Akwa-ete / Lace)", measurement: "6 Yards", description: "Standard double-wrapper drape with high-waist overlap. Intricate custom border laces should drape over the feet." },
    { title: "Gele (Headtie) Styling", measurement: "Standard Multi-fold", description: "Structured architectural crown. We recommend solid metallic gold threads, hand-pleated symmetrically with 6-8 layers." },
    { title: "Men's Isiagu Tunic", measurement: "Tailored to Fit", description: "High collar with decorative heavy gold buttons. Tunic hem should rest exactly at the mid-thigh, paired with black slim-cut trousers." },
    { title: "Coral Beads Selection (Udo)", measurement: "Double Strand Neck / Wrist", description: "Grade-A glossy spherical Nigerian coral beads. Ladies wear double-strand cascading statement necklaces. Gentlemen wear bulky wrist-clasps." }
  ];

  const handleConfirm = () => {
    onConfirmSize(selectedSize);
    setConfirmed(true);
    setShowSizeModal(false);
  };

  return (
    <div className="space-y-16">
      {/* Bento Grid Layout for Aso-Ebi Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Fabric Swatch Presentation (Large Card) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden relative group flex flex-col justify-between"
          id="fabric-card"
        >
          <div>
            <div className="relative overflow-hidden h-72 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdKPIjAOuBMBAQMjEBgj56xGPVWL_594I19rY772GAC0K6JR9EAyWmKwq0QChsnfqHGvbZXc5nigH2LHg-0sK6vfrTyhbhTOlrm5UJ6m484mrimm5x2J2kozGO4YS6LkyGT1YSEiJiebJ4SD1Ga2XTJGuky7R3-JjFWQgAYB0UvwDPKBtZN0X34HXNUjKRa62XqdeO_TmVUxZGnlt4GHbuRXi1xVZHGwZmmMDzcqoMgTAlUBUUKmObRQRD3OGgTj_cQXtngXWDJzU"
                alt="Coral and Gold Lace Swatch"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-end justify-between gap-4">
                <span className="bg-[#a43c12] text-white px-4 py-1.5 rounded-full font-sans font-bold tracking-wider text-xs uppercase shadow-lg">
                  The Fabric
                </span>
                <p className="text-white/90 text-sm font-sans font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <Star className="text-[#d4af37] w-4 h-4 fill-[#d4af37]" /> Highly Texture Imported French Lace
                </p>
              </div>
            </div>
            
            <div className="p-8 md:p-10">
              <h2 className="font-serif text-3xl md:text-4xl text-[#735c00] dark:text-[#ffe088] mb-4 font-bold tracking-tight">
                Coral &amp; Gold Lace
              </h2>
              <p className="font-sans text-base leading-relaxed text-zinc-600 dark:text-zinc-300 mb-8 font-light">
                The primary Aso-Ebi is a premium French lace interwoven with metallic gold threads, complemented by a rich coral silk underlay. The colors symbolize the enduring strength of the union (Gold) and the vibrant joy of family (Coral). Selected exclusively for this historic celebration.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10 pt-0 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
            {confirmed && (
              <div className="mb-6 p-4 bg-[#fcf9f8]/80 dark:bg-zinc-800/60 border border-[#d4af37]/30 rounded-lg flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a43c12] animate-pulse"></span>
                  <p className="font-sans font-medium text-[#1c1b1b] dark:text-white">
                    Confirmed Size: <span className="font-bold text-[#a43c12] dark:text-[#fe7e4f]">{selectedSize}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setShowSizeModal(true)}
                  className="text-xs text-[#735c00] underline font-medium hover:text-[#a43c12] transition-colors"
                >
                  Adjust Size
                </button>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowSizeModal(true)}
                className="btn-gold-laced font-sans text-xs uppercase font-bold tracking-widest px-6 py-4 rounded-md text-center flex-1 transition-all"
                id="btn-confirm-size"
              >
                {confirmed ? "Update Selected Size" : "Confirm Aso-Ebi Size"}
              </button>
              <button 
                onClick={() => setShowGuideModal(true)}
                className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-300/60 dark:border-zinc-700 text-[#735c00] dark:text-[#ffe088] font-sans text-xs uppercase font-bold tracking-widest px-6 py-4 rounded-md text-center flex-1 transition-colors flex items-center justify-center gap-2"
                id="btn-tailor-guide"
              >
                <Scissors className="w-4 h-4" /> View Tailoring Guide
              </button>
            </div>
          </div>
        </motion.div>

        {/* Side panels (Accent Card and Collection Details) */}
        <div className="lg:col-span-4 flex flex-col gap-8 justify-between">
          
          {/* Accessories Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 p-8 flex-1 flex flex-col justify-center relative overflow-hidden"
            id="accessories-card"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ffe088]/10 to-transparent rounded-full -mr-8 -mt-8"></div>
            
            <div className="bg-[#fcf9f8] dark:bg-zinc-800/50 border border-[#d4af37]/40 w-14 h-14 rounded-xl flex items-center justify-center text-[#735c00] mb-6">
              <Diamond className="w-7 h-7 fill-[#d4af37]/20" />
            </div>

            <h3 className="font-serif text-2xl text-zinc-900 dark:text-white mb-3 font-semibold">
              Accessories
            </h3>
            <p className="font-sans text-[#4d4635] dark:text-zinc-300 leading-relaxed font-light text-sm">
              Ladies are requested to pair the Coral &amp; Gold lace with a solid <strong>Gold Gele</strong> (traditional hand-folded headtie) for visual uniformity. Gentlemen's <strong>Isiagu tunics</strong> should feature coral beads on breastplates or matching neck chains.
            </p>
          </motion.div>

          {/* Collection Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg border-l-4 border-[#a43c12] border-y border-r border-zinc-200/50 dark:border-zinc-800/50 p-8 flex-1 flex flex-col justify-center"
            id="collection-card"
          >
            <h3 className="font-serif text-xl text-[#a43c12] mb-5 font-semibold tracking-wide uppercase text-xs">
              Collection Details
            </h3>
            
            <ul className="space-y-5 font-sans text-zinc-700 dark:text-zinc-300 text-sm">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-[#a43c12]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#1c1b1b] dark:text-zinc-100 text-xs">Distribution Window</p>
                  <p className="font-light text-zinc-500 dark:text-zinc-400">Available from October 15th, 2024</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-[#a43c12]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#1c1b1b] dark:text-zinc-100 text-xs">Pickup Location</p>
                  <p className="font-light text-zinc-500 dark:text-zinc-400">Heritage Hall, Surulere, Lagos</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-0.5 text-[#a43c12]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#1c1b1b] dark:text-zinc-100 text-xs">Chief Coordinator</p>
                  <p className="font-light text-zinc-500 dark:text-zinc-400">Mrs. Obi (+234 800 000 0000)</p>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Style Inspiration Section (Asymetric Image Gallery) */}
      <section className="pt-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1 max-w-xs"></div>
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-[#735c00]"
          >
            <Diamond className="w-5 h-5 fill-[#735c00]/30" />
          </motion.div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent flex-1 max-w-xs"></div>
        </div>

        <h2 className="text-center font-serif text-3xl md:text-4xl text-[#735c00] dark:text-[#ffe088] font-bold tracking-tight mb-2">
          Style Inspiration
        </h2>
        <p className="font-sans text-center text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-12 font-light">
          Catch the light of our cultural heritage. Here is the visual identity of our double gold jubilee.
        </p>

        {/* Asymmetrical gallery matching layout of the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Couple Image Frame (Large Colspan 2) */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden relative shadow-lg group border border-zinc-200/40 dark:border-zinc-800/80 bg-zinc-100 h-[400px] md:h-auto min-h-[480px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 z-10 transition-opacity group-hover:opacity-90"></div>
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGujs0dlngkM7u7dDlCmgdfvPUkG02saBeiALrjf7TnQ2y_FvXUxYIfZKG_D2I4JRlsGusR-419OkaOorf8LGb5GntDCqO8g8ZlZrn6t1fOrqt6IjZPg5myLfocsl3-DuXPzTS8CV2xv8Qs8jlcfD3sWRTOVBwuR0rLimpCWHhjbBNHC-c7e7qIW4e1mFvx9HFxdGSpR4pPej1aha3v6biRetRwxOZ0rME5MKlMskDUE8MLJonyLWdHNI-9k0K5Ea-M5LtcjSW6AE"
              alt="Nigerian Igbo celebratory couple in classic attire"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <p className="font-serif text-2xl font-bold mb-1">Traditional Igbo Elegance</p>
              <p className="font-sans text-sm text-white/80 font-light max-w-lg">
                Matriarch Onyinye wearing customized French Coral-Laced embroidery double wrapper gown, complemented by state-handcrafted *Aka-aka* (coral beads) and matching pleated hand-tie headwrap.
              </p>
            </div>
          </motion.div>

          {/* Beads Close up (Small Frame) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="rounded-xl overflow-hidden relative shadow-lg group border border-zinc-200/40 dark:border-zinc-800/80 bg-zinc-100 h-64"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt7e_bcxaLHEJ7gEvCuwv6zF7g2kC7OMToPu9_WjVbd-7gifR3ElucqKft5m1JTrod5J3cKpIkKfugBKkJwRUuZls7BnmgDpg_gYGood9PxAazZGlf13YH89ahxljDaDR-WF3XWRehuzB-bJ21vC8G0q-G1FbRcxjWMVQpO8JVL3FKJUSu6r36pkWP8olYeW3ZSL3wYlRZd8nf7lKE1FWMbn-ZypJAcCiK4bLiSj0Pa1x-Rc5D9yOKOK21Zhdm0VRW37TPh86BF6E"
              alt="Coral Bead Necklaces"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
              <p className="font-serif text-lg font-bold">Aka-aka Coral Beads</p>
              <p className="font-sans text-xs text-white/85 font-light">
                Signifying health, royal prestige, and longevity.
              </p>
            </div>
          </motion.div>

          {/* Gele Spiral close-up (Small Frame) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="rounded-xl overflow-hidden relative shadow-lg group border border-zinc-200/40 dark:border-zinc-800/80 bg-zinc-100 h-[240px] md:h-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa5RctNrLyrfwHwTsU6D1TmFK08ctwCxudLPnpfwix4iZLKY21b6b8lw-x64GDm24yQPLXTRiAjbuuUzASMbljjQ0hw0jv4xemeM5q6eXHB9hmg-vuppkhZf9RLnk8rnrlxvDTg9oOwGWvlU9wLaVLWhZqbHQqF2iAzu8ZZLfHIqBrOwuJ8bUddOMRiAbl8tbzylTYj-OyKOMU9s2eTCaT17vLyvZKOuZCl8bCTLYNbkV6TAuouAH_f-zzFAVPdVV0vDIeoNKSs5E"
              alt="Gold Gele Headpiece Twist"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
              <p className="font-serif text-lg font-bold">Architectural Gold Gele</p>
              <p className="font-sans text-xs text-white/85 font-light">
                Expertly structured gold crown folds representing celebration.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Aso-Ebi Sizing modal */}
      <AnimatePresence>
        {showSizeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-8 max-w-md w-full overflow-hidden"
            >
              <button 
                onClick={() => setShowSizeModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#a43c12]/10 w-10 h-10 rounded-lg flex items-center justify-center text-[#a43c12]">
                  <Ruler className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-zinc-900 dark:text-white font-bold">
                  Select Aso-Ebi Size
                </h3>
              </div>

              <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-light">
                Please confirm your standard size setting for packaging and distribution. If you have custom requests, specify notes.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-3 px-4 rounded-lg font-sans font-bold text-center border transition-all ${
                      selectedSize === s 
                        ? 'border-[#a43c12] bg-[#a43c12]/15 text-[#a43c12]' 
                        : 'border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="space-y-2 mb-8">
                <label className="block text-xs font-sans font-bold uppercase text-zinc-700 dark:text-zinc-300">
                  Custom Sizing/Tailoring Notes (Optional)
                </label>
                <textarea
                  placeholder="e.g. wrapper length adjustments, specific chest size, sleeve length..."
                  value={tailorNotes}
                  onChange={(e) => setTailorNotes(e.target.value)}
                  rows={3}
                  className="w-full text-sm p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="flex-1 py-3 text-sm font-sans font-bold tracking-wider uppercase border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 text-sm font-sans font-bold tracking-wider uppercase btn-gold-laced rounded-md transition-all text-center"
                >
                  Confirm Sizing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tailoring Guide modal */}
      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuideModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-8 max-w-lg w-full overflow-hidden"
            >
              <button 
                onClick={() => setShowGuideModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#735c00]/10 w-10 h-10 rounded-lg flex items-center justify-center text-[#735c00]">
                  <Scissors className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl text-zinc-900 dark:text-white font-bold">
                  Heritage Tailoring Guide
                </h3>
              </div>

              <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-light">
                We are committed to absolute elegance. Ensure your bespoke tailor adheres to these traditional guidelines for the golden jubilee fabric:
              </p>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 mb-8">
                {guideSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-[#fcf9f8]/50 dark:bg-zinc-950">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <p className="font-serif text-[#735c00] dark:text-[#ffe088] font-bold text-base">{step.title}</p>
                      <span className="bg-[#a43c12]/10 text-[#a43c12] text-xs font-sans font-bold px-2 py-1 rounded">
                        {step.measurement}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="flex-1 py-3 text-sm font-sans font-bold tracking-wider uppercase btn-gold-laced rounded-md transition-all text-center"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
