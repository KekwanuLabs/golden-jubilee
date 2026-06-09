import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Copy, RefreshCw, Feather, Check, Star, CornerDownRight } from 'lucide-react';

export default function MemoryWeaverTab() {
  const [guestName, setGuestName] = useState('');
  const [promptInput, setPromptInput] = useState('');
  const [presetType, setPresetType] = useState<'blessing' | 'music' | 'toast'>('blessing');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');
  const [sourceInfo, setSourceInfo] = useState('');
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      id: 'blessing',
      title: "Sacred Igbo Blessing",
      description: "Generate a traditional Igbo prayer (Chineke Blessing) matching tribal roots, asking for peace (Udo) and longevity.",
      placeholder: "e.g. Grandma's quiet patience, her beautiful cooking, family holding hands...",
      icon: Feather
    },
    {
      id: 'music',
      title: "1970s Lagos Nostalgia",
      description: "Transport back to Lagos in the late 1970s: Empire Hotel clubs, trumpeting highlife bands, and vintage style.",
      placeholder: "e.g. Osadebe music records, Surulere breezy nights, dancing with vintage heels...",
      icon: Star
    },
    {
      id: 'toast',
      title: "Celebration Tiga Proverb Toast",
      description: "Generate a powerful oratorical celebration toast incorporating famous Igbo proverbs about marriage and legacy.",
      placeholder: "e.g. raising a glass of sweet palm wine, looking over grandchildren tables...",
      icon: Sparkles
    }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setCopied(false);
    setGeneratedResult('');
    setSourceInfo('');

    const contextPreset = presets.find(p => p.id === presetType);
    const finalPrompt = promptInput.trim() 
      ? `Category: ${contextPreset?.title}. Include these details: ${promptInput.trim()}`
      : `Generate a beautiful standard ${contextPreset?.title} with warm, elegant custom prose.`;

    try {
      const response = await fetch('/api/generate-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          presetType,
          guestName: guestName.trim() || undefined
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json() as { text: string; info?: string };
      setGeneratedResult(data.text);
      setSourceInfo(data.info || 'Synthesized live using AI architecture');
    } catch (err) {
      console.error(err);
      setGeneratedResult("Chineke Gozie Unu!\n\nMay peace, health, and endless golden joy surround this sacred union of 50 years. True love is a divine gift that grows more precious with every passing season. (Offline recovery mode active)");
      setSourceInfo("Synthesized via local backup parameters");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[#a43c12] font-sans font-bold text-xs uppercase tracking-widest bg-[#a43c12]/10 px-4 py-1.5 rounded-full">
          The Memory Weaver
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#735c00] font-bold tracking-tight">
          AI Memory Weaver
        </h2>
        <p className="font-sans text-sm text-zinc-500 dark:text-zinc-400 font-light max-w-md mx-auto">
          Weave beautiful, custom Igbo blessings, highlife nostalgic narratives, or oratorical proverbs using our server-side engine powered by Google Gemini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* INPUT FORM PANEL */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-xl p-8 shadow-xl flex flex-col justify-between">
          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* Category Presets selection */}
            <div>
              <p className="block text-xs font-sans font-bold uppercase text-zinc-455 mb-3">
                1. Select Weaver Concept
              </p>
              
              <div className="space-y-3">
                {presets.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPresetType(p.id as any)}
                      className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-3 ${
                        presetType === p.id 
                          ? 'border-[#a43c12] bg-[#a43c12]/5 dark:bg-[#a43c12]/15 text-[#a43c12] dark:text-[#fe7e4f]' 
                          : 'border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-805/50'
                      }`}
                    >
                      <div className={`p-2 rounded ${
                        presetType === p.id ? 'bg-[#a43c12]/20' : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}>
                        <Icon className="w-4 h-4 text-inherit" />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-xs">{p.title}</p>
                        <p className="font-sans text-xs text-zinc-400 font-light mt-0.5 leading-snug">
                          {p.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Name input */}
            <div>
              <label className="block text-[#43403a] dark:text-zinc-300 text-xs font-sans font-bold uppercase mb-1">
                2. Your Name or Family Surname
              </label>
              <input
                type="text"
                value={guestName}
                placeholder="e.g. Cousin Amaka or The Orizu Family"
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full text-sm p-3.5 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Custom attributes inputs */}
            <div>
              <label className="block text-[#43403a] dark:text-zinc-300 text-xs font-sans font-bold uppercase mb-1">
                3. Custom Memory Seeds (Optional)
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={presets.find(p => p.id === presetType)?.placeholder}
                rows={4}
                className="w-full text-sm p-3.5 border border-zinc-200 dark:border-zinc-800 rounded bg-zinc-50/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#d4af37]"
              ></textarea>
              <p className="font-sans text-xs text-zinc-400 mt-1 flex items-start gap-1">
                <CornerDownRight className="w-3 h-3 shrink-0" /> Leave blank to synthesize a gorgeous standard archival heritage card.
              </p>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 text-xs font-sans tracking-widest uppercase font-bold btn-gold-laced rounded cursor-disabled flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Weaving Memory Reels...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Synthesize Golden Wish
                </>
              )}
            </button>
          </form>
        </div>

        {/* OUTPUT DISPLAY PANEL (Stationery card style) */}
        <div className="lg:col-span-7 bg-[#fcf9f8] dark:bg-zinc-950 border border-[#d4af37]/40 rounded-xl p-8 md:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle watermark overlay inside the card */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none"></div>

          <div>
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#d4af37]/20">
              <span className="font-serif italic text-xs text-[#735c00] font-medium tracking-wide">
                — Heritage Archival Scroll —
              </span>
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a43c12]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
              </div>
            </div>

            <div className="space-y-4 min-h-[250px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-3"
                  >
                    <div className="inline-flex bg-[#a43c12]/10 p-3 rounded-full animate-pulse text-[#a43c12]">
                      <Feather className="w-6 h-6" />
                    </div>
                    <p className="font-sans text-sm text-[#706a60] dark:text-zinc-300 font-light">
                      Mixing golden colors into traditional textures...
                    </p>
                    <p className="font-sans text-xs text-zinc-400 italic">
                      "Connecting with Chineke blessing servers..."
                    </p>
                  </motion.div>
                ) : generatedResult ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="whitespace-pre-wrap font-serif text-[#4d4635] dark:text-zinc-200 text-sm md:text-base leading-relaxed p-4 bg-white/50 dark:bg-zinc-900/60 rounded-lg border border-zinc-100 dark:border-zinc-800/80"
                  >
                    {generatedResult}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    <div className="inline-flex bg-[#735c00]/10 p-4 rounded-full text-[#735c00]">
                      <Feather className="w-8 h-8" />
                    </div>
                    <p className="font-sans text-[#a43c12] font-semibold text-sm uppercase tracking-wide">
                      Your Stationery is Blank
                    </p>
                    <p className="font-sans text-xs text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
                      Complete your name and seed details on the left, then click <strong>"Synthesize Golden Wish"</strong>. We will write a tailored, prestigious narrative matching Igboland heritage.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {generatedResult && (
            <div className="pt-6 border-t border-[#d4af37]/20 flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 bg-transparent">
              <span className="font-sans text-xs uppercase font-bold tracking-widest text-[#a43c12] dark:text-[#fe7e4f]">
                {sourceInfo}
              </span>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-none justify-center border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 p-3 rounded-lg text-xs font-sans font-bold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Blessing
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
